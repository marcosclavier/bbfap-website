import { useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

/* Full-viewport home hero: badge pill, highlighted heading, two CTAs, stat badges, scroll cue.
   In the heading, wrap a word in {{double braces}} to render it in amber (e.g. {{Saint-Hubert}}).
   Image is a default in v1 (text-first). */
function renderHeading(heading) {
  return String(heading || '')
    .split(/(\{\{[^}]+\}\})/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith('{{') && part.endsWith('}}')
        ? <span key={i} className="text-amber-400">{part.slice(2, -2)}</span>
        : <Fragment key={i}>{part}</Fragment>
    );
}

export default function HomeHeroSection({
  eyebrow,
  heading,
  lead,
  primaryLabel,
  primaryUrl = '/contact',
  secondaryLabel,
  secondaryUrl = '/services',
  badges = [],
  scrollTargetId = 'introduction',
  image = '/images/team/team-white.webp',
}) {
  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const t = setTimeout(() => el.classList.add('hero-visible'), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label={heading || 'Accueil'}>
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover object-top" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#16508C]/85 via-[#16508C]/75 to-[#16508C]/80" />
      </div>
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} aria-hidden="true" />

      <div ref={heroRef} className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-white/90 text-sm font-medium tracking-wide uppercase">{eyebrow}</span>
          </div>
        )}
        {heading && (
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight mb-6 max-w-5xl mx-auto">
            {renderHeading(heading)}
          </h1>
        )}
        {lead && <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">{lead}</p>}

        {(primaryLabel || secondaryLabel) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryLabel && (
              <Link to={primaryUrl} className="inline-flex items-center px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5">
                {primaryLabel}
              </Link>
            )}
            {secondaryLabel && (
              <Link to={secondaryUrl} className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg rounded-xl transition-all duration-200">
                {secondaryLabel}
              </Link>
            )}
          </div>
        )}

        {badges.length > 0 && (
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/60 text-sm">
            {badges.map((b, i) => (
              <Fragment key={b._key || i}>
                {i > 0 && <span className="w-px h-5 bg-white/20 self-center hidden sm:block" />}
                <span className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-xl">{b.value}</span>
                  {b.label}
                </span>
              </Fragment>
            ))}
          </div>
        )}
      </div>

      {scrollTargetId && (
        <a href={`#${scrollTargetId}`} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors animate-bounce" aria-label="Faire défiler vers le bas">
          <ChevronDown size={32} />
        </a>
      )}
    </section>
  );
}
