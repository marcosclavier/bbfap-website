import { useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/* "Secteurs desservis" — a centered intro and a wrap of map-pin location pills.
   Covers the areas-served section on the local-SEO landing pages. */
export default function AreasSection({ eyebrow, heading, intro, areas = [], background = 'white' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });
  const bg = background === 'gray' ? 'bg-gray-50' : 'bg-white';

  return (
    <section ref={ref} className={`py-20 ${bg}`} aria-label={heading || undefined}>
      <div className={`fade-in ${inView ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {eyebrow && <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">{eyebrow}</span>}
          {heading && <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{heading}</h2>}
          {intro && <p className="text-gray-600 text-lg leading-relaxed mb-8">{intro}</p>}
          <ul className="flex flex-wrap justify-center gap-3">
            {areas.map((area) => (
              <li key={area} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-full border border-blue-100">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
