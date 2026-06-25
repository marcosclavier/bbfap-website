import { useRef, useState } from 'react';
import { Send, Facebook, Linkedin, Youtube, MapPin } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useRecaptcha } from '../hooks/useRecaptcha';

/*
 * Contact form + trust sidebar. The FORM ITSELF stays code-wired (reCAPTCHA v3 → /api/contact);
 * only the surrounding copy is CMS-editable (heading, intro, office address, trust list, photo
 * caption). Subject/asset options and the form field labels stay in code (changing them risks
 * the submission contract). Image is a default in v1 (text-first).
 */
const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY;

const DEFAULT_SUBJECTS = [
  { value: 'placements', label: 'Placements* et gestion de patrimoine' },
  { value: 'assurances', label: 'Assurance de personnes' },
  { value: 'fiscalite', label: 'Fiscalité et optimisation' },
  { value: 'general', label: 'Consultation générale' },
  { value: 'autre', label: 'Autre' },
];
const DEFAULT_ASSETS = ['Moins de 250 000$', '250 000$ à 500 000$', '500 000$ à 1 000 000$', '1 000 000$ et plus'];

const CheckMark = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
  </svg>
);

export default function ContactFormSection({
  heading = 'Prenez rendez-vous',
  intro,
  subjectOptions = DEFAULT_SUBJECTS,
  assetOptions = DEFAULT_ASSETS,
  photoImage = '/images/original/team.webp',
  photoAlt = 'Annie Bélanger et Frédéric Babeux, conseillers chez BBFAP',
  photoCaptionName = 'Annie Bélanger & Frédéric Babeux',
  photoCaptionRole = 'Vos conseillers chez BBFAP',
  officeName = 'Notre bureau',
  addressLines = ['5215 Chemin Chambly', 'Saint-Hubert, QC J3Y 3N5'],
  trustHeading = 'Pourquoi choisir BBFAP?',
  trustItems = [],
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const executeRecaptcha = useRecaptcha(CAPTCHA_SITE_KEY);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!CAPTCHA_SITE_KEY) {
      setSubmitted(true);
      form.reset();
      return;
    }
    setSubmitting(true);
    try {
      const captchaToken = await executeRecaptcha('contact');
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, captchaToken }),
      });
      if (!res.ok) throw new Error('submit_failed');
      setSubmitted(true);
      form.reset();
    } catch {
      setError('La vérification de sécurité a échoué. Veuillez réessayer dans un instant.');
    } finally {
      setSubmitting(false);
    }
  }

  const fieldCls = 'w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow';

  return (
    <section ref={ref} className="py-24 bg-white" aria-label={heading}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: form */}
          <div className={`fade-in ${inView ? 'visible' : ''}`}>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 leading-tight">{heading}</h2>
            {intro && <p className="text-gray-600 text-lg leading-relaxed mb-8">{intro}</p>}

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckMark className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-green-900 font-bold text-xl mb-2">Message envoyé!</h3>
                <p className="text-green-700">Merci pour votre message. Nous vous contacterons dans les prochaines 24 heures.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 mb-1.5">Prénom</label>
                    <input type="text" id="prenom" name="prenom" required className={fieldCls} placeholder="Votre prénom" />
                  </div>
                  <div>
                    <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-1.5">Nom</label>
                    <input type="text" id="nom" name="nom" required className={fieldCls} placeholder="Votre nom" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Courriel</label>
                  <input type="email" id="email" name="email" required className={fieldCls} placeholder="votre@courriel.com" />
                </div>
                <div>
                  <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Téléphone <span className="text-gray-400 font-normal">(optionnel)</span>
                  </label>
                  <input type="tel" id="telephone" name="telephone" className={fieldCls} placeholder="(514) 555-0000" />
                </div>
                <div>
                  <label htmlFor="sujet" className="block text-sm font-semibold text-gray-700 mb-1.5">Sujet</label>
                  <select id="sujet" name="sujet" required className={`${fieldCls} bg-white`}>
                    <option value="">Sélectionnez un sujet</option>
                    {subjectOptions.map((o) => <option key={o.value || o.label} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <fieldset>
                  <legend className="block text-sm font-semibold text-gray-700 mb-1.5">
                    À combien s'élèvent vos actifs investissables? <span className="text-red-500" aria-hidden="true">*</span>
                    <span className="block text-xs font-normal text-gray-500 mt-1 leading-relaxed">REER, CELI, CRI, FERR, FRV, comptes non-enregistrés, etc.</span>
                  </legend>
                  <div className="space-y-2 mt-3">
                    {assetOptions.map((opt) => (
                      <label key={opt} className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 has-[:checked]:border-[#16508C] has-[:checked]:bg-[#16508C]/5 has-[:checked]:ring-2 has-[:checked]:ring-[#16508C]/20 transition">
                        <input type="radio" name="actifsInvestissables" value={opt} required className="w-4 h-4 accent-[#16508C] border-gray-300" />
                        <span className="text-gray-900 text-sm font-medium">{opt}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="discussion" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    De quoi aimeriez-vous discuter avec nous? <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea id="discussion" name="discussion" rows={4} required className={`${fieldCls} resize-none`} placeholder="Décrivez brièvement votre situation ou vos questions..." />
                </div>
                {error && <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>}
                <button type="submit" disabled={submitting} className="inline-flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  <Send className="w-5 h-5" />
                  {submitting ? 'Envoi en cours…' : 'Envoyer le message'}
                </button>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Ce site est protégé par reCAPTCHA. La{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">politique de confidentialité</a>{' '}
                  et les{' '}
                  <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">conditions d'utilisation</a>{' '}
                  de Google s'appliquent.
                </p>
              </form>
            )}

            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-gray-500 text-sm mb-4 font-medium">Suivez-nous sur les réseaux sociaux</p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61560994705134" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 transition-colors" aria-label="Facebook Bélanger Brosseau"><Facebook className="w-5 h-5" /></a>
                <a href="https://www.linkedin.com/company/b%C3%A9langer-brosseau-fiscalit%C3%A9-assurances-placements-inc/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 transition-colors" aria-label="LinkedIn Bélanger Brosseau"><Linkedin className="w-5 h-5" /></a>
                <a href="https://www.youtube.com/@BelangerBrosseau" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 transition-colors" aria-label="YouTube Bélanger Brosseau"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
          </div>

          {/* Right: photo + trust sidebar */}
          <div className={`fade-in ${inView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            <div className="lg:sticky lg:top-28 space-y-6">
              <figure className="rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                <img src={photoImage} alt={photoAlt} className="w-full h-auto object-cover" loading="lazy" width="940" height="788" />
                <figcaption className="bg-white px-6 py-4 text-center">
                  <p className="text-gray-900 font-semibold">{photoCaptionName}</p>
                  <p className="text-gray-600 text-sm">{photoCaptionRole}</p>
                </figcaption>
              </figure>

              <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 space-y-6">
                <div className="flex gap-4 pb-6 border-b border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 border border-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">{officeName}</p>
                    {addressLines.map((line, i) => <p key={i} className="text-gray-600 text-sm">{line}</p>)}
                  </div>
                </div>

                {trustHeading && <h3 className="text-gray-900 font-bold text-xl mb-6">{trustHeading}</h3>}

                {trustItems.map((item, i) => (
                  <div key={item._key || i} className="flex gap-4">
                    <div className="w-8 h-8 bg-amber-400/20 border border-amber-400/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckMark className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">{item.title}</p>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
