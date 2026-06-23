import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';

/*
 * 404 page rendered by the catch-all route in App.jsx for any unmatched path.
 *
 * Note: because the site is a Vercel SPA (every path is rewritten to index.html),
 * the HTTP status is still 200 — this is a "soft 404". The robots noindex meta
 * below keeps these pages out of search results, which is the practical
 * equivalent for crawlers on a static SPA.
 */

const LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: 'Nos services' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/blogue', label: 'Blogue' },
  { to: '/contact', label: 'Contact' },
];

export default function NotFoundPage() {
  useSeo({
    title: 'Page introuvable (404) — BBFAP',
    description: "La page demandée n'existe pas ou a été déplacée.",
  });

  // Keep soft-404 pages out of search results.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, follow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <section className="pt-32 pb-24 bg-white min-h-[70vh] flex items-center" aria-labelledby="notfound-heading">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-6xl sm:text-7xl font-bold tracking-tight mb-4" style={{ color: '#16508C' }}>
          404
        </p>
        <h1 id="notfound-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Page introuvable
        </h1>
        <p className="text-gray-600 text-lg mb-10">
          Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-colors"
        >
          <Home className="w-5 h-5" />
          Retour à l'accueil
        </Link>

        <div className="mt-12">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Pages populaires
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="inline-flex items-center gap-1.5 text-[#16508C] font-medium hover:underline"
                >
                  {link.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
