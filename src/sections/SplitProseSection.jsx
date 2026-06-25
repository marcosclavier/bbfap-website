import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import PortableTextBody from '../components/PortableTextBody';

/* Two-column section: image on one side, prose (with optional bullet lists) on the other.
   Covers the "origines / transition / évolution" sections on About and the "Notre Approche"
   trust section on Home (optional rotated badge + "learn more" link). Image is a default in v1. */
export default function SplitProseSection({
  eyebrow,
  heading,
  body,
  image = '/images/team/team-white.webp',
  imageAlt = '',
  imageSide = 'left',
  background = 'white',
  badgeValue,
  badgeLabel,
  linkLabel,
  linkUrl = '/a-propos',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });
  const bg = background === 'gray' ? 'bg-gray-50' : 'bg-white';
  const imageLeft = imageSide !== 'right';

  const imageBlock = (
    <div className={`relative fade-in ${inView ? 'visible' : ''} ${imageLeft ? '' : 'order-1 lg:order-2'}`}>
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img src={image} alt={imageAlt} className="w-full h-[400px] object-cover object-top" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16508C]/40 to-transparent" />
      </div>
      {badgeValue && (
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400 rounded-2xl flex-col items-center justify-center shadow-xl rotate-3 hidden lg:flex">
          <span className="text-white font-bold text-2xl leading-none">{badgeValue}</span>
          {badgeLabel && <span className="text-white/90 text-xs font-medium text-center leading-tight mt-1">{badgeLabel}</span>}
        </div>
      )}
    </div>
  );

  const textBlock = (
    <div
      className={`fade-in ${inView ? 'visible' : ''} ${imageLeft ? '' : 'order-2 lg:order-1'}`}
      style={{ transitionDelay: '150ms' }}
    >
      {eyebrow && (
        <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
          {eyebrow}
        </span>
      )}
      {heading && (
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">{heading}</h2>
      )}
      <div className="[&_p]:text-gray-600 [&_p]:text-lg [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-1 [&_ul]:text-gray-600 [&_ul]:text-lg [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:text-gray-600 [&_ol]:text-lg">
        <PortableTextBody value={body} />
      </div>
      {linkLabel && (
        <Link to={linkUrl} className="inline-flex items-center gap-2 mt-8 text-blue-700 font-semibold hover:text-blue-800 transition-colors">
          {linkLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );

  return (
    <section className={`py-20 ${bg}`} aria-label={heading || undefined}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {imageLeft ? <>{imageBlock}{textBlock}</> : <>{textBlock}{imageBlock}</>}
        </div>
      </div>
    </section>
  );
}
