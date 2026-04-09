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
          <img src="/images/team/team-dark.webp" alt="" className="w-full h-full object-cover object-center" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2448]/85 via-[#1B3A6B]/80 to-[#0f2448]/85" />
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
            <h1 id="about-hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
              Bélanger Brosseau – Le repreneuriat familial au cœur de notre approche
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Un cabinet en services financiers sur la Rive-Sud de Montréal, bâti avec rigueur, transmis avec confiance et développé pour les entrepreneurs d'aujourd'hui.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed text-center">
            <p>
              Chez Bélanger Brosseau, notre histoire s'inscrit dans une continuité.
            </p>
            <p>
              Celle d'un cabinet en services financiers établi sur la Rive-Sud de Montréal, qui accompagne depuis plus de 30 ans des clients à Saint-Hubert, Brossard, Longueuil, Boucherville, Saint-Bruno et les environs.
            </p>
            <p>
              Le repreneuriat familial est au cœur de notre approche&nbsp;: préserver une relation de proximité tout en faisant évoluer les stratégies en fiscalité, assurances et placements*.
            </p>
          </div>
        </div>
      </section>

      {/* Le repreneuriat familial chez Bélanger Brosseau */}
      <section className="py-20 bg-gray-50" aria-labelledby="repreneuriat-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
              Repreneuriat familial
            </span>
            <h2 id="repreneuriat-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Le repreneuriat familial chez Bélanger Brosseau
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Le repreneuriat familial ne se limite pas à un changement de direction.
              </p>
              <p>
                C'est un engagement à maintenir la confiance des clients, assurer la continuité des stratégies et faire évoluer l'accompagnement selon les réalités actuelles des entrepreneurs et professionnels incorporés.
              </p>
              <p>
                Chez Bélanger Brosseau, cette transition a été réalisée de manière structurée, avec une priorité claire&nbsp;: protéger la qualité de la relation client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Les origines de Bélanger Brosseau */}
      <section ref={originsRef} className="py-20 bg-white" aria-labelledby="origins-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`fade-in ${originsInView ? 'visible' : ''}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/team/team-white.webp"
                  alt="Annie Bélanger et Frédéric Babeux — Bélanger Brosseau"
                  className="w-full h-[400px] object-cover object-top"
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
                Les origines de Bélanger Brosseau
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Fondé au tournant des années 90 par Annie Bélanger et Louis-Pierre Brosseau, le cabinet s'est développé autour de trois piliers essentiels&nbsp;:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Fiscalité</li>
                  <li>Assurances</li>
                  <li>Placements*</li>
                </ul>
                <p>
                  Dès le départ, l'objectif était d'offrir des services financiers intégrés, adaptés aux besoins réels des clients de la Rive-Sud de Montréal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Une transition réussie en repreneuriat familial */}
      <section ref={releveRef} className="py-20 bg-gray-50" aria-labelledby="releve-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`order-2 lg:order-1 fade-in ${releveInView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
                Transition
              </span>
              <h2 id="releve-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Une transition réussie en repreneuriat familial
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  En 2019, Frédéric Babeux se joint à l'équipe. Cette intégration marque le début d'un processus de transition réfléchi, réalisé en collaboration étroite avec Louis-Pierre Brosseau.
                </p>
                <p>
                  En 2021, Frédéric reprend officiellement la direction de Bélanger Brosseau. Grâce à une année complète de transition, l'ensemble des clients a été conservé, assurant une continuité naturelle et rassurante.
                </p>
              </div>
            </div>
            <div className={`order-1 lg:order-2 fade-in ${releveInView ? 'visible' : ''}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/team/frederic-portrait.webp"
                  alt="Frédéric Babeux — relève de BBFAP"
                  className="w-full h-[400px] object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* L'évolution de Bélanger Brosseau en services financiers */}
      <section ref={evolutionRef} className="py-20 bg-white" aria-labelledby="evolution-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`fade-in ${evolutionInView ? 'visible' : ''}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/team/frederic-window.webp"
                  alt="Frédéric Babeux, gestionnaire de portefeuille — Bélanger Brosseau"
                  className="w-full h-[400px] object-cover object-center"
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
                L'évolution de Bélanger Brosseau en services financiers
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Avec l'arrivée de Frédéric Babeux, l'offre de services s'élargit. Détenteur d'un permis en valeurs mobilières, il permet désormais aux clients d'accéder à&nbsp;:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Actions</li>
                  <li>Obligations</li>
                  <li>Fonds négociés en bourse (FNB)</li>
                </ul>
                <p>
                  Cette évolution permet à Bélanger Brosseau d'offrir une alternative complète aux institutions financières traditionnelles, tout en conservant une approche humaine et personnalisée.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Un accompagnement dédié aux professionnels et entrepreneurs */}
      <section ref={clienteleRef} className="py-20 bg-gray-50" aria-labelledby="clientele-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 fade-in ${clienteleInView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
              Notre Clientèle
            </span>
            <h2 id="clientele-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Un accompagnement personnalisé pour chaque client
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Aujourd'hui, Bélanger Brosseau accompagne avec fierté plus de 150 entrepreneurs, professionnels et familles, dont&nbsp;:
            </p>
          </div>

          <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 fade-in ${clienteleInView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            {[
              'Entrepreneurs incorporés',
              'Médecins, dentistes, ingénieurs, optométristes',
              'Investisseurs immobiliers',
              'Consultants et jeunes professionnels',
              'Familles avec un patrimoine important',
              'Propriétaires d\'entreprise',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
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
                Le repreneuriat familial chez Bélanger Brosseau se traduit par une volonté claire&nbsp;: assurer la continuité tout en améliorant constamment la qualité du service.
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
