import { useRef } from 'react';
import { Calculator, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const services = [
  {
    id: 'fiscalite',
    icon: Calculator,
    title: 'Fiscalité',
    subtitle: 'Optimisation fiscale pour entrepreneurs',
    description: 'Chez nous, vous avez un accès direct à notre fiscaliste, Annie Bélanger (M. Fisc), impliquée dès le début dans votre dossier. Chez Bélanger Brosseau, vous n\'êtes pas un simple numéro — vous accédez à une famille qui vous accompagnera toute votre vie.',
    highlights: [
      'Planification fiscale personnalisée pour entrepreneurs incorporés',
      'Optimisation de la structure d\'entreprise',
      'Planification successorale et de retraite',
      'Gel successoral et stratégies avancées',
      'Accès direct à la fiscaliste — sans frais supplémentaires',
    ],
    image: '/images/original/general-1.webp',
    cta: 'En savoir plus sur la fiscalité',
    color: 'blue',
    accent: 'bg-blue-600',
    light: 'bg-blue-50',
    border: 'border-blue-200',
    tag: 'text-blue-700 bg-blue-100',
  },
  {
    id: 'assurances',
    icon: Shield,
    title: 'Assurances',
    subtitle: 'Protection complète pour vous et votre entreprise',
    description: 'En tant que courtier indépendant avec accès à 22 assureurs, nous trouvons la solution qui correspond parfaitement à vos besoins. Nous couvrons plus de 130 entrepreneurs dans la grande région de Montréal — médecins, dentistes, construction, technologies et plus.',
    highlights: [
      'Assurance vie temporaire et permanente',
      'Assurance invalidité et maladies graves',
      'Assurance frais généraux d\'entreprise',
      'Convention d\'actionnaires et rachat de parts',
      'Accès à 22 assureurs — meilleurs tarifs garantis',
    ],
    image: '/images/original/general-2.webp',
    cta: 'En savoir plus sur les assurances',
    color: 'indigo',
    accent: 'bg-indigo-600',
    light: 'bg-indigo-50',
    border: 'border-indigo-200',
    tag: 'text-indigo-700 bg-indigo-100',
  },
  {
    id: 'placements',
    icon: TrendingUp,
    title: 'Placements',
    subtitle: 'Gestion de portefeuille inspirée de Warren Buffett',
    description: 'Notre approche favorise les investissements à long terme dans des entreprises solides avec un avantage concurrentiel durable. Frédéric Babeux, Gestionnaire de Portefeuille (CIM), offre la gestion discrétionnaire — un service que les grandes banques réservent à leurs meilleurs clients.',
    highlights: [
      'Portefeuilles personnalisés — actions, obligations, FNB',
      'Gestion discrétionnaire pour clients incorporés',
      'Optimisation fiscale des placements en société',
      'Frais à honoraires — aucune commission cachée',
      'Stratégies de décaissement à la retraite',
    ],
    image: '/images/original/general-3.webp',
    cta: 'En savoir plus sur les placements',
    color: 'amber',
    accent: 'bg-amber-600',
    light: 'bg-amber-50',
    border: 'border-amber-200',
    tag: 'text-amber-700 bg-amber-100',
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1 });

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 bg-gray-50"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 fade-in ${inView ? 'visible' : ''}`}>
          <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Nos Services
          </span>
          <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trois expertises. Une équipe.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Fiscalité, assurances et placements — une gestion de patrimoine complète et intégrée pour les professionnels et entrepreneurs incorporés.
          </p>
        </div>

        {/* Service cards */}
        <div className="space-y-12">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isEven = i % 2 === 1;
            return (
              <div
                key={s.id}
                id={s.id}
                className={`fade-in ${inView ? 'visible' : ''} bg-white rounded-3xl shadow-sm overflow-hidden border ${s.border}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                  {/* Image side */}
                  <div className="lg:w-5/12 relative overflow-hidden min-h-64">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover min-h-64 lg:min-h-full"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 ${s.accent} opacity-20`} />
                    {/* Floating icon */}
                    <div className={`absolute top-6 ${isEven ? 'right-6' : 'left-6'} p-4 ${s.accent} rounded-2xl shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="lg:w-7/12 p-8 lg:p-12 flex flex-col justify-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${s.tag} w-fit mb-4`}>
                      {s.title}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                      {s.subtitle}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {s.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-8">
                      {s.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3 text-gray-700 text-sm">
                          <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${s.accent.replace('bg-', 'text-')}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="https://www.bbfap.com/prendre-rendez-vous"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 ${s.accent} hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 w-fit`}
                    >
                      {s.cta}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
