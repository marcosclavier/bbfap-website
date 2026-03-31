import { useRef } from 'react';
import { useInView } from '../hooks/useInView';

const stats = [
  {
    value: '100+',
    label: 'Entrepreneurs accompagnés',
    detail: 'Dont 75+ Dentistes, 30+ Médecins, 30+ Optométristes',
  },
  {
    value: '33%',
    label: 'Familles servies sur plusieurs générations',
    detail: 'De nos familles sont servies sur plus d\'une génération',
  },
  {
    value: '100%',
    label: 'Accès gratuit à notre fiscaliste',
    detail: 'Tous nos clients ont accès à notre fiscaliste sans frais supplémentaires',
  },
  {
    value: '22',
    label: 'Assureurs partenaires',
    detail: 'Accès aux meilleures solutions d\'assurance sur le marché',
  },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });

  return (
    <section
      id="impact"
      ref={ref}
      className="py-20 bg-[#1B3A6B]"
      aria-labelledby="impact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-16 fade-in ${inView ? 'visible' : ''}`}>
          <span className="inline-block text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Notre Impact
          </span>
          <h2 id="impact-heading" className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Des résultats concrets pour vos finances
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto text-lg">
            Depuis plus de 30 ans, nous accompagnons les entrepreneurs et professionnels incorporés dans l'optimisation de leur patrimoine.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center fade-in ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-colors">
                <div className="text-5xl font-bold text-amber-400 mb-3">{s.value}</div>
                <div className="text-white font-semibold text-lg mb-2">{s.label}</div>
                <div className="text-blue-200 text-sm leading-relaxed">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <div className={`mt-16 pt-10 border-t border-white/10 fade-in ${inView ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
          <div className="flex flex-wrap justify-center items-center gap-8 text-blue-200 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Cabinet indépendant — AMF inscrit
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Gestionnaire de Portefeuille — OCRI réglementé
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Membre FCPI — Protection des investisseurs
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              Valeurs Mobilières PEAK Inc.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
