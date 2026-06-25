import { useRef } from 'react';
import { ClipboardCheck, Settings, RefreshCw } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/* Three-step "method" cards (Évaluation / Implantation / Suivi). Step number is derived from
   position; icon + accent colour cycle by index. Covers the Services-page approach section. */
const ACCENTS = [
  { color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100', Icon: ClipboardCheck },
  { color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-100', Icon: Settings },
  { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100', Icon: RefreshCw },
];

export default function ApproachSection({ eyebrow, heading, tagline, steps = [], background = 'white' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1 });
  const bg = background === 'gray' ? 'bg-gray-50' : 'bg-white';

  return (
    <section className={`py-24 ${bg}`} aria-label={heading || undefined}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 fade-in ${inView ? 'visible' : ''}`}>
          {eyebrow && (
            <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">{eyebrow}</span>
          )}
          {heading && <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{heading}</h2>}
          {tagline && <p className="text-gray-600 text-lg max-w-3xl mx-auto">{tagline}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => {
            const a = ACCENTS[i % ACCENTS.length];
            const Icon = a.Icon;
            return (
              <div
                key={s._key || i}
                className={`relative rounded-2xl border ${a.border} bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 fade-in ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <span className="absolute top-6 right-6 text-4xl font-bold text-gray-100 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className={`inline-flex items-center justify-center w-14 h-14 ${a.bg} rounded-xl mb-6`}>
                  <Icon className={`w-7 h-7 ${a.color}`} />
                </div>
                <h3 className={`text-2xl font-bold ${a.color} mb-4`}>{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
