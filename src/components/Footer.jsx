import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Youtube } from 'lucide-react';

const serviceLinks = [
  { label: 'Fiscalité', to: '/services' },
  { label: 'Assurances', to: '/services' },
  { label: 'Placements*', to: '/services' },
];

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Blogue', to: '/blogue' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0d1f3c] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/images/original/logo.png"
              alt="BBFAP — Bélanger, Brosseau Fiscalité, Assurances & Placements"
              className="h-14 w-auto mb-4"
              loading="lazy"
            />
            <p className="text-blue-200 text-sm leading-relaxed max-w-sm mb-6">
              Cabinet indépendant à Saint-Hubert spécialisé en gestion de patrimoine pour entrepreneurs, professionnels et familles sur la Rive-Sud de Montréal. Fiscalité, assurances et placements* — une équipe, une vision.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61560994705134"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/b%C3%A9langer-brosseau-fiscalit%C3%A9-assurances-placements-inc/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@BelangerBrosseau"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Nos Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-blue-200 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Legal disclosure */}
          <p className="text-blue-300/60 text-xs leading-relaxed mb-4 max-w-4xl">
            *Frédéric Babeux est rattaché auprès de Valeurs Mobilières PEAK Inc. à titre de Gestionnaire de Portefeuille.  Valeurs Mobilières PEAK Inc. est un courtier en placement membre de l'Organisme canadien de réglementation du commerce des investissements (OCRI), limitant ses responsabilités aux produits de placement tel que les actions, obligations, FNB et fonds mutuels.  Valeurs Mobilières PEAK Inc. est un membre du Fonds canadien de protection des investisseurs (FCPI). Veuillez consulter le <a href="https://www.fcpi.ca" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200 transition-colors">https://www.fcpi.ca</a> pour plus de détails.  Les placements offerts par Valeurs mobilières PEAK sont dissociés de l'offre de service de Bélanger, Brosseau Fiscalité, Assurance & Placements Inc.  Bélanger, Brosseau Fiscalité, Assurance & Placements Inc. est un cabinet indépendant inscrit auprès de l'Autorité des marchés financiers (AMF) dans la discipline d'Assurance de personnes.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-blue-300/50 text-xs">
              © {new Date().getFullYear()} Bélanger, Brosseau Fiscalité, Assurances & Placements Inc. Tous droits réservés.
            </p>
            <p className="text-blue-300/30 text-xs">
              5215 Chemin Chambly, Saint-Hubert, QC J3Y 3N5 | Rive-Sud de Montréal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
