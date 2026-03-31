import { useRef } from 'react';
import { Calendar, Facebook, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.2 });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/generated/section-contact.webp"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2448]/95 via-[#1B3A6B]/90 to-[#0d1f3c]/95" />
      </div>

      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: CTA */}
          <div className={`fade-in ${inView ? 'visible' : ''}`}>
            <span className="inline-block text-amber-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Prêt à optimiser votre patrimoine?
            </span>
            <h2 id="contact-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Prenez rendez-vous avec notre équipe aujourd'hui
            </h2>
            <p className="text-blue-200 text-lg leading-relaxed mb-8">
              Rencontrez-nous à domicile, à nos bureaux, ou par vidéoconférence. Disponibles de jour et de soir, nous sommes prêts à répondre à vos besoins spécifiques.
            </p>

            <a
              href="https://www.bbfap.com/prendre-rendez-vous"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 mb-8"
            >
              <Calendar className="w-6 h-6" />
              Prendre Rendez-Vous
              <ArrowRight className="w-5 h-5" />
            </a>

            {/* Social */}
            <div>
              <p className="text-blue-300 text-sm mb-4 font-medium">Suivez-nous sur les réseaux sociaux</p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61560994705134"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
                  aria-label="Facebook Bélanger Brosseau"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/b%C3%A9langer-brosseau-fiscalit%C3%A9-assurances-placements-inc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
                  aria-label="LinkedIn Bélanger Brosseau"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@BelangerBrosseau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center text-white transition-colors"
                  aria-label="YouTube Bélanger Brosseau"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Trust signals */}
          <div className={`fade-in ${inView ? 'visible' : ''}`} style={{ transitionDelay: '150ms' }}>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 space-y-6">
              <h3 className="text-white font-bold text-xl mb-6">Pourquoi choisir Bélanger Brosseau?</h3>

              {[
                {
                  title: 'Retours garantis en moins de 24h',
                  desc: 'Appelez ou écrivez — nous vous répondons rapidement.',
                },
                {
                  title: 'Cabinet 100% indépendant',
                  desc: 'Pas de produits maison, pas de conflits d\'intérêts — vos intérêts seulement.',
                },
                {
                  title: 'Fiscaliste attitrée à votre dossier',
                  desc: 'Annie Bélanger (M. Fisc.) impliquée dans chaque dossier dès le départ.',
                },
                {
                  title: 'Approche multi-générationnelle',
                  desc: '33% de nos familles sont servies sur plus d\'une génération.',
                },
                {
                  title: 'Gestion discrétionnaire disponible',
                  desc: 'Frédéric Babeux (CIM) offre ce service à valeur ajoutée normalement réservé aux grandes banques.',
                },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-4" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="w-8 h-8 bg-amber-400/20 border border-amber-400/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                    <p className="text-blue-200 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
