import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const testimonials = [
  {
    text: "Depuis que je travaille avec l'équipe de Bélanger Brosseau, j'ai enfin l'impression que mon patrimoine est géré de façon cohérente — placements, fiscalité et assurances, tout est intégré. Une équipe exceptionnelle.",
    author: 'Dentiste incorporé',
    location: 'Rive-Sud de Montréal',
    rating: 5,
  },
  {
    text: "L'accès direct à Annie, notre fiscaliste attitrée, est inestimable. Elle a trouvé des stratégies pour ma société de gestion que je n'aurais jamais découvertes seul. Frédéric est toujours disponible et ses conseils en placements sont avisés.",
    author: 'Médecin incorporé',
    location: 'Montréal',
    rating: 5,
  },
  {
    text: "Contrairement à ma grande banque, ici on me rappelle le jour même. Mes portefeuilles performent bien et je sais exactement ce que je paie. La transparence est totale — c'est ce que je cherchais.",
    author: 'Entrepreneur en construction',
    location: 'Laval',
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.15 });

  return (
    <section
      id="temoignages"
      ref={ref}
      className="py-24 bg-white"
      aria-labelledby="temoignages-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 fade-in ${inView ? 'visible' : ''}`}>
          <span className="inline-block text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Témoignages
          </span>
          <h2 id="temoignages-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Plus de 100 entrepreneurs et professionnels incorporés nous font confiance pour la gestion de leur patrimoine.
          </p>
        </div>

        {/* Review image + testimonials grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left: original review screenshot */}
          <div className={`lg:col-span-2 fade-in ${inView ? 'visible' : ''}`}>
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm font-medium">Avis clients Google</span>
              </div>
              <img
                src="/images/original/general.webp"
                alt="Avis client Bélanger Brosseau Fiscalité Assurances & Placements"
                className="w-full rounded-xl mb-4"
                loading="lazy"
              />
              <div className="mt-4 p-4 bg-[#1B3A6B] rounded-xl">
                <p className="text-white/80 text-sm text-center">
                  Des clients satisfaits depuis plus de 30 ans dans la grande région de Montréal
                </p>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
                  <div className="text-2xl font-bold text-[#1B3A6B]">130+</div>
                  <div className="text-xs text-gray-500 mt-0.5">Entrepreneurs assurés</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
                  <div className="text-2xl font-bold text-[#1B3A6B]">22</div>
                  <div className="text-xs text-gray-500 mt-0.5">Assureurs partenaires</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: testimonial cards */}
          <div className="lg:col-span-3 space-y-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 fade-in ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <Quote className="w-8 h-8 text-amber-400 flex-shrink-0 -mt-1" />
                  <p className="text-gray-700 leading-relaxed italic">{t.text}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">{t.author}</p>
                    <p className="text-gray-500 text-xs">{t.location}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
