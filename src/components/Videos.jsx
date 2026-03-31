import { useRef } from 'react';
import { Play, Youtube } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const videos = [
  {
    title: 'Le CELI, le plus beau cadeau pour vos héritiers?',
    duration: '4:32',
    description: 'Pourquoi le CELI pourrait être le plus beau cadeau à laisser à vos héritiers.',
    image: '/images/original/general-1.webp',
  },
  {
    title: 'Tout investir au Canada — une bonne idée?',
    duration: '3:31',
    description: 'Devriez-vous investir 100% de vos actifs au Canada? Notre analyse.',
    image: '/images/original/general-2.webp',
  },
  {
    title: 'Attention au risque de concentration!',
    duration: '4:53',
    description: 'Le risque de concentration et pourquoi il ne faut pas le négliger.',
    image: '/images/original/general-3.webp',
  },
  {
    title: 'Investir par soi-même vs avec un conseiller',
    duration: '11:48',
    description: 'Gérer vos placements* seul ou avec un conseiller — quelle est la meilleure option?',
    image: '/images/original/general-4.webp',
  },
  {
    title: 'Votre tolérance au risque tue vos chances d\'une retraite confortable',
    duration: '6:49',
    description: 'Comment votre aversion au risque peut nuire à votre retraite.',
    image: '/images/original/general-5.webp',
  },
  {
    title: 'Assurance vie temporaire vs permanente — Laquelle choisir?',
    duration: '12:49',
    description: 'La différence entre assurance vie temporaire et permanente, et quand choisir chacune.',
    image: '/images/original/general-6.webp',
  },
  {
    title: 'Convention d\'actionnaires : essentielle pour votre entreprise',
    duration: '5:51',
    description: 'Pourquoi une convention d\'actionnaires est indispensable pour protéger votre entreprise.',
    image: '/images/original/general-7.webp',
  },
  {
    title: 'Placer de l\'argent dans une compagnie de gestion? ⚠️ Attention à cette erreur fatale',
    duration: '5:43',
    description: 'L\'erreur fatale à éviter pour ne pas perdre la déduction pour petite entreprise.',
    image: '/images/original/general-8.webp',
  },
  {
    title: 'Gel Successoral : C\'est quoi?',
    duration: '8:21',
    description: 'Le gel successoral expliqué par Annie Bélanger, M.Fisc — outil puissant de planification fiscale.',
    image: '/images/original/general-9.webp',
  },
];

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
          {videos.map((v, i) => (
            <a
              key={v.title}
              href="https://www.youtube.com/@BelangerBrosseau?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 fade-in ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${Math.min(i * 60, 480)}ms` }}
              aria-label={`Visionner : ${v.title}`}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={v.image}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                  </div>
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-mono px-2 py-0.5 rounded">
                  {v.duration}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-blue-700 transition-colors">
                  {v.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{v.description}</p>
              </div>
            </a>
          ))}
        </div>

        {/* YouTube CTA */}
        <div className={`mt-12 text-center fade-in ${inView ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
          <a
            href="https://www.youtube.com/@BelangerBrosseau?sub_confirmation=1"
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
