import { useRef } from 'react';
import { ClipboardList, Eye, MessageCircle, Handshake, Check } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/* Two-column "why choose us" feature grid (icon/check + title + description per item).
   variant 'icons' (default) = blue lucide icons (Home page);
   variant 'check'           = amber checkmarks on white cards (landing pages). */
const ICONS = [ClipboardList, Eye, MessageCircle, Handshake];

export default function FeatureGridSection({ eyebrow, heading, items = [], background = 'gray', variant = 'icons' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1 });
  const bg = background === 'white' ? 'bg-white' : 'bg-gray-50';
  const isCheck = variant === 'check';

  return (
    <section className={`${isCheck ? 'py-20' : 'py-24'} ${bg}`} aria-label={heading || undefined}>
      <div className={`${isCheck ? 'max-w-5xl' : 'max-w-7xl'} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div ref={ref} className={`text-center ${isCheck ? 'mb-14' : 'mb-16'} fade-in ${inView ? 'visible' : ''}`}>
          {eyebrow && <span className={`inline-block text-amber-600 ${isCheck ? 'text-sm' : 'text-xl'} font-semibold uppercase tracking-widest mb-3`}>{eyebrow}</span>}
          {heading && <h2 className={`${isCheck ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'} font-bold text-gray-900 mb-4`}>{heading}</h2>}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${isCheck ? 'gap-6' : 'gap-8'}`}>
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={item._key || i}
                className={
                  isCheck
                    ? 'flex gap-4 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm'
                    : `flex gap-5 p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors fade-in ${inView ? 'visible' : ''}`
                }
                style={isCheck ? undefined : { transitionDelay: `${i * 100}ms` }}
              >
                {isCheck ? (
                  <div className="w-10 h-10 bg-amber-400/15 border border-amber-400/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-amber-500" aria-hidden="true" />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-700" />
                  </div>
                )}
                <div>
                  <p className={isCheck ? 'text-gray-900 font-semibold mb-1' : 'font-bold text-gray-900 text-lg mb-1'}>{item.title}</p>
                  <p className={`text-gray-600 ${isCheck ? 'text-sm' : ''} leading-relaxed`}>{item.desc ?? item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
