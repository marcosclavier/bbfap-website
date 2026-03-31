import { useRef } from 'react';
import { Clock, Eye, TrendingUp } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const valeurs = [
  {
    number: '01',
    icon: Clock,
    title: 'Disponibilité',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    points: [
      'Retours d\'appels et courriels en moins de 24h',
      'Rencontres à domicile, à vos bureaux ou par vidéoconférence',
      'Disponibilités de jour ET de soir',
      'Fiscaliste attitrée à votre dossier',
    ],
  },
  {
    number: '02',
    icon: Eye,
    title: 'Transparence',
    color: 'text-indigo-700',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    points: [
      'Conseillers 100% indépendants',
      'Pas de produits maison — vos intérêts d\'abord',
      'Frais clairement divulgués dès le départ',
      'Aucune commission cachée, aucun frais de transaction',
    ],
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Voir Loin',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    points: [
      'Vos besoins passent en premier, toujours',
      'Approche multi-générationnelle du patrimoine',
      'Relations à long terme fondées sur la confiance',
      'Stratégies fiscales et successorales intégrées',
    ],
  },
];

export default function Valeurs() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.15 });

  return (
    <section
      id="valeurs"
      ref={ref}
      className="py-24 bg-white"
      aria-labelledby="valeurs-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 fade-in ${inView ? 'visible' : ''}`}>
          <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Nos Valeurs
          </span>
          <h2 id="valeurs-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ce qui nous distingue
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Trois piliers fondamentaux guident chacune de nos interactions avec nos clients.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valeurs.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className={`relative rounded-2xl border ${v.border} bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 fade-in ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Number */}
                <span className="absolute top-6 right-6 text-4xl font-bold text-gray-100 select-none">
                  {v.number}
                </span>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 ${v.bg} rounded-xl mb-6`}>
                  <Icon className={`w-7 h-7 ${v.color}`} />
                </div>

                {/* Title */}
                <h3 className={`text-2xl font-bold ${v.color} mb-4`}>{v.title}</h3>

                {/* Points */}
                <ul className="space-y-3">
                  {v.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-gray-600">
                      <svg className={`w-4 h-4 mt-1 flex-shrink-0 ${v.color}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
