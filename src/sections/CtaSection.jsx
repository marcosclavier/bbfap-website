import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/* Navy call-to-action band: background image + gradient, eyebrow/heading/paragraphs + button.
   Covers the closing "Continuité / Engagement" section on the About page. */
export default function CtaSection({
  eyebrow,
  heading,
  paragraphs = [],
  buttonLabel,
  buttonUrl = '/contact',
  image = '/images/generated/section-contact.webp',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });
  const isExternal = /^https?:\/\//.test(buttonUrl);

  const buttonClasses =
    'inline-flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5';

  const buttonInner = (
    <>
      <Calendar className="w-6 h-6" />
      {buttonLabel}
      <ArrowRight className="w-5 h-5" />
    </>
  );

  return (
    <section className="py-24 relative overflow-hidden" aria-label={heading || undefined}>
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover" loading="lazy" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#16508C]/95 via-[#16508C]/90 to-[#16508C]/95" />
      </div>
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={ref} className={`fade-in ${inView ? 'visible' : ''}`}>
          {eyebrow && (
            <span className="inline-block text-amber-400 text-xl font-semibold uppercase tracking-widest mb-4">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">{heading}</h2>
          )}
          {paragraphs.length > 0 && (
            <div className="space-y-4 text-blue-200 text-lg leading-relaxed mb-10">
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}
          {buttonLabel && (
            isExternal
              ? <a href={buttonUrl} className={buttonClasses} target="_blank" rel="noopener noreferrer">{buttonInner}</a>
              : <Link to={buttonUrl} className={buttonClasses}>{buttonInner}</Link>
          )}
        </div>
      </div>
    </section>
  );
}
