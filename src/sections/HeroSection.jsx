import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/* Page hero: full-width background image + navy gradient, centered eyebrow/heading/lead.
   Optional amber subheading, body paragraphs, and a primary/secondary button pair (used by the
   landing pages). Image is a default in v1 (text-first). */
export default function HeroSection({
  eyebrow,
  heading,
  subheading,
  lead,
  paragraphs = [],
  primaryLabel,
  primaryUrl = '/contact',
  secondaryLabel,
  secondaryUrl = '/services',
  image = '/images/team/team-dark.webp',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });

  return (
    <section className="relative pt-32 pb-20 overflow-hidden" aria-label={heading || 'En-tête'}>
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover object-top" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#16508C]/85 via-[#16508C]/80 to-[#16508C]/85" />
      </div>
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} aria-hidden="true" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`fade-in ${inView ? 'visible' : ''}`}>
          {eyebrow && (
            <span className="inline-block text-amber-400 text-xl font-semibold uppercase tracking-widest mb-4">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight ${subheading ? 'mb-4' : 'mb-6'}`}>
              {heading}
            </h1>
          )}
          {subheading && (
            <p className="text-xl sm:text-2xl text-amber-400 font-semibold mb-6">{subheading}</p>
          )}
          {paragraphs.length > 0 ? (
            <div className={`space-y-4 text-white/80 text-lg leading-relaxed max-w-3xl mx-auto ${primaryLabel ? 'mb-10' : ''}`}>
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          ) : (
            lead && (
              <p className={`text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed ${primaryLabel ? 'mb-10' : ''}`}>{lead}</p>
            )
          )}

          {primaryLabel && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={primaryUrl} className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5">
                <Calendar className="w-6 h-6" />
                {primaryLabel}
                <ArrowRight className="w-5 h-5" />
              </Link>
              {secondaryLabel && (
                <Link to={secondaryUrl} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-lg rounded-xl transition-colors">
                  {secondaryLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
