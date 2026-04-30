import { useRef } from 'react';
import { Play, Youtube } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import allVideos from '../data/videos.generated.json';
import { youtubeThumbnail } from '../lib/youtube';

const CHANNEL_URL = 'https://www.youtube.com/@BelangerBrosseau?sub_confirmation=1';

const videos = allVideos
  .filter((v) => v.featuredOnHome !== false)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

function thumbFor(video) {
  if (video.thumbnailUrl) return video.thumbnailUrl;
  return youtubeThumbnail(video.youtubeUrl, { quality: 'maxres' }) || null;
}

export default function Videos() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.1 });

  return (
    <section
      id="ressources"
      ref={ref}
      className="py-24 bg-gray-50"
      aria-labelledby="ressources-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 fade-in ${inView ? 'visible' : ''}`}>
          <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Ressources
          </span>
          <h2 id="ressources-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Apprenez à nous connaître sur YouTube
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Pas encore prêt à faire le saut? Découvrez nos capsules éducatives sur la fiscalité, les assurances et les placements*.
          </p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((v, i) => {
            const href = v.youtubeUrl || CHANNEL_URL;
            const thumb = thumbFor(v);
            return (
              <a
                key={v.id || v.title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 fade-in ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${Math.min(i * 60, 480)}ms` }}
                aria-label={`Visionner : ${v.title}`}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden aspect-video bg-gray-200">
                  {thumb && (
                    <img
                      src={thumb}
                      alt={v.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        const fallback = youtubeThumbnail(v.youtubeUrl, { quality: 'hq' });
                        if (fallback && e.currentTarget.src !== fallback) {
                          e.currentTarget.src = fallback;
                        }
                      }}
                    />
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  {v.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-mono px-2 py-0.5 rounded">
                      {v.duration}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {v.title}
                  </h3>
                  {v.description && (
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{v.description}</p>
                  )}
                </div>
              </a>
            );
          })}
        </div>

        {/* YouTube CTA */}
        <div className={`mt-12 text-center fade-in ${inView ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-md"
          >
            <Youtube className="w-6 h-6" />
            Je m'abonne à la chaîne!
          </a>
          <p className="text-gray-500 text-sm mt-3">Nouveaux conseils chaque semaine sur la gestion de patrimoine</p>
        </div>
      </div>
    </section>
  );
}
