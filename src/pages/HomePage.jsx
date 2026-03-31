import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, TrendingUp, Shield, Briefcase, ClipboardList, Eye, MessageCircle, Handshake, Calendar, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function HomePage() {
  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const t = setTimeout(() => el.classList.add('hero-visible'), 100);
    return () => clearTimeout(t);
  }, []);

  const introRef = useRef(null);
  const introInView = useInView(introRef, { threshold: 0.2 });

  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { threshold: 0.1 });

  const whyRef = useRef(null);
  const whyInView = useInView(whyRef, { threshold: 0.1 });

  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { threshold: 0.2 });

  const contactRef = useRef(null);
  const contactInView = useInView(contactRef, { threshold: 0.2 });

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="BBFAP — Stratégies financières"
      >
        <div className="absolute inset-0">
          <img
            src="/images/original/hero.webp"
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2448]/90 via-[#1B3A6B]/80 to-[#0f2448]/85" />
        </div>

        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div ref={heroRef} className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-white/90 text-sm font-medium tracking-wide uppercase">
              Conseiller Financier Indépendant
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight mb-6 max-w-5xl mx-auto">
            Des stratégies financières réfléchies pour les{' '}
            <span className="text-amber-400">professionnels</span>{' '}
            d'aujourd'hui
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Nous accompagnons les professionnels et entrepreneurs dans leurs décisions en placement, assurance et sécurité financière, avec rigueur et transparence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
            >
              Parler à un conseiller
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg rounded-xl transition-all duration-200"
            >
              Découvrir nos services
            </Link>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-amber-400 font-bold text-xl">100+</span>
              Entrepreneurs accompagnés
            </span>
            <span className="w-px h-5 bg-white/20 self-center hidden sm:block" />
            <span className="flex items-center gap-2">
              <span className="text-amber-400 font-bold text-xl">30+</span>
              Années d'expérience
            </span>
            <span className="w-px h-5 bg-white/20 self-center hidden sm:block" />
            <span className="flex items-center gap-2">
              <span className="text-amber-400 font-bold text-xl">22</span>
              Assureurs partenaires
            </span>
          </div>
        </div>

        <a
          href="#introduction"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors animate-bounce"
          aria-label="Faire défiler vers le bas"
        >
          <ChevronDown size={32} />
        </a>
      </section>

      {/* Introduction Section */}
      <section id="introduction" ref={introRef} className="py-24 bg-white" aria-labelledby="intro-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center fade-in ${introInView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
              À propos de BBFAP
            </span>
            <h2 id="intro-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
              Une approche claire et structurée
            </h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Chez BBFAP, nous croyons que de bonnes décisions financières reposent sur une compréhension claire de votre situation et de vos objectifs.
              </p>
              <p>
                Nous accompagnons principalement des professionnels et des entrepreneurs dans la gestion de leur patrimoine, en proposant des stratégies cohérentes en placement, assurance et planification financière.
              </p>
              <p>
                Notre rôle est simple : vous aider à structurer vos décisions avec méthode, clarté et discipline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-24 bg-gray-50" aria-labelledby="home-services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 fade-in ${servicesInView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
              Nos Services
            </span>
            <h2 id="home-services-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Trois expertises. Une équipe.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Placements et gestion de patrimoine',
                description: "Des stratégies d'investissement adaptées à votre profil, vos objectifs et votre réalité professionnelle.",
                color: 'text-blue-700',
                bg: 'bg-blue-50',
                border: 'border-blue-100',
              },
              {
                icon: Shield,
                title: 'Assurance de personnes et protection financière',
                description: "Des solutions pour protéger votre revenu, votre famille et votre entreprise face aux imprévus.",
                color: 'text-indigo-700',
                bg: 'bg-indigo-50',
                border: 'border-indigo-100',
              },
              {
                icon: Briefcase,
                title: 'Un service de conseils financiers personnalisé',
                description: "Une vision d'ensemble qui relie fiscalité, retraite, décaissement et structure corporative.",
                color: 'text-amber-700',
                bg: 'bg-amber-50',
                border: 'border-amber-100',
              },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className={`relative rounded-2xl border ${s.border} bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 fade-in ${servicesInView ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${s.bg} rounded-xl mb-6`}>
                    <Icon className={`w-7 h-7 ${s.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </div>

          <div className={`mt-12 text-center fade-in ${servicesInView ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800 transition-colors"
            >
              En savoir plus sur nos services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyRef} className="py-24 bg-white" aria-labelledby="why-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 fade-in ${whyInView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
              Pourquoi BBFAP
            </span>
            <h2 id="why-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Ce qui nous distingue
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: ClipboardList,
                title: 'Une approche structurée et rigoureuse',
                description: "Chaque recommandation repose sur une analyse complète et réfléchie.",
              },
              {
                icon: Eye,
                title: 'Une vision globale',
                description: "Nous considérons l'ensemble de votre situation, pas seulement un produit ou une décision isolée.",
              },
              {
                icon: MessageCircle,
                title: 'Une communication claire',
                description: "Des explications simples pour des décisions éclairées.",
              },
              {
                icon: Handshake,
                title: 'Une relation durable',
                description: "Un accompagnement dans le temps, adapté à l'évolution de votre situation.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex gap-5 p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors fade-in ${whyInView ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About/Trust Section */}
      <section ref={aboutRef} className="py-24 bg-gray-50" aria-labelledby="trust-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`relative fade-in ${aboutInView ? 'visible' : ''}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/original/team.webp"
                  alt="Annie Bélanger et Frédéric Babeux — BBFAP"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/60 to-transparent" />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400 rounded-2xl flex flex-col items-center justify-center shadow-xl rotate-3 hidden lg:flex">
                <span className="text-white font-bold text-2xl leading-none">30+</span>
                <span className="text-white/90 text-xs font-medium text-center leading-tight mt-1">ans d'expérience</span>
              </div>
            </div>

            <div className={`fade-in ${aboutInView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
                Notre Approche
              </span>
              <h2 id="trust-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Une approche humaine, professionnelle et disciplinée
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  BBFAP accompagne des clients qui recherchent plus qu'un simple produit financier. Nous privilégions une relation basée sur la confiance, la constance et la clarté.
                </p>
                <p>
                  Notre objectif est de vous aider à prendre des décisions financières cohérentes, alignées avec vos priorités personnelles et professionnelles, dans un cadre structuré et transparent.
                </p>
              </div>
              <Link
                to="/a-propos"
                className="inline-flex items-center gap-2 mt-8 text-blue-700 font-semibold hover:text-blue-800 transition-colors"
              >
                En savoir plus sur notre histoire
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-24 relative overflow-hidden" aria-labelledby="home-contact-heading">
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
          <div className={`fade-in ${contactInView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-400 text-xl font-semibold uppercase tracking-widest mb-4">
              Prenez les devants
            </span>
            <h2 id="home-contact-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Discutons de votre situation financière
            </h2>
            <p className="text-blue-200 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
              Que vous soyez en début de parcours ou en phase d'optimisation, une discussion permet souvent de clarifier les prochaines étapes.
            </p>
            <p className="text-blue-200 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Prenez rendez-vous pour échanger sur vos objectifs et voir comment nous pouvons vous accompagner avec une approche adaptée et réfléchie.
            </p>
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
