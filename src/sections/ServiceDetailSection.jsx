import { useRef } from 'react';
import { Calculator, Shield, TrendingUp } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import PortableTextBody from '../components/PortableTextBody';

/* Two-column service detail: image with a coloured overlay + icon badge, and prose with bullets.
   Covers the Fiscalité / Assurances / Placements blocks on the Services page.
   Image is a default in v1 (text-first). */
const ACCENTS = {
  blue: { overlay: 'bg-blue-600/20', badge: 'bg-blue-600', Icon: Calculator },
  indigo: { overlay: 'bg-indigo-600/20', badge: 'bg-indigo-600', Icon: Shield },
  amber: { overlay: 'bg-amber-600/20', badge: 'bg-amber-600', Icon: TrendingUp },
};

export default function ServiceDetailSection({
  heading,
  body,
  image = '/images/generated/service-fiscalite.webp',
  imageAlt = '',
  imageSide = 'left',
  accent = 'blue',
  background = 'white',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });
  const bg = background === 'gray' ? 'bg-gray-50' : 'bg-white';
  const a = ACCENTS[accent] || ACCENTS.blue;
  const Icon = a.Icon;
  const imageLeft = imageSide !== 'right';
  const badgePos = imageLeft ? 'top-6 left-6' : 'top-6 right-6';

  const imageBlock = (
    <div className={`fade-in ${inView ? 'visible' : ''} ${imageLeft ? '' : 'order-1 lg:order-2'}`}>
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img src={image} alt={imageAlt} className="w-full h-[400px] object-cover" loading="lazy" />
        <div className={`absolute inset-0 ${a.overlay}`} />
        <div className={`absolute ${badgePos} p-4 ${a.badge} rounded-2xl shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );

  const textBlock = (
    <div className={`fade-in ${inView ? 'visible' : ''} ${imageLeft ? '' : 'order-2 lg:order-1'}`} style={{ transitionDelay: '150ms' }}>
      {heading && <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{heading}</h2>}
      <div className="[&_p]:text-base [&_p]:text-gray-600 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-1 [&_ul]:text-gray-600 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:text-gray-600">
        <PortableTextBody value={body} />
      </div>
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
