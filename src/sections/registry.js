import HeroSection from './HeroSection';
import ProseSection from './ProseSection';
import SplitProseSection from './SplitProseSection';
import ListSection from './ListSection';
import CtaSection from './CtaSection';
import ApproachSection from './ApproachSection';
import ServiceDetailSection from './ServiceDetailSection';
import HomeHeroSection from './HomeHeroSection';
import ServicesCardsSection from './ServicesCardsSection';
import FeatureGridSection from './FeatureGridSection';
import ContactFormSection from './ContactFormSection';
import MapSection from './MapSection';
import ServicesGridSection from './ServicesGridSection';
import AreasSection from './AreasSection';
import StatsBandSection from './StatsBandSection';

/*
 * Single source of truth for the page-builder section types.
 *
 * - SECTION_RENDERERS: _type -> React renderer (used by PageRenderer on the public site).
 * - SECTION_DEFS:      _type -> { label, fields, blank() } describing how the /admin builder
 *   labels the type, which fields it edits, and what a fresh section looks like.
 *
 * Field `type`s the admin PageBuilder understands:
 *   text | textarea | select | richtext | stringList | textList
 *
 * Keep _type values in sync with studio/schemas/page.ts and scripts/lib/adminApi.mjs SECTION_TYPES.
 * NOTE: image fields are intentionally absent from the admin `fields` in v1 (text-first) — the
 * underlying data still carries the image path, it just isn't editable in the UI yet.
 */

export const SECTION_RENDERERS = {
  heroSection: HeroSection,
  proseSection: ProseSection,
  splitProseSection: SplitProseSection,
  listSection: ListSection,
  ctaSection: CtaSection,
  approachSection: ApproachSection,
  serviceDetailSection: ServiceDetailSection,
  homeHeroSection: HomeHeroSection,
  servicesSection: ServicesCardsSection,
  featureGridSection: FeatureGridSection,
  contactFormSection: ContactFormSection,
  mapSection: MapSection,
  servicesGridSection: ServicesGridSection,
  areasSection: AreasSection,
  statsBandSection: StatsBandSection,
};

function newKey() {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID().replace(/-/g, '').slice(0, 12);
    }
  } catch {
    /* fall through */
  }
  return 'k' + Math.random().toString(36).slice(2, 12);
}

const BG_OPTIONS = [
  { value: 'white', label: 'Blanc' },
  { value: 'gray', label: 'Gris' },
];

export const SECTION_DEFS = {
  heroSection: {
    label: 'En-tête (hero)',
    fields: [
      { name: 'eyebrow', label: 'Surtitre', type: 'text' },
      { name: 'heading', label: 'Titre (H1)', type: 'text' },
      { name: 'subheading', label: 'Sous-titre (ambre)', type: 'text' },
      { name: 'lead', label: 'Texte d’introduction (court)', type: 'textarea' },
      { name: 'paragraphs', label: 'Paragraphes (au lieu du texte court)', type: 'textList' },
      { name: 'primaryLabel', label: 'Bouton principal — texte (optionnel)', type: 'text' },
      { name: 'primaryUrl', label: 'Bouton principal — URL', type: 'text' },
      { name: 'secondaryLabel', label: 'Bouton secondaire — texte', type: 'text' },
      { name: 'secondaryUrl', label: 'Bouton secondaire — URL', type: 'text' },
      { name: 'image', label: 'Image de fond', type: 'image' },
    ],
    blank: () => ({ _type: 'heroSection', _key: newKey(), eyebrow: '', heading: '', subheading: '', lead: '', paragraphs: [] }),
  },
  proseSection: {
    label: 'Texte',
    fields: [
      { name: 'eyebrow', label: 'Surtitre', type: 'text' },
      { name: 'heading', label: 'Titre (H2)', type: 'text' },
      { name: 'body', label: 'Contenu', type: 'richtext' },
      { name: 'background', label: 'Arrière-plan', type: 'select', options: BG_OPTIONS },
    ],
    blank: () => ({ _type: 'proseSection', _key: newKey(), eyebrow: '', heading: '', body: [], background: 'white' }),
  },
  splitProseSection: {
    label: 'Texte + image',
    fields: [
      { name: 'eyebrow', label: 'Surtitre', type: 'text' },
      { name: 'heading', label: 'Titre (H2)', type: 'text' },
      { name: 'body', label: 'Contenu', type: 'richtext' },
      {
        name: 'imageSide',
        label: 'Côté de l’image',
        type: 'select',
        options: [{ value: 'left', label: 'Gauche' }, { value: 'right', label: 'Droite' }],
      },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'imageAlt', label: 'Texte alternatif de l’image', type: 'text' },
      { name: 'badgeValue', label: 'Badge — valeur (optionnel)', type: 'text' },
      { name: 'badgeLabel', label: 'Badge — libellé', type: 'text' },
      { name: 'linkLabel', label: 'Lien — texte (optionnel)', type: 'text' },
      { name: 'linkUrl', label: 'Lien — URL', type: 'text' },
      { name: 'background', label: 'Arrière-plan', type: 'select', options: BG_OPTIONS },
    ],
    blank: () => ({
      _type: 'splitProseSection', _key: newKey(),
      eyebrow: '', heading: '', body: [], imageSide: 'left', background: 'white',
    }),
  },
  listSection: {
    label: 'Liste',
    fields: [
      { name: 'eyebrow', label: 'Surtitre', type: 'text' },
      { name: 'heading', label: 'Titre (H2)', type: 'text' },
      { name: 'intro', label: 'Introduction', type: 'textarea' },
      { name: 'items', label: 'Éléments', type: 'stringList' },
      {
        name: 'layout', label: 'Disposition', type: 'select',
        options: [{ value: 'grid3', label: 'Grille compacte (3 col.)' }, { value: 'grid2', label: 'Deux colonnes' }],
      },
      { name: 'ctaLabel', label: 'Lien d’appel (optionnel)', type: 'text' },
      { name: 'ctaUrl', label: 'URL du lien d’appel', type: 'text' },
      { name: 'outro', label: 'Conclusion', type: 'textarea' },
      { name: 'background', label: 'Arrière-plan', type: 'select', options: BG_OPTIONS },
    ],
    blank: () => ({
      _type: 'listSection', _key: newKey(),
      eyebrow: '', heading: '', intro: '', items: [], layout: 'grid3', outro: '', background: 'gray',
    }),
  },
  approachSection: {
    label: 'Méthode (étapes)',
    fields: [
      { name: 'eyebrow', label: 'Surtitre', type: 'text' },
      { name: 'heading', label: 'Titre (H2)', type: 'text' },
      { name: 'tagline', label: 'Sous-titre (optionnel)', type: 'textarea' },
      {
        name: 'steps', label: 'Étapes', type: 'objectList',
        itemLabelKey: 'title',
        itemFields: [
          { name: 'title', label: 'Titre', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
        newItem: () => ({ _key: newKey(), title: '', description: '' }),
      },
      { name: 'background', label: 'Arrière-plan', type: 'select', options: BG_OPTIONS },
    ],
    blank: () => ({ _type: 'approachSection', _key: newKey(), eyebrow: '', heading: '', tagline: '', steps: [], background: 'white' }),
  },
  serviceDetailSection: {
    label: 'Détail de service',
    fields: [
      { name: 'heading', label: 'Titre (H2)', type: 'text' },
      { name: 'body', label: 'Contenu', type: 'richtext' },
      {
        name: 'accent', label: 'Couleur', type: 'select',
        options: [{ value: 'blue', label: 'Bleu' }, { value: 'indigo', label: 'Indigo' }, { value: 'amber', label: 'Ambre' }],
      },
      {
        name: 'imageSide', label: 'Côté de l’image', type: 'select',
        options: [{ value: 'left', label: 'Gauche' }, { value: 'right', label: 'Droite' }],
      },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'imageAlt', label: 'Texte alternatif de l’image', type: 'text' },
      { name: 'background', label: 'Arrière-plan', type: 'select', options: BG_OPTIONS },
    ],
    blank: () => ({ _type: 'serviceDetailSection', _key: newKey(), heading: '', body: [], accent: 'blue', imageSide: 'left', background: 'white' }),
  },
  ctaSection: {
    label: 'Appel à l’action',
    fields: [
      { name: 'eyebrow', label: 'Surtitre', type: 'text' },
      { name: 'heading', label: 'Titre (H2)', type: 'text' },
      { name: 'paragraphs', label: 'Paragraphes', type: 'textList' },
      { name: 'buttonLabel', label: 'Texte du bouton', type: 'text' },
      { name: 'buttonUrl', label: 'Lien du bouton', type: 'text' },
      { name: 'image', label: 'Image de fond', type: 'image' },
    ],
    blank: () => ({
      _type: 'ctaSection', _key: newKey(),
      eyebrow: '', heading: '', paragraphs: [], buttonLabel: 'Prenez rendez-vous', buttonUrl: '/contact',
    }),
  },
  homeHeroSection: {
    label: 'En-tête accueil',
    fields: [
      { name: 'eyebrow', label: 'Surtitre (pastille)', type: 'text' },
      { name: 'heading', label: 'Titre (H1) — {{mot}} en ambre', type: 'textarea' },
      { name: 'lead', label: 'Texte d’introduction', type: 'textarea' },
      { name: 'primaryLabel', label: 'Bouton principal — texte', type: 'text' },
      { name: 'primaryUrl', label: 'Bouton principal — URL', type: 'text' },
      { name: 'secondaryLabel', label: 'Bouton secondaire — texte', type: 'text' },
      { name: 'secondaryUrl', label: 'Bouton secondaire — URL', type: 'text' },
      {
        name: 'badges', label: 'Statistiques', type: 'objectList', itemLabelKey: 'label',
        itemFields: [
          { name: 'value', label: 'Valeur', type: 'text' },
          { name: 'label', label: 'Libellé', type: 'text' },
        ],
        newItem: () => ({ _key: newKey(), value: '', label: '' }),
      },
      { name: 'image', label: 'Image de fond', type: 'image' },
    ],
    blank: () => ({
      _type: 'homeHeroSection', _key: newKey(),
      eyebrow: '', heading: '', lead: '',
      primaryLabel: 'Parler à un conseiller', primaryUrl: '/contact',
      secondaryLabel: 'Découvrir nos services', secondaryUrl: '/services', badges: [],
    }),
  },
  servicesSection: {
    label: 'Cartes de services',
    fields: [
      { name: 'eyebrow', label: 'Surtitre', type: 'text' },
      { name: 'heading', label: 'Titre (H2)', type: 'text' },
      {
        name: 'items', label: 'Services', type: 'objectList', itemLabelKey: 'title',
        itemFields: [
          { name: 'title', label: 'Titre', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
        newItem: () => ({ _key: newKey(), title: '', description: '' }),
      },
      { name: 'ctaLabel', label: 'Lien — texte (optionnel)', type: 'text' },
      { name: 'ctaUrl', label: 'Lien — URL', type: 'text' },
    ],
    blank: () => ({ _type: 'servicesSection', _key: newKey(), eyebrow: '', heading: '', items: [], ctaLabel: '', ctaUrl: '/services' }),
  },
  featureGridSection: {
    label: 'Grille d’atouts',
    fields: [
      { name: 'eyebrow', label: 'Surtitre', type: 'text' },
      { name: 'heading', label: 'Titre (H2)', type: 'text' },
      {
        name: 'variant', label: 'Style', type: 'select',
        options: [{ value: 'icons', label: 'Icônes' }, { value: 'check', label: 'Coches' }],
      },
      {
        name: 'items', label: 'Atouts', type: 'objectList', itemLabelKey: 'title',
        itemFields: [
          { name: 'title', label: 'Titre', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
        newItem: () => ({ _key: newKey(), title: '', description: '' }),
      },
      { name: 'background', label: 'Arrière-plan', type: 'select', options: BG_OPTIONS },
    ],
    blank: () => ({ _type: 'featureGridSection', _key: newKey(), eyebrow: '', heading: '', items: [], background: 'gray' }),
  },
  contactFormSection: {
    label: 'Formulaire de contact',
    fields: [
      { name: 'heading', label: 'Titre (H2)', type: 'text' },
      { name: 'intro', label: 'Introduction', type: 'textarea' },
      { name: 'photoImage', label: 'Photo (équipe)', type: 'image' },
      { name: 'officeName', label: 'Bureau — intitulé', type: 'text' },
      { name: 'addressLines', label: 'Adresse (lignes)', type: 'stringList' },
      { name: 'photoCaptionName', label: 'Photo — noms', type: 'text' },
      { name: 'photoCaptionRole', label: 'Photo — rôle', type: 'text' },
      { name: 'trustHeading', label: 'Atouts — titre', type: 'text' },
      {
        name: 'trustItems', label: 'Atouts', type: 'objectList', itemLabelKey: 'title',
        itemFields: [
          { name: 'title', label: 'Titre', type: 'text' },
          { name: 'desc', label: 'Description', type: 'textarea' },
        ],
        newItem: () => ({ _key: newKey(), title: '', desc: '' }),
      },
    ],
    blank: () => ({
      _type: 'contactFormSection', _key: newKey(),
      heading: 'Prenez rendez-vous', intro: '', officeName: 'Notre bureau', addressLines: [],
      photoCaptionName: '', photoCaptionRole: '', trustHeading: 'Pourquoi choisir BBFAP?', trustItems: [],
    }),
  },
  mapSection: {
    label: 'Carte',
    fields: [
      { name: 'heading', label: 'Titre (H2)', type: 'text' },
      { name: 'embedUrl', label: 'URL d’intégration (iframe)', type: 'text' },
      { name: 'iframeTitle', label: 'Titre du cadre (accessibilité)', type: 'text' },
    ],
    blank: () => ({ _type: 'mapSection', _key: newKey(), heading: 'Nous trouver', embedUrl: '', iframeTitle: 'Carte' }),
  },
  servicesGridSection: {
    label: 'Cartes services + listes',
    fields: [
      { name: 'eyebrow', label: 'Surtitre', type: 'text' },
      { name: 'heading', label: 'Titre (H2)', type: 'text' },
      {
        name: 'items', label: 'Services', type: 'objectList', itemLabelKey: 'title',
        itemFields: [
          { name: 'title', label: 'Titre', type: 'text' },
          { name: 'desc', label: 'Description', type: 'textarea' },
          { name: 'bullets', label: 'Points', type: 'stringList' },
        ],
        newItem: () => ({ _key: newKey(), title: '', desc: '', bullets: [] }),
      },
      { name: 'background', label: 'Arrière-plan', type: 'select', options: BG_OPTIONS },
    ],
    blank: () => ({ _type: 'servicesGridSection', _key: newKey(), eyebrow: '', heading: '', items: [], background: 'gray' }),
  },
  areasSection: {
    label: 'Secteurs desservis',
    fields: [
      { name: 'eyebrow', label: 'Surtitre', type: 'text' },
      { name: 'heading', label: 'Titre (H2)', type: 'text' },
      { name: 'intro', label: 'Introduction', type: 'textarea' },
      { name: 'areas', label: 'Secteurs', type: 'stringList' },
      { name: 'background', label: 'Arrière-plan', type: 'select', options: BG_OPTIONS },
    ],
    blank: () => ({ _type: 'areasSection', _key: newKey(), eyebrow: '', heading: '', intro: '', areas: [], background: 'white' }),
  },
  statsBandSection: {
    label: 'Bandeau de statistiques',
    fields: [
      {
        name: 'stats', label: 'Statistiques', type: 'objectList', itemLabelKey: 'label',
        itemFields: [
          { name: 'value', label: 'Valeur', type: 'text' },
          { name: 'label', label: 'Libellé', type: 'text' },
        ],
        newItem: () => ({ _key: newKey(), value: '', label: '' }),
      },
    ],
    blank: () => ({ _type: 'statsBandSection', _key: newKey(), stats: [] }),
  },
};

// Order shown in the "add section" menu.
export const SECTION_ORDER = [
  'homeHeroSection', 'heroSection', 'proseSection', 'splitProseSection', 'serviceDetailSection',
  'approachSection', 'servicesSection', 'servicesGridSection', 'featureGridSection',
  'areasSection', 'statsBandSection', 'listSection',
  'contactFormSection', 'mapSection', 'ctaSection',
];

export { newKey as newSectionKey };
