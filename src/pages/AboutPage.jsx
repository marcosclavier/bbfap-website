import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function AboutPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { threshold: 0.2 });

  const originsRef = useRef(null);
  const originsInView = useInView(originsRef, { threshold: 0.2 });

  const releveRef = useRef(null);
  const releveInView = useInView(releveRef, { threshold: 0.2 });

  const evolutionRef = useRef(null);
  const evolutionInView = useInView(evolutionRef, { threshold: 0.2 });

  const clienteleRef = useRef(null);
  const clienteleInView = useInView(clienteleRef, { threshold: 0.2 });

  const confianceRef = useRef(null);
  const confianceInView = useInView(confianceRef, { threshold: 0.2 });

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" aria-labelledby="about-hero-heading">
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
              À propos
            </span>
            <h1 id="about-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Le repreneuriat familial au cœur de notre approche
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Chez BBFAP, notre histoire s'inscrit dans une continuité. Celle d'un cabinet bâti avec rigueur, transmis avec confiance et développé avec vision.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-lg leading-relaxed text-center">
            Le repreneuriat familial n'est pas seulement un passage de relais. C'est un engagement à préserver une relation de proximité, tout en faisant évoluer l'offre pour répondre aux réalités d'aujourd'hui.
          </p>
        </div>
      </section>

      {/* Les origines de BBFAP */}
      <section ref={originsRef} className="py-20 bg-gray-50" aria-labelledby="origins-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`fade-in ${originsInView ? 'visible' : ''}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/original/team.webp"
                  alt="Annie Bélanger et Frédéric Babeux — BBFAP"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/40 to-transparent" />
              </div>
            </div>
            <div className={`fade-in ${originsInView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
                Nos Origines
              </span>
              <h2 id="origins-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Les origines de BBFAP
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Fondé au tournant des années 90 par Annie Bélanger et Louis-Pierre Brosseau, Bélanger, Brosseau Fiscalité, Assurances & Placements Inc. s'est construit autour de trois piliers essentiels : la fiscalité, les assurances et les placements.
                </p>
                <p>
                  Dès le départ, l'objectif était clair : accompagner les clients avec une approche complète, structurée et durable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Une relève pensée et accompagnée */}
      <section ref={releveRef} className="py-20 bg-white" aria-labelledby="releve-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`order-2 lg:order-1 fade-in ${releveInView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
                Transition
              </span>
              <h2 id="releve-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Une relève pensée et accompagnée
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  En 2019, Frédéric Babeux se joint à l'équipe familiale. Cette intégration marque le début d'une transition réfléchie, réalisée en étroite collaboration avec Louis-Pierre Brosseau.
                </p>
                <p>
                  En 2021, Frédéric reprend officiellement les rênes de l'entreprise. Grâce à une année de transition complète, l'ensemble des clients a été maintenu, assurant une continuité naturelle et rassurante.
                </p>
                <p>
                  Ce passage s'est fait dans le respect des valeurs fondatrices, avec une priorité claire : préserver la qualité de l'accompagnement.
                </p>
              </div>
            </div>
            <div className={`order-1 lg:order-2 fade-in ${releveInView ? 'visible' : ''}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/original/general-1.webp"
                  alt="Transition et relève chez BBFAP"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Une évolution naturelle avec Frédéric Babeux */}
      <section ref={evolutionRef} className="py-20 bg-gray-50" aria-labelledby="evolution-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`fade-in ${evolutionInView ? 'visible' : ''}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/generated/section-portfolio.webp"
                  alt="Planification financière — BBFAP"
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/40 to-transparent" />
              </div>
            </div>
            <div className={`fade-in ${evolutionInView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
                Évolution
              </span>
              <h2 id="evolution-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Une évolution naturelle avec Frédéric Babeux
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Avec l'arrivée de Frédéric, l'offre de services s'élargit. Titulaire d'un permis en valeurs mobilières, il permet désormais aux clients d'accéder à une gamme complète de solutions, incluant les actions, obligations et fonds négociés en bourse.
                </p>
                <p>
                  Cette évolution renforce la capacité du cabinet à offrir une approche intégrée et concurrentielle, comparable à celle des grandes institutions, tout en conservant une relation humaine et personnalisée.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Un accompagnement dédié aux professionnels et entrepreneurs */}
      <section ref={clienteleRef} className="py-20 bg-white" aria-labelledby="clientele-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 fade-in ${clienteleInView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
              Notre Clientèle
            </span>
            <h2 id="clientele-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Un accompagnement dédié aux professionnels et entrepreneurs
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Aujourd'hui, BBFAP accompagne avec fierté plus de 100 entrepreneurs et professionnels incorporés, dont :
            </p>
          </div>

          <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 fade-in ${clienteleInView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            {[
              'Médecins',
              'Dentistes',
              'Optométristes',
              'Investisseurs immobiliers',
              'Consultants',
              'Familles disposant d\'un patrimoine important',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>

          <p className={`text-gray-600 text-lg leading-relaxed text-center fade-in ${clienteleInView ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
            Chaque client bénéficie d'un accompagnement adapté à sa réalité, avec une attention particulière portée à la structure corporative, à la fiscalité et à la croissance du patrimoine.
          </p>
        </div>
      </section>

      {/* Continuité, rigueur et relation de confiance */}
      <section ref={confianceRef} className="py-24 relative overflow-hidden" aria-labelledby="confiance-heading">
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
          <div className={`fade-in ${confianceInView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-400 text-xl font-semibold uppercase tracking-widest mb-4">
              Notre Engagement
            </span>
            <h2 id="confiance-heading" className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Continuité, rigueur et relation de confiance
            </h2>
            <div className="space-y-4 text-blue-200 text-lg leading-relaxed mb-10">
              <p>
                Le repreneuriat familial chez BBFAP se traduit par une volonté claire : assurer la continuité tout en améliorant constamment la qualité du service.
              </p>
              <p>
                Nous croyons qu'une relation durable repose sur la confiance, la transparence et une compréhension approfondie de votre situation.
              </p>
              <p>
                C'est cette philosophie qui guide chacune de nos recommandations, aujourd'hui comme demain.
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
