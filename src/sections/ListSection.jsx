import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/* Centered intro + a grid of checkmarked items + optional closing line and CTA link.
   layout 'grid3' (default) = compact centered cards (About clientèle);
   layout 'grid2'           = two-column left-aligned items (Services clientèle). */
const CheckIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
  </svg>
);

export default function ListSection({
  eyebrow,
  heading,
  intro,
  items = [],
  outro,
  background = 'gray',
  layout = 'grid3',
  ctaLabel,
  ctaUrl = '/contact',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });
  const bg = background === 'white' ? 'bg-white' : 'bg-gray-50';
  const grid2 = layout === 'grid2';

  return (
    <section className={`py-20 ${bg}`} aria-label={heading || undefined}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center ${grid2 ? '' : 'mb-12'} fade-in ${inView ? 'visible' : ''}`}>
          {eyebrow && (
            <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">{eyebrow}</span>
          )}
          {heading && <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">{heading}</h2>}
          {intro && <p className="text-gray-600 text-lg leading-relaxed mb-6">{intro}</p>}
        </div>

        {grid2 ? (
          <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto mb-6 fade-in ${inView ? 'visible' : ''}`}>
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100">
                <CheckIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">{item}</span>
              </li>
            ))}
            {ctaLabel && (
              <li className="sm:col-span-2">
                <Link to={ctaUrl} className="group flex items-center justify-between gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200 hover:bg-amber-100 hover:border-amber-300 transition-colors">
                  <span className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    <span className="text-gray-800 font-medium">{ctaLabel}</span>
                  </span>
                </Link>
              </li>
            )}
          </ul>
        ) : (
          items.length > 0 && (
            <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 fade-in ${inView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              {items.map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                  <CheckIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          )
        )}

        {outro && (
          <p className={`text-gray-600 text-lg leading-relaxed text-center fade-in ${inView ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
            {outro}
          </p>
        )}
      </div>
    </section>
  );
}
