import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { blogPosts } from '../data/blogPosts';

const categoryColors = {
  Placements: 'bg-blue-100 text-blue-700',
  Fiscalité: 'bg-purple-100 text-purple-700',
  Impôts: 'bg-red-100 text-red-700',
  Assurances: 'bg-green-100 text-green-700',
  Conseils: 'bg-amber-100 text-amber-700',
  'Planification Successorale': 'bg-indigo-100 text-indigo-700',
};

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { threshold: 0.2 });

  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { threshold: 0.05 });

  if (!post) {
    return (
      <section className="pt-32 pb-24 bg-white min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article introuvable</h1>
          <p className="text-gray-600 text-lg mb-8">
            Désolé, cet article n'existe pas ou a été déplacé.
          </p>
          <Link
            to="/blogue"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au blogue
          </Link>
        </div>
      </section>
    );
  }

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const categoryClass = categoryColors[post.category] || 'bg-gray-100 text-gray-700';

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" aria-labelledby="post-hero-heading">
        <div className="absolute inset-0">
          <img src="/images/original/hero.webp" alt="" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2448]/92 via-[#1B3A6B]/88 to-[#0f2448]/92" />
        </div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} aria-hidden="true" />

        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`fade-in ${heroInView ? 'visible' : ''}`}>
            <Link
              to="/blogue"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blogue
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryClass}`}>
                {post.category}
              </span>
              {post.hasVideo && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                  Vidéo
                </span>
              )}
            </div>

            <h1 id="post-hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} de lecture
              </span>
              <span>Par Frédéric Babeux</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured image */}
      {post.image && (
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-video bg-gray-100">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      )}

      {/* Article body */}
      <section ref={contentRef} className={`${post.image ? 'pt-16' : 'pt-20'} pb-20 bg-white`} aria-label="Contenu de l'article">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`fade-in ${contentInView ? 'visible' : ''}`}>
            <p className="text-xl text-gray-700 leading-relaxed mb-10 font-medium border-l-4 border-amber-400 pl-6 italic">
              {post.excerpt}
            </p>

            <div className="prose-content space-y-6">
              {post.content.map((paragraph, i) => (
                <p key={i} className="text-gray-700 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 p-8 bg-gradient-to-br from-[#0f2448] to-[#1B3A6B] rounded-3xl text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Vous avez des questions sur ce sujet?
              </h2>
              <p className="text-blue-200 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
                Discutons de votre situation. Notre équipe est là pour vous accompagner avec une approche claire et personnalisée.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
              >
                Prenez rendez-vous
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prev/Next navigation */}
      {(prevPost || nextPost) && (
        <section className="py-16 bg-gray-50 border-t border-gray-100" aria-label="Navigation entre articles">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {prevPost ? (
                <Link
                  to={`/blogue/${prevPost.slug}`}
                  className="group flex flex-col p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <span className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <ArrowLeft className="w-4 h-4" />
                    Article précédent
                  </span>
                  <span className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  to={`/blogue/${nextPost.slug}`}
                  className="group flex flex-col p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all md:text-right md:items-end"
                >
                  <span className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    Article suivant
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  <span className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
