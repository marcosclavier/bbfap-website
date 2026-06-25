import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Briefcase, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/* Three service cards (icon + title + description) with an optional "learn more" link.
   Covers the Home-page services preview. Icons/accents cycle by index. */
const ICONS = [TrendingUp, Shield, Briefcase];
const ACCENTS = [
  { color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100' },
  { color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100' },
];

export default function ServicesCardsSection({ eyebrow, heading, items = [], ctaLabel, ctaUrl = '/services', background = 'white' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1 });
  const bg = background === 'gray' ? 'bg-gray-50' : 'bg-white';

  return (
    <section className={`py-24 ${bg}`} aria-label={heading || undefined}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 fade-in ${inView ? 'visible' : ''}`}>
          {eyebrow && <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">{eyebrow}</span>}
          {heading && <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{heading}</h2>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((s, i) => {
            const a = ACCENTS[i % ACCENTS.length];
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={s._key || i}
                className={`relative rounded-2xl border ${a.border} bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 fade-in ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 ${a.bg} rounded-xl mb-6`}>
                  <Icon className={`w-7 h-7 ${a.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>

        {ctaLabel && (
          <div className={`mt-12 text-center fade-in ${inView ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            <Link to={ctaUrl} className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800 transition-colors">
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
