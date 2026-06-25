import { useState, useCallback, useEffect } from 'react';
import {
  ArrowLeft, Save, Send, Loader2, AlertCircle, CheckCircle2,
  Plus, Trash2, ChevronUp, ChevronDown, ChevronRight, FileText,
  Image as ImageIcon, GripVertical,
} from 'lucide-react';
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
  SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates, arrayMove, useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import RichTextEditor from '../../components/RichTextEditor';
import { SECTION_DEFS, SECTION_ORDER } from '../../sections/registry';
import { uploadImage } from '../../lib/imageUpload';

/*
 * Admin "Pages" views: a list of the editable marketing pages, and the section builder for
 * one page. Both reuse the parent AdminPage `api` helper (auth headers handled there).
 *
 * The builder edits a page's ordered `sections[]`: add / delete / move sections and edit each
 * section's fields (driven by SECTION_DEFS). Prose fields use the shared RichTextEditor.
 */

const BLUE = '#16508C';
const inputCls = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent';
const ring = { '--tw-ring-color': BLUE };

// --- Page list ------------------------------------------------------------

export function PageList({ api, onEdit }) {
  const [pages, setPages] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setError('');
    try {
      const json = await api('pages');
      setPages(json.pages || []);
    } catch (err) {
      if (!err.unauthorized) setError('Impossible de charger les pages.');
    }
  }, [api]);

  useEffect(() => { load(); }, [load]);

  const open = async (pageKey) => {
    try {
      const json = await api(`pages?key=${encodeURIComponent(pageKey)}`);
      onEdit({ ...json.page, pageKey });
    } catch (err) {
      if (!err.unauthorized) setError('Impossible d’ouvrir cette page.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Pages du site</h2>
      {error && (
        <p className="mb-4 text-sm text-red-600 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> {error}</p>
      )}
      {pages === null ? (
        <div className="flex items-center gap-2 text-gray-500"><Loader2 className="w-4 h-4 animate-spin" /> Chargement…</div>
      ) : (
        <ul className="space-y-3">
          {pages.map((p) => (
            <li key={p.pageKey}>
              <button
                onClick={() => open(p.pageKey)}
                className="w-full text-left bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:border-gray-300 transition"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${BLUE}12` }}>
                  <FileText className="w-5 h-5" style={{ color: BLUE }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900">{PAGE_LABELS[p.pageKey] || p.pageKey}</p>
                  <p className="text-sm text-gray-500">
                    /{p.pageKey} · {p.sectionCount > 0 ? `${p.sectionCount} section(s)` : 'pas encore migrée (version actuelle affichée)'}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const PAGE_LABELS = {
  home: 'Accueil',
  about: 'À propos',
  services: 'Services',
  contact: 'Contact',
  'conseiller-rive-sud': 'Conseiller financier — Rive-Sud',
  'conseiller-montreal': 'Conseiller financier — Montréal',
};

// --- Page builder ---------------------------------------------------------

export function PageBuilder({ api, initial, onBack }) {
  const [sections, setSections] = useState(() => initial.sections || []);
  const [expanded, setExpanded] = useState(() => new Set());
  const [saving, setSaving] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const toggle = (key) => setExpanded((prev) => {
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });

  const updateSection = (index, patch) =>
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));

  const addSection = (type) => {
    const section = SECTION_DEFS[type].blank();
    setSections((prev) => [...prev, section]);
    setExpanded((prev) => new Set(prev).add(section._key));
  };

  const removeSection = (index) => {
    if (!window.confirm('Supprimer cette section ?')) return;
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const onDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    setSections((prev) => {
      const from = prev.findIndex((s) => s._key === active.id);
      const to = prev.findIndex((s) => s._key === over.id);
      return from < 0 || to < 0 ? prev : arrayMove(prev, from, to);
    });
  };

  const move = (index, dir) => setSections((prev) => {
    const next = [...prev];
    const target = index + dir;
    if (target < 0 || target >= next.length) return prev;
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  });

  const save = async (publish) => {
    setError(''); setSuccess(''); setSaving(publish ? 'publish' : 'draft');
    try {
      const json = await api('pages', {
        method: 'POST',
        body: { pageKey: initial.pageKey, title: initial.title || initial.pageKey, sections, publish },
      });
      if (publish) {
        setSuccess(json.rebuildTriggered
          ? 'Publié ! Le site se reconstruit — visible en ligne dans 1 à 2 minutes.'
          : 'Enregistré. (Reconstruction automatique non configurée — un redéploiement est requis.)');
      } else {
        setSuccess('Brouillon enregistré dans Sanity.');
      }
    } catch (err) {
      if (err.unauthorized) return;
      const fields = err.payload?.fields;
      setError(fields?.length ? `Problème : ${fields.join(', ')}.` : 'Enregistrement impossible.');
    } finally {
      setSaving('');
    }
  };

  return (
    <div>
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Retour aux pages
      </button>

      <h2 className="text-xl font-bold text-gray-900 mb-1">{PAGE_LABELS[initial.pageKey] || initial.pageKey}</h2>
      <p className="text-sm text-gray-500 mb-6">/{initial.pageKey} — {sections.length} section(s)</p>

      {error && <p className="mb-4 text-sm text-red-600 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> {error}</p>}
      {success && <p className="mb-4 text-sm text-green-700 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> {success}</p>}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={sections.map((s) => s._key)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {sections.map((section, index) => (
              <SectionCard
                key={section._key || index}
                id={section._key}
                api={api}
                section={section}
                index={index}
                total={sections.length}
                expanded={expanded.has(section._key)}
                onToggle={() => toggle(section._key)}
                onChange={(patch) => updateSection(index, patch)}
                onRemove={() => removeSection(index)}
                onMove={(dir) => move(index, dir)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {sections.length === 0 && (
        <p className="text-gray-500 text-sm py-4">Aucune section. Ajoutez-en une ci-dessous pour migrer cette page.</p>
      )}

      <AddSectionMenu onAdd={addSection} />

      <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-gray-200">
        <button onClick={() => save(false)} disabled={Boolean(saving)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50">
          {saving === 'draft' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Enregistrer
        </button>
        <button onClick={() => save(true)} disabled={Boolean(saving)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold transition hover:opacity-90 disabled:opacity-50 bg-amber-600 hover:bg-amber-500">
          {saving === 'publish' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Publier (mettre en ligne)
        </button>
      </div>
    </div>
  );
}

function SectionCard({ id, api, section, index, total, expanded, onToggle, onChange, onRemove, onMove }) {
  const def = SECTION_DEFS[section._type];
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  if (!def) return null;
  const summary = section.heading || section.eyebrow || def.label;
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 20 : undefined,
    position: 'relative',
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-white border border-gray-200 rounded-xl">
      <div className="flex items-center gap-2 p-3">
        <button
          type="button"
          className="p-1 -ml-1 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing touch-none"
          aria-label="Glisser pour réordonner"
          title="Glisser pour réordonner"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <button onClick={onToggle} className="flex items-center gap-2 min-w-0 flex-1 text-left">
          {expanded ? <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
          <span className="text-xs font-semibold uppercase tracking-wide text-white px-2 py-0.5 rounded" style={{ backgroundColor: BLUE }}>{def.label}</span>
          <span className="text-sm text-gray-700 truncate">{summary}</span>
        </button>
        <button onClick={() => onMove(-1)} disabled={index === 0} title="Monter" className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"><ChevronUp className="w-4 h-4" /></button>
        <button onClick={() => onMove(1)} disabled={index === total - 1} title="Descendre" className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"><ChevronDown className="w-4 h-4" /></button>
        <button onClick={onRemove} title="Supprimer" className="p-1.5 rounded text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-1 space-y-4 border-t border-gray-100">
          {def.fields.map((field) => (
            <FieldEditor key={field.name} api={api} field={field} value={section[field.name]} onChange={(v) => onChange({ [field.name]: v })} />
          ))}
        </div>
      )}
    </div>
  );
}

function FieldEditor({ api, field, value, onChange }) {
  const label = <span className="block text-sm font-semibold text-gray-800 mb-1.5">{field.label}</span>;

  if (field.type === 'richtext') {
    return <label className="block">{label}<RichTextEditor value={value || []} onChange={onChange} /></label>;
  }
  if (field.type === 'image') {
    return <div>{label}<ImageField api={api} value={value} onChange={onChange} /></div>;
  }
  if (field.type === 'textarea') {
    return <label className="block">{label}<textarea rows={3} className={inputCls} style={ring} value={value || ''} onChange={(e) => onChange(e.target.value)} /></label>;
  }
  if (field.type === 'select') {
    return (
      <label className="block">{label}
        <select className={inputCls} style={ring} value={value || ''} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </label>
    );
  }
  if (field.type === 'stringList' || field.type === 'textList') {
    return <div>{label}<ArrayEditor multiline={field.type === 'textList'} value={Array.isArray(value) ? value : []} onChange={onChange} /></div>;
  }
  if (field.type === 'objectList') {
    return <div>{label}<ObjectListEditor api={api} field={field} value={Array.isArray(value) ? value : []} onChange={onChange} /></div>;
  }
  // default: text
  return <label className="block">{label}<input className={inputCls} style={ring} value={value || ''} onChange={(e) => onChange(e.target.value)} /></label>;
}

function ImageField({ api, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');

  const pick = async (file) => {
    if (!file) return;
    setUploading(true);
    setErr('');
    try {
      const json = await uploadImage(api, file);
      onChange(json.url);
    } catch (e) {
      if (!e.unauthorized) setErr('Téléversement de l’image impossible.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-start gap-4">
      <div className="w-40 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
        {value
          ? <img src={value} alt="" className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-6 h-6 text-gray-300" /></div>}
      </div>
      <div>
        <label className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 cursor-pointer">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
          {uploading ? 'Téléversement…' : 'Changer l’image'}
          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={(e) => pick(e.target.files?.[0])} />
        </label>
        {value && (
          <button type="button" onClick={() => onChange('')} className="block mt-2 text-xs text-gray-500 hover:text-red-600">
            Retirer l’image
          </button>
        )}
        {err && <p className="text-xs text-red-600 mt-1.5">{err}</p>}
      </div>
    </div>
  );
}

function ObjectListEditor({ api, field, value, onChange }) {
  const setItem = (i, patch) => onChange(value.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  const add = () => onChange([...value, field.newItem()]);
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));
  const move = (i, dir) => {
    const t = i + dir;
    if (t < 0 || t >= value.length) return;
    const next = [...value];
    [next[i], next[t]] = [next[t], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <div key={item._key || i} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500">
              {(field.itemLabelKey && item[field.itemLabelKey]) || `Élément ${i + 1}`}
            </span>
            <div className="flex items-center gap-1">
              <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ChevronUp className="w-4 h-4" /></button>
              <button onClick={() => move(i, 1)} disabled={i === value.length - 1} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ChevronDown className="w-4 h-4" /></button>
              <button onClick={() => remove(i)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="space-y-3">
            {field.itemFields.map((f) => (
              <FieldEditor key={f.name} api={api} field={f} value={item[f.name]} onChange={(v) => setItem(i, { [f.name]: v })} />
            ))}
          </div>
        </div>
      ))}
      <button onClick={add} className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 border border-dashed border-gray-300 rounded-lg px-3 py-1.5">
        <Plus className="w-4 h-4" /> Ajouter un élément
      </button>
    </div>
  );
}

function ArrayEditor({ value, onChange, multiline }) {
  const setItem = (i, v) => onChange(value.map((it, idx) => (idx === i ? v : it)));
  const add = () => onChange([...value, '']);
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));
  const move = (i, dir) => {
    const t = i + dir;
    if (t < 0 || t >= value.length) return;
    const next = [...value];
    [next[i], next[t]] = [next[t], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          {multiline
            ? <textarea rows={2} className={inputCls} style={ring} value={item} onChange={(e) => setItem(i, e.target.value)} />
            : <input className={inputCls} style={ring} value={item} onChange={(e) => setItem(i, e.target.value)} />}
          <div className="flex flex-col">
            <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ChevronUp className="w-4 h-4" /></button>
            <button onClick={() => move(i, 1)} disabled={i === value.length - 1} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ChevronDown className="w-4 h-4" /></button>
          </div>
          <button onClick={() => remove(i)} className="p-1.5 mt-0.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <button onClick={add} className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 border border-dashed border-gray-300 rounded-lg px-3 py-1.5">
        <Plus className="w-4 h-4" /> Ajouter un élément
      </button>
    </div>
  );
}

function AddSectionMenu({ onAdd }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      {open ? (
        <div className="border border-gray-200 rounded-xl p-3 bg-gray-50">
          <p className="text-sm font-semibold text-gray-700 mb-2">Choisir un type de section</p>
          <div className="flex flex-wrap gap-2">
            {SECTION_ORDER.map((type) => (
              <button key={type} onClick={() => { onAdd(type); setOpen(false); }}
                className="px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white hover:border-gray-400">
                {SECTION_DEFS[type].label}
              </button>
            ))}
            <button onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-gray-500">Annuler</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 font-medium hover:border-gray-400 hover:text-gray-900 transition w-full justify-center">
          <Plus className="w-4 h-4" /> Ajouter une section
        </button>
      )}
    </div>
  );
}
