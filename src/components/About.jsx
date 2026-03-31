import { useRef } from 'react';
import { useInView } from '../hooks/useInView';

const milestones = [
  {
    year: 'Années 90',
    title: 'Fondation de l\'entreprise',
    description: 'Annie Bélanger et Louis-Pierre Brosseau fondent Bélanger, Brosseau Fiscalité, Assurances & Placements Inc. — une vision ancrée dans trois grandes spécialisations : la fiscalité, les assurances et les placements*.',
  },
  {
    year: '2019',
    title: 'Arrivée de Frédéric Babeux',
    description: 'Frédéric Babeux, gendre de la famille, rejoint l\'équipe. Il apporte son permis en Valeurs Mobilières, permettant d\'offrir des actions, obligations et FNB — rivalisant désormais avec les grandes banques.',
  },
  {
    year: '2021',
    title: 'Repreneuriat familial',
    description: 'Après une année de transition harmonieuse avec Louis-Pierre, Frédéric reprend les rênes de l\'entreprise familiale. Louis-Pierre prend sa retraite en sachant que ses clients sont entre de bonnes mains.',
  },
  {
    year: "Aujourd'hui",
    title: 'Plus de 100 entrepreneurs accompagnés',
    description: 'Médecins, Dentistes, Optométristes, Investisseurs Immobiliers, Consultants et familles fortunées — nous déployons toute notre énergie pour offrir un service hors pairs à chaque client.',
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1 });

  return (
    <section
      id="histoire"
      ref={ref}
      className="py-24 bg-white overflow-hidden"
      aria-labelledby="histoire-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image + decorative */}
          <div className={`relative fade-in ${inView ? 'visible' : ''}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/original/general.webp"
                alt="L'équipe Bélanger Brosseau — repreneuriat familial"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/60 to-transparent" />
              {/* Floating quote card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-5 shadow-lg">
                <p className="text-gray-800 font-medium italic text-sm leading-relaxed">
                  "Chez Bélanger Brosseau, vous n'êtes pas qu'un simple numéro. Vous accédez à une famille qui vous accompagnera toute votre vie."
                </p>
                <p className="text-amber-600 text-sm font-semibold mt-2">— L'équipe Bélanger Brosseau</p>
              </div>
            </div>

            {/* Decorative badge */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400 rounded-2xl flex flex-col items-center justify-center shadow-xl rotate-3 hidden lg:flex">
              <span className="text-white font-bold text-2xl leading-none">30+</span>
              <span className="text-white/90 text-xs font-medium text-center leading-tight mt-1">ans d'expérience</span>
            </div>
          </div>

          {/* Right: Content */}
          <div className={`fade-in ${inView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Notre Histoire
            </span>
            <h2 id="histoire-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Plein feu sur le{' '}
              <span className="text-blue-700">repreneuriat familial</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              De la génération fondatrice à la relève — notre histoire est celle d'une entreprise familiale construite sur la confiance, l'expertise et la continuité au service des entrepreneurs.
            </p>

            {/* Timeline */}
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex gap-5 fade-in ${inView ? 'visible' : ''}`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-[#1B3A6B] flex items-center justify-center shadow-md">
                      <span className="text-white text-xs font-bold">{i + 1}</span>
                    </div>
                    {i < milestones.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gray-200 mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <span className="inline-block text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full mb-1">
                      {m.year}
                    </span>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{m.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
