import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Youtube, Clock, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { blogPosts, blogCategories } from '../data/blogPosts';

const videos = [
  {
    title: 'Le CELI, le plus beau cadeau pour vos héritiers?',
    duration: '4:32',
    description: 'Pourquoi le CELI pourrait être le plus beau cadeau à laisser à vos héritiers.',
    image: '/images/generated/thumb-1.png',
  },
  {
    title: 'Tout investir au Canada — une bonne idée?',
    duration: '3:31',
    description: 'Devriez-vous investir 100% de vos actifs au Canada? Notre analyse.',
    image: '/images/generated/thumb-2.png',
  },
  {
    title: 'Attention au risque de concentration!',
    duration: '4:53',
    description: 'Le risque de concentration et pourquoi il ne faut pas le négliger.',
    image: '/images/generated/thumb-3.png',
  },
  {
    title: 'Investir par soi-même vs avec un conseiller',
    duration: '11:48',
    description: 'Gérer vos placements* seul ou avec un conseiller — quelle est la meilleure option?',
    image: '/images/generated/thumb-4.png',
  },
  {
    title: 'Votre tolérance au risque tue vos chances d\'une retraite confortable',
    duration: '6:49',
    description: 'Comment votre aversion au risque peut nuire à votre retraite.',
    image: '/images/generated/thumb-5.png',
  },
  {
    title: 'Assurance vie temporaire vs permanente — Laquelle choisir?',
    duration: '12:49',
    description: 'La différence entre assurance vie temporaire et permanente, et quand choisir chacune.',
    image: '/images/generated/thumb-6.png',
  },
  {
    title: 'Convention d\'actionnaires : essentielle pour votre entreprise',
    duration: '5:51',
    description: 'Pourquoi une convention d\'actionnaires est indispensable pour protéger votre entreprise.',
    image: '/images/generated/thumb-7.png',
  },
  {
    title: 'Placer de l\'argent dans une compagnie de gestion? Attention à cette erreur fatale',
    duration: '5:43',
    description: 'L\'erreur fatale à éviter pour ne pas perdre la déduction pour petite entreprise.',
    image: '/images/original/general-8.webp',
  },
  {
    title: 'Gel Successoral : C\'est quoi?',
    duration: '8:21',
    description: 'Le gel successoral expliqué par Annie Bélanger, M.Fisc — outil puissant de planification fiscale.',
    image: '/images/generated/thumb-9.png',
  },
];

const categoryColors = {
  Placements: 'bg-blue-100 text-blue-700',
  Fiscalité: 'bg-purple-100 text-purple-700',
  Impôts: 'bg-red-100 text-red-700',
  Assurances: 'bg-green-100 text-green-700',
  Conseils: 'bg-amber-100 text-amber-700',
};

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('fr-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { threshold: 0.2 });

  const articlesRef = useRef(null);
  const articlesInView = useInView(articlesRef, { threshold: 0.1 });

  const videosRef = useRef(null);
  const videosInView = useInView(videosRef, { threshold: 0.1 });

  const filteredPosts =
    activeCategory === 'Tous'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" aria-labelledby="blog-hero-heading">
        <div className="absolute inset-0">
          <img src="/images/team/frederic-window.webp" alt="" className="w-full h-full object-cover object-center" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2448]/90 via-[#1B3A6B]/85 to-[#0f2448]/90" />
        </div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />

        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`fade-in ${heroInView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-400 text-xl font-semibold uppercase tracking-widest mb-4">
              Ressources
            </span>
            <h1 id="blog-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Blogue
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Nos articles et capsules vidéo sur la finance, la fiscalité et les placements.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Articles */}
      <section ref={articlesRef} className="py-24 bg-white" aria-labelledby="articles-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 fade-in ${articlesInView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
              Articles
            </span>
            <h2 id="articles-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Nos dernières publications
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Conseils pratiques et analyses approfondies pour optimiser vos finances personnelles et corporatives.
            </p>
          </div>

          {/* Category filter */}
          <div className={`flex flex-wrap justify-center gap-2 mb-12 fade-in ${articlesInView ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blogue/${post.slug}`}
                className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col fade-in ${articlesInView ? 'visible' : ''}`}
                style={{ transitionDelay: `${Math.min(i * 60, 480)}ms` }}
              >
                {post.image && (
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                      {post.category}
                    </span>
                    {post.hasVideo && (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        Vidéo
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-amber-600 font-semibold text-sm mt-4 group-hover:gap-2 transition-all">
                    Lire l'article
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-center text-gray-400 py-12 text-lg">
              Aucun article dans cette catégorie pour le moment.
            </p>
          )}
        </div>
      </section>

      {/* Videos */}
      <section ref={videosRef} className="py-24 bg-gray-50" aria-labelledby="videos-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 fade-in ${videosInView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-600 text-xl font-semibold uppercase tracking-widest mb-3">
              Capsules Vidéo
            </span>
            <h2 id="videos-heading" className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Apprenez à nous connaître sur YouTube
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Pas encore prêt à faire le saut? Découvrez nos capsules éducatives sur la fiscalité, les assurances et les placements*.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v, i) => (
              <a
                key={v.title}
                href="https://www.youtube.com/@BelangerBrosseau?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 fade-in ${videosInView ? 'visible' : ''}`}
                style={{ transitionDelay: `${Math.min(i * 60, 480)}ms` }}
                aria-label={`Visionner : ${v.title}`}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={v.image}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-mono px-2 py-0.5 rounded">
                    {v.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{v.description}</p>
                </div>
              </a>
            ))}
          </div>

          <div className={`mt-12 text-center fade-in ${videosInView ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
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
    </>
  );
}
