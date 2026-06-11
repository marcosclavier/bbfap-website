import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator, Shield, TrendingUp, MapPin, Calendar, ArrowRight, Check,
} from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useSeo } from '../hooks/useSeo';

const SERVICE_ICONS = { fiscalite: Calculator, assurances: Shield, placements: TrendingUp };

function Section({ children, className = '', threshold = 0.2, labelledby }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold });
  return (
    <section ref={ref} className={className} aria-labelledby={labelledby}>
      <div className={`fade-in ${inView ? 'visible' : ''}`}>{children}</div>
    </section>
  );
}

/**
 * Data-driven local-SEO landing page. Both /conseiller-financier-* routes render
 * this with locale-specific copy. All facts come from the approved site content
 * (team, services, service areas, stats) — nothing is invented here.
 */
export default function LocalSeoLanding({ data }) {
  useSeo(data.seo);

  const stats = [
    { value: '30+', label: "Années d'expérience" },
    { value: '100+', label: 'Entrepreneurs accompagnés' },
    { value: '22', label: 'Assureurs partenaires' },
    { value: '33%', label: 'Familles servies sur plusieurs générations' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" aria-labelledby="lp-hero-heading">
        <div className="absolute inset-0">
          <img src={data.heroImage} alt="" className="w-full h-full object-cover object-center" loading="eager" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#16508C]/90 via-[#16508C]/80 to-[#16508C]/92" />
        </div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} aria-hidden="true" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-amber-400 text-sm sm:text-base font-semibold uppercase tracking-widest mb-4">
            {data.eyebrow}
          </span>
          <h1 id="lp-hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
            {data.h1}
          </h1>
          <p className="text-xl sm:text-2xl text-amber-400 font-semibold mb-6">{data.heroLead}</p>
          <div className="space-y-4 text-white/85 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
            {data.heroParagraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
            >
              <Calendar className="w-6 h-6" />
              Prendre rendez-vous
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-lg rounded-xl transition-colors"
            >
              Découvrir nos services
            </Link>
          </div>
        </div>
      </section>

      {/* Intro / local context */}
      <Section className="py-24 bg-white" labelledby="lp-intro-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
            {data.introEyebrow}
          </span>
          <h2 id="lp-intro-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {data.introHeading}
          </h2>
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed text-left sm:text-center">
            {data.introParagraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section className="py-20 bg-gray-50" labelledby="lp-services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Nos services financiers
            </span>
            <h2 id="lp-services-heading" className="text-3xl sm:text-4xl font-bold text-gray-900">
              {data.servicesHeading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.services.map((s, i) => {
              const Icon = SERVICE_ICONS[s.key];
              return (
                <div
                  key={s.title}
                  className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-6">
                    <Icon className="w-7 h-7 text-blue-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-gray-700">
                        <Check className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Areas served */}
      <Section className="py-20 bg-white" labelledby="lp-areas-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Secteurs desservis
          </span>
          <h2 id="lp-areas-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            {data.areasHeading}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">{data.areasIntro}</p>
          <ul className="flex flex-wrap justify-center gap-3">
            {data.areas.map((area) => (
              <li
                key={area}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-full border border-blue-100"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Stats band */}
      <section className="py-20 bg-[#16508C]" aria-labelledby="lp-stats-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="lp-stats-heading" className="sr-only">Notre impact en chiffres</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl sm:text-5xl font-bold text-amber-400 mb-2">{s.value}</div>
                <div className="text-blue-200 text-sm leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <Section className="py-20 bg-gray-50" labelledby="lp-why-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Pourquoi nous choisir
            </span>
            <h2 id="lp-why-heading" className="text-3xl sm:text-4xl font-bold text-gray-900">
              {data.whyHeading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.why.map((item) => (
              <div key={item.title} className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="w-10 h-10 bg-amber-400/15 border border-amber-400/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-amber-500" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold mb-1">{item.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" aria-labelledby="lp-cta-heading">
        <div className="absolute inset-0">
          <img src="/images/generated/section-contact.webp" alt="" className="w-full h-full object-cover" loading="lazy" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#16508C]/95 via-[#16508C]/90 to-[#16508C]/95" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="lp-cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {data.ctaHeading}
          </h2>
          <div className="space-y-4 text-blue-200 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {data.ctaParagraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
          >
            <Calendar className="w-6 h-6" />
            Prendre rendez-vous
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
