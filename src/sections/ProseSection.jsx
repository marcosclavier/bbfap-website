import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import PortableTextBody from '../components/PortableTextBody';

/* Centered prose block (optional eyebrow + heading + rich body).
   Covers the "intro" and "repreneuriat" style sections on the About page. */
export default function ProseSection({ eyebrow, heading, body, background = 'white', anchorId }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });
  const bg = background === 'gray' ? 'bg-gray-50' : 'bg-white';

  return (
    <section id={anchorId || undefined} className={`py-20 ${bg}`} aria-label={heading || undefined}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center fade-in ${inView ? 'visible' : ''}`}>
          {eyebrow && (
            <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">{heading}</h2>
          )}
          <div className="[&_p]:text-gray-600 [&_p]:text-lg [&_p]:leading-relaxed">
            <PortableTextBody value={body} />
          </div>
        </div>
      </div>
    </section>
  );
}
