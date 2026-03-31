import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Accueil', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Blogue', to: '/blogue' },
  { label: 'Contact', to: '/contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Bélanger Brosseau — Accueil">
            <img
              src="/images/original/logo.png"
              alt="BBFAP — Bélanger, Brosseau Fiscalité, Assurances & Placements"
              className={`h-12 w-auto transition-all duration-300 ${scrolled ? 'brightness-0' : ''}`}
              loading="eager"
            />
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors duration-200 ${
                  scrolled ? 'text-gray-700 hover:text-blue-700' : 'text-white/90 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200 shadow-sm"
            >
              Parler à un conseiller
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 rounded-md transition-colors ${
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Menu mobile">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-gray-800 font-medium hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 bg-amber-600 text-white font-semibold text-center rounded-lg hover:bg-amber-700 transition-colors"
            >
              Parler à un conseiller
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
