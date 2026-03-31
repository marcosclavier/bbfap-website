import { useRef } from 'react';
import { Linkedin } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const team = [
  {
    name: 'Frédéric Babeux',
    credentials: 'B.A.A., CIM',
    title: 'Gestionnaire de Portefeuille',
    subtitle: 'Conseiller en Sécurité Financière',
    experience: '8+ ans',
    image: '/images/original/general-8.webp',
    bgColor: 'bg-blue-700',
    bio: 'Frédéric compte plus de 8 années d\'expérience dans le domaine des services financiers. Titulaire d\'un Baccalauréat en Administration des Affaires – Profil Finance, il a travaillé comme Analyste au Risque de Crédit auprès de la Banque Nationale et comme Représentant chez la Financière Sun Life.',
    bioDetails: 'En 2019, il saisit l\'opportunité de reprendre l\'entreprise familiale. Frédéric voit à la construction des portefeuilles personnalisés et élabore les stratégies d\'efficacité fiscale. Son titre de Gestionnaire de Portefeuille Adjoint lui permet d\'offrir la gestion discrétionnaire à nos clients.',
    specialties: [
      'Construction de portefeuilles personnalisés',
      'Gestion discrétionnaire',
      'Stratégies d\'efficacité fiscale',
      'Planification de décaissement',
      'Actions, obligations, FNB',
    ],
    registration: 'Inscrit à titre de Gestionnaire de Portefeuille — Valeurs Mobilières PEAK Inc.',
  },
  {
    name: 'Annie Bélanger',
    credentials: 'M. Fisc, Pl. Fin, A.V.A.',
    title: 'Planificatrice Financière',
    subtitle: 'Conseillère en Sécurité Financière',
    experience: '30+ ans',
    image: '/images/original/hero.webp',
    bgColor: 'bg-indigo-700',
    bio: 'Annie possède plus de 30 années d\'expérience dans le secteur de l\'assurance vie. Elle a obtenu un Baccalauréat en administration des affaires à l\'Université d\'Ottawa en 1989, le titre d\'Assureure Vie Agréée (AVA) en 1994, et une Maîtrise en Fiscalité (M. Fisc.) de l\'Université de Sherbrooke en 2011.',
    bioDetails: 'Annie a travaillé pendant plus de 20 ans dans les compagnies d\'assurances et grandes institutions financières pour aider les familles à valeur nette élevée. Elle élabore des stratégies d\'assurance tant personnelles que d\'affaires pour réduire votre fardeau fiscal et protéger votre patrimoine.',
    specialties: [
      'Planification fiscale avancée (M. Fisc.)',
      'Stratégies d\'assurance créatives',
      'Planification successorale',
      'Gel successoral',
      'Assurance vie et rentes',
    ],
    registration: 'Inscrite auprès de Bélanger, Brosseau, Fiscalité, Assurance & Placements Inc. — AMF',
  },
];

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1 });

  return (
    <section
      id="equipe"
      ref={ref}
      className="py-24 bg-[#F0F4FB]"
      aria-labelledby="equipe-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 fade-in ${inView ? 'visible' : ''}`}>
          <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Notre Équipe
          </span>
          <h2 id="equipe-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Des experts à votre service
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Une équipe complémentaire unissant expertise en placements, fiscalité et assurances pour une gestion de patrimoine intégrée.
          </p>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`fade-in ${inView ? 'visible' : ''} bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Top section with image and name */}
              <div className={`${member.bgColor} p-8 flex gap-6 items-start`}>
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white/30">
                    <img
                      src={member.image}
                      alt={`Photo de ${member.name}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {member.experience}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                  <p className="text-white/70 text-sm font-mono mb-2">{member.credentials}</p>
                  <p className="text-white font-semibold">{member.title}</p>
                  <p className="text-white/80 text-sm">{member.subtitle}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-8">
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{member.bio}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bioDetails}</p>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="text-gray-900 font-semibold text-sm mb-3">Spécialités</h4>
                  <ul className="space-y-1.5">
                    {member.specialties.map((sp) => (
                      <li key={sp} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        {sp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Registration */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 leading-relaxed">{member.registration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LinkedIn CTA */}
        <div className={`mt-10 text-center fade-in ${inView ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
          <a
            href="https://www.linkedin.com/company/b%C3%A9langer-brosseau-fiscalit%C3%A9-assurances-placements-inc/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold text-sm transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            Suivez-nous sur LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
