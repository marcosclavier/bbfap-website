import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = setTimeout(() => el.classList.add('hero-visible'), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Bélanger Brosseau — Gestion de patrimoine"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/original/hero.webp"
          alt="Conseiller financier indépendant"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Deep gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2448]/90 via-[#1B3A6B]/80 to-[#0f2448]/85" />
      </div>

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Content */}
      <div ref={ref} className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-white/90 text-sm font-medium tracking-wide uppercase">
            Conseiller Financier Indépendant
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight mb-6 max-w-5xl mx-auto">
          Gestion de Patrimoine Complète pour{' '}
          <span className="text-amber-400">Professionnels</span>{' '}
          et{' '}
          <span className="text-amber-400">Entrepreneurs</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Notre service assure un lien direct avec votre conseiller financier, renforcé par une fiscaliste attitrée. Notre équipe est prête à répondre à vos besoins spécifiques à tout moment.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://www.bbfap.com/prendre-rendez-vous"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
          >
            Prendre Rendez-Vous
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg rounded-xl transition-all duration-200"
          >
            Découvrir nos services
          </a>
        </div>

        {/* Trust badges */}
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

      {/* Scroll indicator */}
      <a
        href="#impact"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors animate-bounce"
        aria-label="Faire défiler vers le bas"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
