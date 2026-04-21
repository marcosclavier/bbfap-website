import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Shield, TrendingUp, ClipboardCheck, Settings, RefreshCw, Calendar, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function ServicesPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { threshold: 0.2 });

  const approachRef = useRef(null);
  const approachInView = useInView(approachRef, { threshold: 0.1 });

  const fiscaliteRef = useRef(null);
  const fiscaliteInView = useInView(fiscaliteRef, { threshold: 0.2 });

  const assurancesRef = useRef(null);
  const assurancesInView = useInView(assurancesRef, { threshold: 0.2 });

  const placementsRef = useRef(null);
  const placementsInView = useInView(placementsRef, { threshold: 0.2 });

  const integrationRef = useRef(null);
  const integrationInView = useInView(integrationRef, { threshold: 0.2 });

  const clienteleRef = useRef(null);
  const clienteleInView = useInView(clienteleRef, { threshold: 0.2 });

  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { threshold: 0.2 });

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" aria-labelledby="services-hero-heading">
        <div className="absolute inset-0">
          <img src="/images/team/frederic-headshot.webp" alt="" className="w-full h-full object-cover object-top" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2448]/75 via-[#1B3A6B]/55 to-[#0d1f3c]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f3c]/65 via-[#0d1f3c]/15 to-transparent" />
        </div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`fade-in ${heroInView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-400 text-xl font-semibold uppercase tracking-widest mb-4">
              Nos Services
            </span>
            <h1 id="services-hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
              Nos services financiers chez Bélanger Brosseau – Rive-Sud de Montréal
            </h1>
            <p className="text-xl sm:text-2xl text-amber-400 font-semibold mb-6">
              Des services en fiscalité, assurances et placements* pour les entrepreneurs et professionnels de Saint-Hubert, Brossard, Longueuil et la Rive-Sud.
            </p>
            <div className="space-y-4 text-white/80 text-lg leading-relaxed max-w-3xl mx-auto">
              <p>
                Chez Bélanger Brosseau, nous offrons des services financiers complets qui s'articulent autour de trois piliers essentiels&nbsp;: la fiscalité, les assurances et les placements*.
              </p>
              <p>
                Basés à Saint-Hubert, nous accompagnons une clientèle située à Brossard, Longueuil, Boucherville, Saint-Bruno, Saint-Lambert, Saint-Constant, et toute la Rive-Sud de Montréal.
              </p>
              <p>
                Notre objectif est de vous aider à prendre des décisions financières cohérentes, en tenant compte de votre réalité professionnelle, de votre structure corporative et de vos objectifs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach - 3 steps */}
      <section ref={approachRef} className="py-24 bg-white" aria-labelledby="approach-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 fade-in ${approachInView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
              L'approche Bélanger Brosseau en services financiers
            </span>
            <h2 id="approach-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Une méthode structurée&nbsp;: évaluation, implantation, suivi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ClipboardCheck,
                step: '01',
                title: 'Évaluation',
                description: "Nous réalisons une analyse complète de votre situation : fiscalité, structure corporative, assurances en place et placements*. Cette étape permet d'identifier les opportunités d'optimisation pour les entrepreneurs et professionnels de la Rive-Sud de Montréal.",
                color: 'text-blue-700',
                bg: 'bg-blue-50',
                border: 'border-blue-100',
              },
              {
                icon: Settings,
                step: '02',
                title: 'Implantation',
                description: "Nous mettons en place des stratégies concrètes en fiscalité, assurances et placements*, adaptées à votre réalité. Chaque solution est choisie avec rigueur, sans complexité inutile.",
                color: 'text-indigo-700',
                bg: 'bg-indigo-50',
                border: 'border-indigo-100',
              },
              {
                icon: RefreshCw,
                step: '03',
                title: 'Suivi',
                description: "Votre situation évolue. Nous assurons un suivi régulier pour ajuster vos stratégies selon l'évolution de votre situation et des règles fiscales.",
                color: 'text-amber-700',
                bg: 'bg-amber-50',
                border: 'border-amber-100',
              },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className={`relative rounded-2xl border ${s.border} bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 fade-in ${approachInView ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <span className="absolute top-6 right-6 text-4xl font-bold text-gray-100 select-none">
                    {s.step}
                  </span>
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${s.bg} rounded-xl mb-6`}>
                    <Icon className={`w-7 h-7 ${s.color}`} />
                  </div>
                  <h3 className={`text-2xl font-bold ${s.color} mb-4`}>{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FISCALITÉ */}
      <section ref={fiscaliteRef} className="py-20 bg-gray-50" aria-labelledby="fiscalite-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`fade-in ${fiscaliteInView ? 'visible' : ''}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/generated/service-fiscalite.webp"
                  alt="Services de fiscalité — BBFAP"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-blue-600/20" />
                <div className="absolute top-6 left-6 p-4 bg-blue-600 rounded-2xl shadow-lg">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <div className={`fade-in ${fiscaliteInView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              <h2 id="fiscalite-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Fiscalité – Services financiers Bélanger Brosseau sur la Rive-Sud
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  La fiscalité est un levier central dans toute décision financière.
                </p>
                <p>
                  Chez Bélanger Brosseau, nous accompagnons les clients de Saint-Hubert, Brossard, Longueuil et les environs dans&nbsp;:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>L'optimisation de la structure corporative</li>
                  <li>La gestion des revenus</li>
                  <li>La réduction des impacts fiscaux</li>
                </ul>
                <p>
                  Notre objectif est d'assurer une cohérence entre vos décisions fiscales, vos assurances et vos placements*.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ASSURANCES */}
      <section ref={assurancesRef} className="py-20 bg-white" aria-labelledby="assurances-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`order-2 lg:order-1 fade-in ${assurancesInView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              <h2 id="assurances-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Assurances – Protéger votre revenu et votre entreprise
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Les assurances permettent de sécuriser votre situation financière.
                </p>
                <p>
                  Nous aidons les entrepreneurs et professionnels de la Rive-Sud de Montréal à mettre en place des protections adaptées&nbsp;:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Assurance vie</li>
                  <li>Assurance invalidité</li>
                  <li>Assurance maladies graves</li>
                </ul>
                <p>
                  Chaque recommandation est basée sur vos besoins réels, sans surplus.
                </p>
              </div>
            </div>
            <div className={`order-1 lg:order-2 fade-in ${assurancesInView ? 'visible' : ''}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/generated/service-assurances.webp"
                  alt="Services d'assurances — BBFAP"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-indigo-600/20" />
                <div className="absolute top-6 right-6 p-4 bg-indigo-600 rounded-2xl shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLACEMENTS */}
      <section ref={placementsRef} className="py-20 bg-gray-50" aria-labelledby="placements-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`fade-in ${placementsInView ? 'visible' : ''}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/generated/service-placements.webp"
                  alt="Services de placements — BBFAP"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-amber-600/20" />
                <div className="absolute top-6 left-6 p-4 bg-amber-600 rounded-2xl shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <div className={`fade-in ${placementsInView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              <h2 id="placements-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Placements* – Stratégies d'investissement avec Bélanger Brosseau
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Les placements* doivent être structurés avec discipline et cohérence.
                </p>
                <p>
                  Nous offrons aux clients de Saint-Hubert et de la Rive-Sud un accès à&nbsp;:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Actions</li>
                  <li>Obligations</li>
                  <li>Fonds négociés en bourse (FNB)</li>
                </ul>
                <p>
                  Nous construisons des portefeuilles adaptés à votre profil, en tenant compte de votre réalité fiscale et corporative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section ref={integrationRef} className="py-20 bg-white" aria-labelledby="integration-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`fade-in ${integrationInView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
              Intégration des services
            </span>
            <h2 id="integration-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Des services financiers intégrés&nbsp;: fiscalité, assurances et placements*
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Chez Bélanger Brosseau, nous croyons qu'un service financier efficace repose sur l'intégration.
              </p>
              <p>
                La fiscalité, les assurances et les placements* doivent fonctionner ensemble pour éviter les incohérences.
              </p>
              <p>
                C'est cette approche globale qui nous permet d'accompagner efficacement les clients de Brossard, Longueuil, Boucherville, Saint-Bruno et Saint-Lambert.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clientèle */}
      <section ref={clienteleRef} className="py-20 bg-gray-50" aria-labelledby="services-clientele-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`fade-in ${clienteleInView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
              Clientèle
            </span>
            <h2 id="services-clientele-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Services financiers pour entrepreneurs – Rive-Sud de Montréal
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Nos services s'adressent principalement aux entrepreneurs, professionnels et familles qui souhaitent structurer efficacement leur situation financière&nbsp;:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto mb-6">
              {[
                'Entrepreneurs incorporés',
                'Médecins, dentistes, ingénieurs, optométristes…',
                'Investisseurs immobiliers',
                'Consultants et jeunes professionnels',
                'Familles avec un patrimoine important',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
              <li className="sm:col-span-2">
                <Link
                  to="/contact"
                  className="group flex items-center justify-between gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200 hover:bg-amber-100 hover:border-amber-300 transition-colors"
                >
                  <span className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    <span className="text-gray-800 font-medium">
                      Et bien d'autres&nbsp;— contactez-nous pour en savoir plus
                    </span>
                  </span>
                </Link>
              </li>
            </ul>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nous comprenons les enjeux liés à la réalité corporative et aux décisions financières complexes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-24 relative overflow-hidden" aria-labelledby="services-cta-heading">
        <div className="absolute inset-0">
          <img
            src="/images/generated/section-contact.webp"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2448]/95 via-[#1B3A6B]/90 to-[#0d1f3c]/95" />
        </div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} aria-hidden="true" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`fade-in ${ctaInView ? 'visible' : ''}`}>
            <h2 id="services-cta-heading" className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Discutons de votre situation
            </h2>
            <div className="space-y-4 text-blue-200 text-lg leading-relaxed mb-10">
              <p>
                Une bonne structure financière commence toujours par une bonne compréhension.
              </p>
              <p>
                Prenez rendez-vous pour échanger sur votre situation actuelle et voir comment nos services en fiscalité, assurances et placements* peuvent vous apporter plus de clarté et de cohérence.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
            >
              <Calendar className="w-6 h-6" />
              Prenez rendez-vous
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
