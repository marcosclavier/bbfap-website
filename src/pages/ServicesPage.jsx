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
          <img src="/images/original/hero.webp" alt="" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2448]/90 via-[#1B3A6B]/85 to-[#0f2448]/90" />
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
            <h1 id="services-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
              Nos services financiers chez BBFAP
            </h1>
            <h2 className="text-xl sm:text-2xl text-amber-400 font-semibold mb-6">
              Des services financiers intégrés pour structurer et faire évoluer votre patrimoine
            </h2>
            <div className="space-y-4 text-white/80 text-lg leading-relaxed max-w-3xl mx-auto">
              <p>
                Chez BBFAP, nous offrons des services financiers complets qui s'articulent autour de trois piliers essentiels : la fiscalité, les assurances et les placements*.
              </p>
              <p>
                Notre objectif est de vous aider à prendre des décisions cohérentes, en tenant compte de votre réalité professionnelle, de votre structure corporative et de vos objectifs à long terme.
              </p>
              <p>
                Chaque intervention repose sur une approche simple et rigoureuse : bien comprendre, bien mettre en place, et bien suivre.
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
              Notre Approche
            </span>
            <h2 id="approach-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Une méthode structurée en trois étapes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ClipboardCheck,
                step: '01',
                title: 'Évaluation',
                description: "Nous analysons votre situation dans son ensemble : revenus, structure, fiscalité, protections existantes et stratégie de placement*. Cette étape permet d'identifier les opportunités et les incohérences.",
                color: 'text-blue-700',
                bg: 'bg-blue-50',
                border: 'border-blue-100',
              },
              {
                icon: Settings,
                step: '02',
                title: 'Implantation',
                description: "Nous mettons en place des stratégies adaptées à votre réalité, en sélectionnant des solutions concrètes en fiscalité, assurances et placements*.",
                color: 'text-indigo-700',
                bg: 'bg-indigo-50',
                border: 'border-indigo-100',
              },
              {
                icon: RefreshCw,
                step: '03',
                title: 'Suivi',
                description: "Votre situation évolue. Nous assurons un suivi régulier afin d'ajuster les stratégies en fonction des changements personnels, professionnels et fiscaux.",
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
                  src="/images/original/general-1.webp"
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
              <h2 className="text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
                Fiscalité
              </h2>
              <h3 id="fiscalite-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Optimiser votre structure et vos décisions
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  La fiscalité joue un rôle central dans l'efficacité de vos décisions financières.
                </p>
                <p>
                  Nous vous accompagnons pour structurer adéquatement vos revenus, optimiser votre réalité corporative et réduire les frictions fiscales, dans le respect des règles en vigueur.
                </p>
                <p>
                  Notre approche vise la cohérence entre vos décisions fiscales, vos placements* et vos protections.
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
              <h2 className="text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
                Assurances
              </h2>
              <h3 id="assurances-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Protéger votre revenu, votre famille et votre entreprise
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Les assurances sont un élément clé de toute stratégie financière bien construite.
                </p>
                <p>
                  Nous vous aidons à identifier les risques réels et à mettre en place des protections adaptées, sans surplus inutile.
                </p>
                <p>
                  Qu'il s'agisse d'assurance vie, invalidité ou maladies graves, chaque solution est choisie en fonction de votre situation et de vos priorités.
                </p>
              </div>
            </div>
            <div className={`order-1 lg:order-2 fade-in ${assurancesInView ? 'visible' : ''}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/original/general-2.webp"
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
                  src="/images/original/general-3.webp"
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
              <h2 className="text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
                Placements*
              </h2>
              <h3 id="placements-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Structurer et faire croître votre capital
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Les placements* doivent être alignés avec votre profil, votre horizon et votre réalité fiscale.
                </p>
                <p>
                  Nous vous donnons accès à une gamme complète de solutions, incluant actions, obligations et fonds négociés en bourse, afin de construire des portefeuilles diversifiés et adaptés.
                </p>
                <p>
                  Notre rôle est de structurer vos investissements avec discipline, sans complexité inutile.
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
              Une vision globale de vos finances, sans silos
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Fiscalité, assurances et placements* ne doivent pas être gérés séparément.
              </p>
              <p>
                Nous assurons une cohérence entre ces dimensions afin d'éviter les contradictions et maximiser l'efficacité globale de vos décisions.
              </p>
              <p>
                C'est cette intégration qui permet d'obtenir une structure financière solide et durable.
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
              Une expertise adaptée aux professionnels incorporés
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Nos services s'adressent principalement aux entrepreneurs et professionnels incorporés qui souhaitent structurer efficacement leur situation financière.
              </p>
              <p>
                Nous comprenons les enjeux liés à la gestion corporative, à l'optimisation fiscale et à la croissance du patrimoine dans un contexte professionnel exigeant.
              </p>
            </div>
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
