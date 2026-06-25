import { useRef } from 'react';
import { Calculator, Shield, TrendingUp, Check } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/* Three service cards, each with a bullet list (Fiscalité / Assurances / Placements).
   Covers the services section on the local-SEO landing pages. Icons cycle by index. */
const ICONS = [Calculator, Shield, TrendingUp];

export default function ServicesGridSection({ eyebrow, heading, items = [], background = 'gray' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });
  const bg = background === 'white' ? 'bg-white' : 'bg-gray-50';

  return (
    <section ref={ref} className={`py-20 ${bg}`} aria-label={heading || undefined}>
      <div className={`fade-in ${inView ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            {eyebrow && <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">{eyebrow}</span>}
            {heading && <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{heading}</h2>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {items.map((s, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div
                  key={s._key || i}
                  className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-6">
                    <Icon className="w-7 h-7 text-blue-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-2">
                    {(s.bullets || []).map((b) => (
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
      </div>
    </section>
  );
}
