import LocalSeoLanding from '../../components/LocalSeoLanding';

const data = {
  seo: {
    title: 'Conseiller financier Rive-Sud de Montréal | Bélanger Brosseau — Fiscalité, Assurances & Placements',
    description:
      "Conseiller financier sur la Rive-Sud de Montréal. Cabinet indépendant à Saint-Hubert en fiscalité, assurances et placements pour entrepreneurs, professionnels et familles de Brossard, Longueuil, Boucherville et environs.",
    canonical: 'https://belangerbrosseau.com/conseiller-financier-rive-sud',
  },
  eyebrow: 'Conseiller financier — Rive-Sud de Montréal',
  h1: 'Conseiller financier sur la Rive-Sud de Montréal',
  heroLead: 'Fiscalité, assurances et placements* pour les entrepreneurs et professionnels de la Rive-Sud.',
  heroImage: '/images/original/hero.webp',
  heroParagraphs: [
    "Établi à Saint-Hubert, Bélanger Brosseau est un cabinet financier indépendant qui accompagne les entrepreneurs, les professionnels incorporés et les familles de toute la Rive-Sud de Montréal.",
    "Une équipe, une vision : nous réunissons la fiscalité, les assurances et les placements* sous un même toit pour des décisions financières claires et cohérentes.",
  ],
  introEyebrow: 'Votre cabinet de proximité',
  introHeading: 'Un conseiller financier ancré sur la Rive-Sud',
  introParagraphs: [
    "Depuis nos bureaux du 5215, chemin Chambly à Saint-Hubert, nous servons une clientèle locale qui cherche bien plus qu'un produit financier : une stratégie intégrée et un accompagnement durable.",
    "Notre proximité avec les entrepreneurs et professionnels de la Rive-Sud nous permet de comprendre votre réalité corporative et de bâtir des solutions adaptées à votre situation.",
    "Rencontrez-nous à nos bureaux, à domicile ou par vidéoconférence — de jour comme de soir, selon vos disponibilités.",
  ],
  servicesHeading: 'Des services intégrés pour les clients de la Rive-Sud',
  services: [
    {
      key: 'fiscalite',
      title: 'Fiscalité',
      desc: "La fiscalité est au cœur de chaque décision financière. Nous aidons les entrepreneurs de la Rive-Sud à structurer et optimiser leur situation.",
      bullets: ['Optimisation de la structure corporative', 'Gestion des revenus', 'Réduction des impacts fiscaux'],
    },
    {
      key: 'assurances',
      title: 'Assurances',
      desc: "Protéger votre revenu, votre famille et votre entreprise avec des couvertures adaptées à vos besoins réels.",
      bullets: ['Assurance vie', 'Assurance invalidité', 'Assurance maladies graves'],
    },
    {
      key: 'placements',
      title: 'Placements*',
      desc: "Des portefeuilles structurés avec discipline, en cohérence avec votre réalité fiscale et corporative.",
      bullets: ['Actions et obligations', 'Fonds négociés en bourse (FNB)', 'Gestion discrétionnaire disponible'],
    },
  ],
  areasHeading: 'Nous accompagnons les clients de toute la Rive-Sud',
  areasIntro:
    "Notre cabinet de Saint-Hubert dessert l'ensemble de la Rive-Sud de Montréal. Voici quelques-uns des secteurs où nous accompagnons nos clients :",
  areas: [
    'Saint-Hubert', 'Brossard', 'Longueuil', 'Boucherville',
    'Saint-Bruno-de-Montarville', 'Saint-Lambert', 'Saint-Constant',
  ],
  whyHeading: 'Pourquoi choisir Bélanger Brosseau sur la Rive-Sud',
  why: [
    { title: 'Cabinet 100% indépendant', desc: "Pas de produits maison, pas de conflits d'intérêts — vos intérêts seulement." },
    { title: 'Fiscaliste attitrée à votre dossier', desc: 'Annie Bélanger (M. Fisc.) est impliquée dans chaque dossier dès le départ.' },
    { title: 'Retours garantis en moins de 24h', desc: 'Appelez ou écrivez — nous vous répondons rapidement.' },
    { title: 'Approche multi-générationnelle', desc: "33% de nos familles sont servies sur plus d'une génération." },
  ],
  ctaHeading: 'Discutons de votre situation financière',
  ctaParagraphs: [
    "Une bonne structure financière commence toujours par une bonne compréhension.",
    "Prenez rendez-vous avec un conseiller de la Rive-Sud pour faire le point sur votre fiscalité, vos assurances et vos placements*.",
  ],
};

export default function LegacyConseillerFinancierRiveSud() {
  return <LocalSeoLanding data={data} />;
}
