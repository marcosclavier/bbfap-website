import { useEffect, useState, useCallback } from 'react';
import {
  Lock, LogOut, Plus, Pencil, Trash2, ArrowLeft, Save, Send,
  Loader2, Image as ImageIcon, AlertCircle, CheckCircle2,
} from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';
import { portableTextHasContent } from '../lib/portableTextTiptap';

/*
 * /admin — self-serve blog editor for BBFAP (bypasses the Sanity Studio).
 *
 * Talks only to the server-side Vercel functions /api/posts and /api/upload, which hold
 * the Sanity write token. This page never sees the token; it authenticates with a shared
 * password (ADMIN_PASSWORD) sent in the `x-admin-password` header and kept in sessionStorage.
 */

const BLUE = '#16508C';

// Must mirror studio/schemas/blogPost.ts (and scripts/lib/adminApi.mjs CATEGORIES).
const CATEGORIES = [
  'Placements', 'Fiscalité', 'Impôts', 'Assurances', 'Conseils', 'Planification Successorale',
];

const SESSION_KEY = 'bbfap_admin_pw';
const SESSION_USER = 'bbfap_admin_user';

const EMPTY_POST = {
  _id: null,
  title: '',
  slug: '',
  publishedAt: '',
  readTime: '',
  category: CATEGORIES[0],
  excerpt: '',
  hasVideo: false,
  heroImageAssetId: null,
  heroImageAlt: '',
  heroImageUrl: null,
  body: [], // Portable Text block array
};

function slugify(input) {
  return String(input)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

// datetime-local wants "YYYY-MM-DDTHH:mm" in local time.
function toLocalInput(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// Downscale + JPEG-encode in the browser so the upload stays small and optimized.
function downscaleImage(file, maxWidth = 1600) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read_failed'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('decode_failed'));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve({
          dataBase64: canvas.toDataURL('image/jpeg', 0.82),
          filename: (file.name || 'hero').replace(/\.[^.]+$/, '') + '.jpg',
          contentType: 'image/jpeg',
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const [username, setUsername] = useState(() => sessionStorage.getItem(SESSION_USER) || '');
  const [password, setPassword] = useState(() => sessionStorage.getItem(SESSION_KEY) || '');
  // Restore the session optimistically when credentials survive a refresh.
  // The first /api/posts request re-validates them and a 401 clears the session.
  const [authed, setAuthed] = useState(
    () => Boolean(sessionStorage.getItem(SESSION_USER) && sessionStorage.getItem(SESSION_KEY))
  );
  const [view, setView] = useState('list'); // 'list' | 'editor'
  const [editing, setEditing] = useState(null);

  // Keep the editor out of search results.
  useEffect(() => {
    document.title = 'Administration du blogue — BBFAP';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  const api = useCallback(async (path, { method = 'GET', body } = {}) => {
    const res = await fetch(`/api/${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-admin-username': username,
        'x-admin-password': password,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = await res.json().catch(() => ({}));
    if (res.status === 401) {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(SESSION_USER);
      setAuthed(false);
      const err = new Error('unauthorized');
      err.unauthorized = true;
      throw err;
    }
    if (!res.ok) {
      const err = new Error(json.error || 'request_failed');
      err.payload = json;
      throw err;
    }
    return json;
  }, [username, password]);

  if (!authed) {
    return (
      <LockScreen
        onUnlock={(user, pw) => {
          setUsername(user);
          setPassword(pw);
          sessionStorage.setItem(SESSION_USER, user);
          sessionStorage.setItem(SESSION_KEY, pw);
          setAuthed(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold" style={{ color: BLUE }}>
            Administration du blogue
          </h1>
          <button
            onClick={() => { sessionStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_USER); setAuthed(false); }}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {view === 'list' ? (
          <PostList
            api={api}
            onNew={() => { setEditing({ ...EMPTY_POST, publishedAt: new Date().toISOString() }); setView('editor'); }}
            onEdit={(post) => { setEditing(post); setView('editor'); }}
          />
        ) : (
          <PostEditor
            api={api}
            initial={editing}
            onBack={() => { setEditing(null); setView('list'); }}
          />
        )}
      </main>
    </div>
  );
}

function LockScreen({ onUnlock }) {
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      // A successful list request confirms the credentials server-side.
      const res = await fetch('/api/posts', {
        headers: { 'x-admin-username': user, 'x-admin-password': pw },
      });
      if (res.status === 401) { setError('Identifiants incorrects.'); return; }
      if (!res.ok) { setError('Erreur du serveur. Réessayez.'); return; }
      onUnlock(user, pw);
    } catch {
      setError('Connexion impossible. Réessayez.');
    } finally {
      setBusy(false);
    }
  };

  const inputCls = 'w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${BLUE}15` }}>
            <Lock className="w-6 h-6" style={{ color: BLUE }} />
          </div>
        </div>
        <h1 className="text-xl font-bold text-center text-gray-900 mb-1">Espace blogue</h1>
        <p className="text-sm text-gray-500 text-center mb-6">Entrez vos identifiants pour continuer.</p>
        <input
          type="email"
          name="username"
          id="admin-username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Nom d’utilisateur"
          autoComplete="username"
          autoFocus
          className={`${inputCls} mb-3`}
          style={{ '--tw-ring-color': BLUE }}
        />
        <input
          type="password"
          name="password"
          id="admin-password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Mot de passe"
          autoComplete="current-password"
          className={`${inputCls} mb-3`}
          style={{ '--tw-ring-color': BLUE }}
        />
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1.5 mb-3">
            <AlertCircle className="w-4 h-4" /> {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy || !user || !pw}
          className="w-full py-3 rounded-xl text-white font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2"
          style={{ backgroundColor: BLUE }}
        >
          {busy && <Loader2 className="w-4 h-4 animate-spin" />} Déverrouiller
        </button>
      </form>
    </div>
  );
}

function PostList({ api, onNew, onEdit }) {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setError('');
    try {
      const json = await api('posts');
      setPosts(json.posts || []);
    } catch (err) {
      if (!err.unauthorized) setError('Impossible de charger les articles.');
    }
  }, [api]);

  useEffect(() => { load(); }, [load]);

  const openEdit = async (id) => {
    try {
      const json = await api(`posts?id=${encodeURIComponent(id)}`);
      onEdit(json.post);
    } catch (err) {
      if (!err.unauthorized) setError('Impossible d’ouvrir cet article.');
    }
  };

  const remove = async (post) => {
    if (!window.confirm(`Supprimer définitivement « ${post.title} » ?`)) return;
    try {
      await api(`posts?id=${encodeURIComponent(post._id)}`, { method: 'DELETE' });
      load();
    } catch (err) {
      if (!err.unauthorized) setError('Suppression impossible.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Articles ({posts?.length ?? '…'})</h2>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold transition hover:opacity-90"
          style={{ backgroundColor: BLUE }}
        >
          <Plus className="w-4 h-4" /> Nouvel article
        </button>
      </div>

      {error && (
        <p className="mb-4 text-sm text-red-600 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4" /> {error}
        </p>
      )}

      {posts === null ? (
        <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-4 h-4 animate-spin" /> Chargement…</div>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">Aucun article pour le moment. Cliquez sur « Nouvel article ».</p>
      ) : (
        <ul className="space-y-3">
          {posts.map((p) => (
            <li key={p._id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
              <div className="w-20 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                {p.heroImageUrl
                  ? <img src={p.heroImageUrl} alt="" className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-5 h-5 text-gray-300" /></div>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900 truncate">{p.title}</p>
                <p className="text-sm text-gray-500">
                  {p.category} · {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('fr-CA') : '—'}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => openEdit(p._id)} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">
                  <Pencil className="w-4 h-4" /> Modifier
                </button>
                <button onClick={() => remove(p)} className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" /> Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PostEditor({ api, initial, onBack }) {
  const [form, setForm] = useState({ ...initial, publishedAt: toLocalInput(initial.publishedAt) });
  const [slugTouched, setSlugTouched] = useState(Boolean(initial._id));
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const onTitle = (value) => {
    setForm((f) => ({ ...f, title: value, slug: slugTouched ? f.slug : slugify(value) }));
  };

  const onPickImage = async (file) => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { dataBase64, filename, contentType } = await downscaleImage(file);
      const json = await api('upload', { method: 'POST', body: { dataBase64, filename, contentType } });
      setForm((f) => ({ ...f, heroImageAssetId: json.assetId, heroImageUrl: json.url }));
    } catch (err) {
      if (!err.unauthorized) setError('Téléversement de l’image impossible.');
    } finally {
      setUploading(false);
    }
  };

  const save = async (publish) => {
    setError('');
    setSuccess('');
    if (!portableTextHasContent(form.body)) {
      setError('Le contenu de l’article est vide.');
      return;
    }
    setSaving(publish ? 'publish' : 'draft');
    try {
      const payload = {
        _id: form._id || undefined,
        title: form.title,
        slug: form.slug || slugify(form.title),
        publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : new Date().toISOString(),
        readTime: form.readTime,
        category: form.category,
        excerpt: form.excerpt,
        hasVideo: form.hasVideo,
        heroImageAssetId: form.heroImageAssetId,
        heroImageAlt: form.heroImageAlt,
        body: form.body,
        publish,
      };
      const json = await api('posts', { method: 'POST', body: payload });
      setForm((f) => ({ ...f, _id: json.id }));
      if (publish) {
        setSuccess(json.rebuildTriggered
          ? 'Publié ! Le site se reconstruit — visible en ligne dans 1 à 2 minutes.'
          : 'Enregistré dans Sanity. (Reconstruction automatique non configurée — un redéploiement est requis pour la mise en ligne.)');
      } else {
        setSuccess('Brouillon enregistré dans Sanity.');
      }
    } catch (err) {
      if (err.unauthorized) return;
      const fields = err.payload?.fields;
      setError(fields?.length
        ? `Champs à corriger : ${fields.join(', ')}.`
        : 'Enregistrement impossible. Vérifiez les champs et réessayez.');
    } finally {
      setSaving('');
    }
  };

  const inputCls = 'w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:border-transparent';
  const ring = { '--tw-ring-color': BLUE };

  return (
    <div>
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Retour à la liste
      </button>

      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {form._id ? 'Modifier l’article' : 'Nouvel article'}
      </h2>

      {error && (
        <p className="mb-4 text-sm text-red-600 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> {error}</p>
      )}
      {success && (
        <p className="mb-4 text-sm text-green-700 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> {success}</p>
      )}

      <div className="space-y-5 bg-white border border-gray-200 rounded-2xl p-6">
        <Field label="Titre">
          <input className={inputCls} style={ring} value={form.title} onChange={(e) => onTitle(e.target.value)} placeholder="Titre de l’article" />
        </Field>

        <Field label="Slug (URL)" hint="/blogue/…">
          <input
            className={inputCls} style={ring} value={form.slug}
            onChange={(e) => { setSlugTouched(true); set('slug', e.target.value); }}
            placeholder="slug-de-larticle"
          />
        </Field>

        <div className="grid sm:grid-cols-3 gap-5">
          <Field label="Date de publication">
            <input type="datetime-local" className={inputCls} style={ring} value={form.publishedAt} onChange={(e) => set('publishedAt', e.target.value)} />
          </Field>
          <Field label="Temps de lecture" hint='Ex. « 3 min »'>
            <input className={inputCls} style={ring} value={form.readTime} onChange={(e) => set('readTime', e.target.value)} placeholder="5 min" />
          </Field>
          <Field label="Catégorie">
            <select className={inputCls} style={ring} value={form.category} onChange={(e) => set('category', e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Extrait" hint="40 à 500 caractères">
          <textarea rows={3} className={inputCls} style={ring} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} placeholder="Court résumé affiché dans la liste et en haut de l’article." />
        </Field>

        <Field label="Image principale">
          <div className="flex items-start gap-4">
            <div className="w-40 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
              {form.heroImageUrl
                ? <img src={form.heroImageUrl} alt="" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-6 h-6 text-gray-300" /></div>}
            </div>
            <div>
              <label className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer">
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                {uploading ? 'Téléversement…' : 'Choisir une image'}
                <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => onPickImage(e.target.files?.[0])} />
              </label>
              <input
                className={`${inputCls} mt-3`} style={ring} value={form.heroImageAlt}
                onChange={(e) => set('heroImageAlt', e.target.value)}
                placeholder="Texte alternatif (accessibilité / SEO)"
              />
            </div>
          </div>
        </Field>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" className="w-4 h-4" style={{ accentColor: BLUE }} checked={form.hasVideo} onChange={(e) => set('hasVideo', e.target.checked)} />
          Cet article contient une vidéo
        </label>

        <Field label="Contenu" hint="Utilisez la barre d’outils pour la mise en forme">
          <RichTextEditor value={form.body} onChange={(body) => set('body', body)} />
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-6">
        <button
          onClick={() => save(false)} disabled={Boolean(saving) || uploading}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
        >
          {saving === 'draft' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Enregistrer
        </button>
        <button
          onClick={() => save(true)} disabled={Boolean(saving) || uploading}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold transition hover:opacity-90 disabled:opacity-50 bg-amber-600 hover:bg-amber-500"
        >
          {saving === 'publish' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Publier (mettre en ligne)
        </button>
      </div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-gray-800 mb-1.5">
        {label} {hint && <span className="font-normal text-gray-400">— {hint}</span>}
      </span>
      {children}
    </label>
  );
}
