import LocalSeoLanding from '../../components/LocalSeoLanding';

const data = {
  seo: {
    title: 'Conseiller financier à Montréal | Bélanger Brosseau — Fiscalité, Assurances & Placements',
    description:
      "Conseiller financier pour les clients de Montréal et du Grand Montréal. Cabinet indépendant en fiscalité, assurances et placements pour entrepreneurs et professionnels. Rencontres à domicile ou par vidéoconférence.",
    canonical: 'https://belangerbrosseau.com/conseiller-financier-montreal',
  },
  eyebrow: 'Conseiller financier — Montréal & Grand Montréal',
  h1: 'Conseiller financier à Montréal',
  heroLead: 'Fiscalité, assurances et placements* pour les entrepreneurs et professionnels du Grand Montréal.',
  heroImage: '/images/team/team-dark.webp',
  heroParagraphs: [
    "Bélanger Brosseau est un cabinet financier indépendant qui accompagne les entrepreneurs, les professionnels incorporés et les familles de Montréal et du Grand Montréal.",
    "Une équipe, une vision : fiscalité, assurances et placements* réunis sous un même toit pour des décisions financières claires et cohérentes.",
  ],
  introEyebrow: 'Au service du Grand Montréal',
  introHeading: 'Un conseiller financier accessible où que vous soyez à Montréal',
  introParagraphs: [
    "Que vous soyez en début de parcours ou en phase d'optimisation, nous vous accompagnons partout dans le Grand Montréal avec une approche structurée et indépendante.",
    "Pas besoin de vous déplacer : nous vous rencontrons à domicile ou par vidéoconférence, de jour comme de soir, selon vos disponibilités. Notre bureau principal est situé à Saint-Hubert, à quelques minutes du centre-ville de Montréal.",
    "Notre objectif : vous aider à prendre des décisions financières cohérentes en tenant compte de votre réalité professionnelle, de votre structure corporative et de vos objectifs.",
  ],
  servicesHeading: 'Des services financiers intégrés pour les Montréalais',
  services: [
    {
      key: 'fiscalite',
      title: 'Fiscalité',
      desc: "La fiscalité est au cœur de chaque décision financière. Nous aidons les entrepreneurs du Grand Montréal à structurer et optimiser leur situation.",
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
  areasHeading: 'Nous accompagnons les clients de Montréal et des environs',
  areasIntro:
    "Depuis notre cabinet de la Rive-Sud, nous accompagnons une clientèle répartie dans tout le Grand Montréal, sur place ou par vidéoconférence :",
  areas: [
    'Montréal', 'Grand Montréal', 'Rive-Sud', 'Longueuil',
    'Brossard', 'Saint-Lambert', 'Boucherville',
  ],
  whyHeading: 'Pourquoi choisir Bélanger Brosseau à Montréal',
  why: [
    { title: 'Cabinet 100% indépendant', desc: "Pas de produits maison, pas de conflits d'intérêts — vos intérêts seulement." },
    { title: 'Rencontres flexibles', desc: 'À domicile ou par vidéoconférence, de jour comme de soir, partout dans le Grand Montréal.' },
    { title: 'Fiscaliste attitrée à votre dossier', desc: 'Annie Bélanger (M. Fisc.) est impliquée dans chaque dossier dès le départ.' },
    { title: 'Gestion discrétionnaire disponible', desc: 'Frédéric Babeux (CIM) offre un service normalement réservé aux grandes banques.' },
  ],
  ctaHeading: 'Discutons de votre situation financière',
  ctaParagraphs: [
    "Une bonne structure financière commence toujours par une bonne compréhension.",
    "Prenez rendez-vous avec un conseiller — où que vous soyez à Montréal — pour faire le point sur votre fiscalité, vos assurances et vos placements*.",
  ],
};

export default function LegacyConseillerFinancierMontreal() {
  return <LocalSeoLanding data={data} />;
}
