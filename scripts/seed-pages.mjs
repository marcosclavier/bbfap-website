#!/usr/bin/env node
/**
 * One-time migration: transcribe the current hardcoded marketing-page content into Sanity
 * `page` documents so the /admin section builder opens fully populated and the CMS-rendered
 * page matches the legacy page. Run with:  node scripts/seed-pages.mjs [pageKey ...]
 *
 * Uses createOrReplace by deterministic _id `page.<key>` — re-running re-seeds from this file
 * (it overwrites edits made in /admin, so only run for initial migration of a page).
 *
 * Phase 1 seeds the About page. Later phases add more pages here.
 */

import {readFile, access} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {dirname, resolve} from 'node:path'
import {randomUUID} from 'node:crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

await loadDotEnv(resolve(ROOT, '.env'))

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || 'production'
if (!projectId || !process.env.SANITY_API_TOKEN) {
  console.error('[seed-pages] Missing VITE_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env')
  process.exit(1)
}

const {createClient} = await import('@sanity/client')
const client = createClient({projectId, dataset, apiVersion: '2024-09-01', token: process.env.SANITY_API_TOKEN, useCdn: false})

// --- Portable Text + section builders -------------------------------------
const key = () => randomUUID().replace(/-/g, '').slice(0, 12)
const span = (text, marks = []) => ({_type: 'span', _key: key(), text, marks})
const para = (text) => ({_type: 'block', _key: key(), style: 'normal', markDefs: [], children: [span(text)]})
const bullet = (text) => ({_type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [span(text)]})
const section = (obj) => ({_key: key(), ...obj})
const step = (title, description) => ({_key: key(), title, description})
const kv = (value, label) => ({_key: key(), value, label})
const td = (title, desc) => ({_key: key(), title, desc})
const svc = (title, desc, bullets) => ({_key: key(), title, desc, bullets})

// Shared navy stats band content (identical on both landing pages, matching the legacy template).
const LANDING_STATS = [
  kv('30+', "Années d'expérience"),
  kv('100+', 'Entrepreneurs accompagnés'),
  kv('22', 'Assureurs partenaires'),
  kv('33%', 'Familles servies sur plusieurs générations'),
]

// French typography: non-breaking space before a colon (matches the legacy &nbsp;).
const NB = ' '

const PAGES = {
  home: {
    pageKey: 'home',
    title: 'Accueil',
    sections: [
      section({
        _type: 'homeHeroSection',
        eyebrow: 'Conseiller Financier Indépendant — Saint-Hubert',
        heading: 'Bélanger Brosseau – Services financiers à {{Saint-Hubert}} et sur la Rive-Sud de Montréal',
        lead: 'Fiscalité, assurances et placements* pour les entrepreneurs et professionnels incorporés de Brossard, Longueuil, Boucherville, Saint-Lambert, Saint-Bruno et Saint-Constant. Une approche structurée, claire et adaptée à votre réalité.',
        primaryLabel: 'Parler à un conseiller',
        primaryUrl: '/contact',
        secondaryLabel: 'Découvrir nos services',
        secondaryUrl: '/services',
        badges: [
          kv('100+', 'Entrepreneurs accompagnés'),
          kv('30+', "Années d'expérience"),
          kv('22', 'Assureurs partenaires'),
        ],
        image: '/images/team/team-white.webp',
      }),
      section({
        _type: 'proseSection',
        anchorId: 'introduction',
        background: 'white',
        eyebrow: 'À propos de Bélanger Brosseau',
        heading: 'Une approche claire et structurée',
        body: [
          para('Chez Bélanger Brosseau, nous offrons des services financiers intégrés en fiscalité, assurances et placements* pour les entrepreneurs et professionnels incorporés de la Rive-Sud de Montréal.'),
          para('Basés à Saint-Hubert, nous accompagnons une clientèle située à Brossard, Longueuil, Boucherville, Saint-Lambert, Saint-Bruno et Saint-Constant, avec une approche structurée, claire et adaptée à leur réalité.'),
          para('Notre objectif est simple : vous aider à prendre de meilleures décisions financières, avec cohérence et rigueur.'),
        ],
      }),
      section({
        _type: 'approachSection',
        background: 'gray',
        eyebrow: 'Notre Méthode',
        heading: `Quelle est l'approche de Bélanger Brosseau${NB}?`,
        tagline: `Une méthode claire en trois étapes${NB}: évaluation, implantation, suivi.`,
        steps: [
          step('Évaluation financière complète', "Nous analysons votre situation globale : fiscalité, structure corporative, assurances en place et stratégies de placements*. Cette étape permet d'identifier les optimisations possibles et les zones à améliorer."),
          step('Implantation de stratégies adaptées', "Nous mettons en place des solutions concrètes en fiscalité, assurances et placements*, adaptées à votre réalité d'entrepreneur ou de professionnel incorporé."),
          step('Suivi et ajustements continus', "Nous assurons un suivi régulier pour ajuster vos stratégies selon l'évolution de votre situation et des règles fiscales."),
        ],
      }),
      section({
        _type: 'servicesSection',
        eyebrow: 'Nos Services',
        heading: 'Trois expertises. Une équipe.',
        items: [
          step('Placements* et gestion de patrimoine', "Des stratégies d'investissement adaptées à votre profil, vos objectifs et votre réalité professionnelle."),
          step('Assurance de personnes et protection financière', 'Des solutions pour protéger votre revenu, votre famille et votre entreprise face aux imprévus.'),
          step('Un service de conseils financiers personnalisé', "Une vision d'ensemble qui relie fiscalité, retraite, décaissement et structure corporative."),
        ],
        ctaLabel: 'En savoir plus sur nos services',
        ctaUrl: '/services',
      }),
      section({
        _type: 'featureGridSection',
        background: 'gray',
        eyebrow: 'Pourquoi Bélanger Brosseau',
        heading: 'Ce qui nous distingue',
        items: [
          step('Une approche structurée et rigoureuse', 'Chaque recommandation repose sur une analyse complète et réfléchie.'),
          step('Une vision globale', "Nous considérons l'ensemble de votre situation, pas seulement un produit ou une décision isolée."),
          step('Une communication claire', 'Des explications simples pour des décisions éclairées.'),
          step('Une relation durable', "Un accompagnement dans le temps, adapté à l'évolution de votre situation."),
        ],
      }),
      section({
        _type: 'splitProseSection',
        background: 'white',
        imageSide: 'left',
        image: '/images/team/team-dark.webp',
        imageAlt: 'Annie Bélanger et Frédéric Babeux — Bélanger Brosseau',
        eyebrow: 'Notre Approche',
        heading: 'Une relation humaine au coeur de chaque décision',
        body: [
          para("Bélanger Brosseau, c'est avant tout une relation de confiance. Nous prenons le temps de bien comprendre votre réalité — vos projets, vos préoccupations, votre vision — pour vous accompagner avec constance et transparence."),
          para('Notre objectif est de vous aider à prendre des décisions financières cohérentes, alignées avec vos priorités personnelles et professionnelles, dans un cadre structuré et transparent.'),
        ],
        badgeValue: '30+',
        badgeLabel: "ans d'expérience",
        linkLabel: 'En savoir plus sur notre histoire',
        linkUrl: '/a-propos',
      }),
      section({
        _type: 'ctaSection',
        eyebrow: 'Prenez les devants',
        heading: 'Rencontrez Bélanger Brosseau à Saint-Hubert',
        paragraphs: [
          `Vous êtes situé sur la Rive-Sud de Montréal et souhaitez structurer vos décisions en fiscalité, assurances ou placements*${NB}? Une discussion permet souvent de clarifier rapidement votre situation et les prochaines étapes.`,
          'Prenez rendez-vous avec Bélanger Brosseau pour une approche claire, structurée et adaptée à votre réalité.',
        ],
        buttonLabel: 'Prenez rendez-vous',
        buttonUrl: '/contact',
        image: '/images/generated/section-contact.webp',
      }),
    ],
  },

  about: {
    pageKey: 'about',
    title: 'À propos',
    sections: [
      section({
        _type: 'heroSection',
        eyebrow: 'À propos',
        heading: 'Bélanger Brosseau – Le repreneuriat familial au cœur de notre approche',
        lead: "Un cabinet en services financiers sur la Rive-Sud de Montréal, bâti avec rigueur, transmis avec confiance et développé pour les entrepreneurs d'aujourd'hui.",
        image: '/images/team/team-dark.webp',
      }),
      section({
        _type: 'proseSection',
        background: 'white',
        body: [
          para("Chez Bélanger Brosseau, notre histoire s'inscrit dans une continuité."),
          para("Celle d'un cabinet en services financiers établi sur la Rive-Sud de Montréal, qui accompagne depuis plus de 30 ans des clients à Saint-Hubert, Brossard, Longueuil, Boucherville, Saint-Bruno et les environs."),
          para(`Le repreneuriat familial est au cœur de notre approche${NB}: préserver une relation de proximité tout en faisant évoluer les stratégies en fiscalité, assurances et placements*.`),
        ],
      }),
      section({
        _type: 'proseSection',
        background: 'gray',
        eyebrow: 'Repreneuriat familial',
        heading: 'Le repreneuriat familial chez Bélanger Brosseau',
        body: [
          para("Le repreneuriat familial ne se limite pas à un changement de direction."),
          para("C'est un engagement à maintenir la confiance des clients, assurer la continuité des stratégies et faire évoluer l'accompagnement selon les réalités actuelles des entrepreneurs et professionnels incorporés."),
          para(`Chez Bélanger Brosseau, cette transition a été réalisée de manière structurée, avec une priorité claire${NB}: protéger la qualité de la relation client.`),
        ],
      }),
      section({
        _type: 'splitProseSection',
        background: 'white',
        imageSide: 'left',
        image: '/images/team/team-white.webp',
        imageAlt: 'Annie Bélanger et Frédéric Babeux — Bélanger Brosseau',
        eyebrow: 'Nos Origines',
        heading: 'Les origines de Bélanger Brosseau',
        body: [
          para(`Fondé au tournant des années 90 par Annie Bélanger et Louis-Pierre Brosseau, le cabinet s'est développé autour de trois piliers essentiels${NB}:`),
          bullet('Fiscalité'),
          bullet('Assurances'),
          bullet('Placements*'),
          para("Dès le départ, l'objectif était d'offrir des services financiers intégrés, adaptés aux besoins réels des clients de la Rive-Sud de Montréal."),
        ],
      }),
      section({
        _type: 'splitProseSection',
        background: 'gray',
        imageSide: 'right',
        image: '/images/team/frederic-portrait.webp',
        imageAlt: 'Frédéric Babeux — relève de BBFAP',
        eyebrow: 'Transition',
        heading: 'Une transition réussie en repreneuriat familial',
        body: [
          para("En 2019, Frédéric Babeux se joint à l'équipe. Cette intégration marque le début d'un processus de transition réfléchi, réalisé en collaboration étroite avec Louis-Pierre Brosseau."),
          para("En 2021, Frédéric reprend officiellement la direction de Bélanger Brosseau. Grâce à une année complète de transition, l'ensemble des clients a été conservé, assurant une continuité naturelle et rassurante."),
        ],
      }),
      section({
        _type: 'splitProseSection',
        background: 'white',
        imageSide: 'left',
        image: '/images/team/frederic-window.webp',
        imageAlt: 'Frédéric Babeux, gestionnaire de portefeuille — Bélanger Brosseau',
        eyebrow: 'Évolution',
        heading: "L'évolution de Bélanger Brosseau en services financiers",
        body: [
          para(`Avec l'arrivée de Frédéric Babeux, l'offre de services s'élargit. Détenteur d'un permis en valeurs mobilières, il permet désormais aux clients d'accéder à${NB}:`),
          bullet('Actions'),
          bullet('Obligations'),
          bullet('Fonds négociés en bourse (FNB)'),
          para("Cette évolution permet à Bélanger Brosseau d'offrir une alternative complète aux institutions financières traditionnelles, tout en conservant une approche humaine et personnalisée."),
        ],
      }),
      section({
        _type: 'listSection',
        background: 'gray',
        eyebrow: 'Notre Clientèle',
        heading: 'Un accompagnement personnalisé pour chaque client',
        intro: `Aujourd'hui, Bélanger Brosseau accompagne avec fierté plus de 150 entrepreneurs, professionnels et familles, dont${NB}:`,
        items: [
          'Entrepreneurs incorporés',
          'Médecins, dentistes, ingénieurs, optométristes',
          'Investisseurs immobiliers',
          'Consultants et jeunes professionnels',
          'Familles avec un patrimoine important',
          "Propriétaires d'entreprise",
        ],
        outro: "Chaque client bénéficie d'un accompagnement adapté à sa réalité, avec une attention particulière portée à la structure corporative, à la fiscalité et à la croissance du patrimoine.",
      }),
      section({
        _type: 'ctaSection',
        eyebrow: 'Notre Engagement',
        heading: 'Continuité, rigueur et relation de confiance',
        paragraphs: [
          `Le repreneuriat familial chez Bélanger Brosseau se traduit par une volonté claire${NB}: assurer la continuité tout en améliorant constamment la qualité du service.`,
          "Nous croyons qu'une relation durable repose sur la confiance, la transparence et une compréhension approfondie de votre situation.",
          "C'est cette philosophie qui guide chacune de nos recommandations, aujourd'hui comme demain.",
        ],
        buttonLabel: 'Prenez rendez-vous',
        buttonUrl: '/contact',
        image: '/images/generated/section-contact.webp',
      }),
    ],
  },

  services: {
    pageKey: 'services',
    title: 'Services',
    sections: [
      section({
        _type: 'heroSection',
        eyebrow: 'Nos Services',
        heading: 'Nos services financiers chez Bélanger Brosseau – Rive-Sud de Montréal',
        subheading: 'Des services en fiscalité, assurances et placements* pour les entrepreneurs et professionnels de Saint-Hubert, Brossard, Longueuil et la Rive-Sud.',
        paragraphs: [
          `Chez Bélanger Brosseau, nous offrons des services financiers complets qui s'articulent autour de trois piliers essentiels${NB}: la fiscalité, les assurances et les placements*.`,
          'Basés à Saint-Hubert, nous accompagnons une clientèle située à Brossard, Longueuil, Boucherville, Saint-Bruno, Saint-Lambert, Saint-Constant, et toute la Rive-Sud de Montréal.',
          'Notre objectif est de vous aider à prendre des décisions financières cohérentes, en tenant compte de votre réalité professionnelle, de votre structure corporative et de vos objectifs.',
        ],
        image: '/images/team/frederic-headshot.webp',
      }),
      section({
        _type: 'approachSection',
        background: 'white',
        eyebrow: 'L’approche Bélanger Brosseau en services financiers',
        heading: `Une méthode structurée${NB}: évaluation, implantation, suivi`,
        steps: [
          step('Évaluation', "Nous réalisons une analyse complète de votre situation : fiscalité, structure corporative, assurances en place et placements*. Cette étape permet d'identifier les opportunités d'optimisation pour les entrepreneurs et professionnels de la Rive-Sud de Montréal."),
          step('Implantation', 'Nous mettons en place des stratégies concrètes en fiscalité, assurances et placements*, adaptées à votre réalité. Chaque solution est choisie avec rigueur, sans complexité inutile.'),
          step('Suivi', "Votre situation évolue. Nous assurons un suivi régulier pour ajuster vos stratégies selon l'évolution de votre situation et des règles fiscales."),
        ],
      }),
      section({
        _type: 'serviceDetailSection',
        background: 'gray',
        accent: 'blue',
        imageSide: 'left',
        image: '/images/generated/service-fiscalite.webp',
        imageAlt: 'Services de fiscalité — BBFAP',
        heading: 'Fiscalité – Services financiers Bélanger Brosseau sur la Rive-Sud',
        body: [
          para('La fiscalité est un levier central dans toute décision financière.'),
          para(`Chez Bélanger Brosseau, nous accompagnons les clients de Saint-Hubert, Brossard, Longueuil et les environs dans${NB}:`),
          bullet("L'optimisation de la structure corporative"),
          bullet('La gestion des revenus'),
          bullet('La réduction des impacts fiscaux'),
          para("Notre objectif est d'assurer une cohérence entre vos décisions fiscales, vos assurances et vos placements*."),
        ],
      }),
      section({
        _type: 'serviceDetailSection',
        background: 'white',
        accent: 'indigo',
        imageSide: 'right',
        image: '/images/generated/service-assurances.webp',
        imageAlt: "Services d'assurances — BBFAP",
        heading: 'Assurances – Protéger votre revenu et votre entreprise',
        body: [
          para('Les assurances permettent de sécuriser votre situation financière.'),
          para(`Nous aidons les entrepreneurs et professionnels de la Rive-Sud de Montréal à mettre en place des protections adaptées${NB}:`),
          bullet('Assurance vie'),
          bullet('Assurance invalidité'),
          bullet('Assurance maladies graves'),
          para('Chaque recommandation est basée sur vos besoins réels, sans surplus.'),
        ],
      }),
      section({
        _type: 'serviceDetailSection',
        background: 'gray',
        accent: 'amber',
        imageSide: 'left',
        image: '/images/generated/service-placements.webp',
        imageAlt: 'Services de placements — BBFAP',
        heading: "Placements* – Stratégies d'investissement avec Bélanger Brosseau",
        body: [
          para('Les placements* doivent être structurés avec discipline et cohérence.'),
          para(`Nous offrons aux clients de Saint-Hubert et de la Rive-Sud un accès à${NB}:`),
          bullet('Actions'),
          bullet('Obligations'),
          bullet('Fonds négociés en bourse (FNB)'),
          para('Nous construisons des portefeuilles adaptés à votre profil, en tenant compte de votre réalité fiscale et corporative.'),
        ],
      }),
      section({
        _type: 'proseSection',
        background: 'white',
        eyebrow: 'Intégration des services',
        heading: `Des services financiers intégrés${NB}: fiscalité, assurances et placements*`,
        body: [
          para("Chez Bélanger Brosseau, nous croyons qu'un service financier efficace repose sur l'intégration."),
          para('La fiscalité, les assurances et les placements* doivent fonctionner ensemble pour éviter les incohérences.'),
          para("C'est cette approche globale qui nous permet d'accompagner efficacement les clients de Brossard, Longueuil, Boucherville, Saint-Bruno et Saint-Lambert."),
        ],
      }),
      section({
        _type: 'listSection',
        background: 'gray',
        layout: 'grid2',
        eyebrow: 'Clientèle',
        heading: 'Services financiers pour entrepreneurs – Rive-Sud de Montréal',
        intro: `Nos services s'adressent principalement aux entrepreneurs, professionnels et familles qui souhaitent structurer efficacement leur situation financière${NB}:`,
        items: [
          'Entrepreneurs incorporés',
          'Médecins, dentistes, ingénieurs, optométristes…',
          'Investisseurs immobiliers',
          'Consultants et jeunes professionnels',
          'Familles avec un patrimoine important',
        ],
        ctaLabel: `Et bien d'autres${NB}— contactez-nous pour en savoir plus`,
        ctaUrl: '/contact',
        outro: 'Nous comprenons les enjeux liés à la réalité corporative et aux décisions financières complexes.',
      }),
      section({
        _type: 'ctaSection',
        heading: 'Discutons de votre situation',
        paragraphs: [
          'Une bonne structure financière commence toujours par une bonne compréhension.',
          'Prenez rendez-vous pour échanger sur votre situation actuelle et voir comment nos services en fiscalité, assurances et placements* peuvent vous apporter plus de clarté et de cohérence.',
        ],
        buttonLabel: 'Prenez rendez-vous',
        buttonUrl: '/contact',
        image: '/images/generated/section-contact.webp',
      }),
    ],
  },

  contact: {
    pageKey: 'contact',
    title: 'Contact',
    sections: [
      section({
        _type: 'heroSection',
        eyebrow: 'Contact',
        heading: 'Discutons de votre situation financière',
        lead: "Que vous soyez en début de parcours ou en phase d'optimisation, une discussion permet souvent de clarifier les prochaines étapes.",
        image: '/images/generated/section-contact.webp',
      }),
      section({
        _type: 'contactFormSection',
        heading: 'Prenez rendez-vous',
        intro: 'Remplissez le formulaire ci-dessous et nous vous contacterons dans les 24 heures pour planifier une rencontre.',
        photoImage: '/images/original/team.webp',
        photoAlt: 'Annie Bélanger et Frédéric Babeux, conseillers chez BBFAP',
        officeName: 'Notre bureau',
        addressLines: ['5215 Chemin Chambly', 'Saint-Hubert, QC J3Y 3N5'],
        photoCaptionName: 'Annie Bélanger & Frédéric Babeux',
        photoCaptionRole: 'Vos conseillers chez BBFAP',
        trustHeading: 'Pourquoi choisir BBFAP?',
        trustItems: [
          td('Retours garantis en moins de 24h', 'Appelez ou écrivez — nous vous répondons rapidement.'),
          td('Cabinet 100% indépendant', "Pas de produits maison, pas de conflits d'intérêts — vos intérêts seulement."),
          td('Fiscaliste attitrée à votre dossier', 'Annie Bélanger (M. Fisc.) impliquée dans chaque dossier dès le départ.'),
          td('Approche multi-générationnelle', "33% de nos familles sont servies sur plus d'une génération."),
          td('Gestion discrétionnaire disponible', 'Frédéric Babeux (CIM) offre ce service à valeur ajoutée normalement réservé aux grandes banques.'),
        ],
      }),
      section({
        _type: 'mapSection',
        heading: 'Nous trouver',
        embedUrl: 'https://www.google.com/maps?q=5215+Chemin+Chambly+Saint-Hubert+QC+J3Y+3N5&output=embed',
        iframeTitle: 'Emplacement de BBFAP — 5215 Chemin Chambly, Saint-Hubert',
      }),
    ],
  },

  'conseiller-rive-sud': {
    pageKey: 'conseiller-rive-sud',
    title: 'Conseiller financier — Rive-Sud',
    seo: {
      title: 'Conseiller financier Rive-Sud de Montréal | Bélanger Brosseau — Fiscalité, Assurances & Placements',
      description: 'Conseiller financier sur la Rive-Sud de Montréal. Cabinet indépendant à Saint-Hubert en fiscalité, assurances et placements pour entrepreneurs, professionnels et familles de Brossard, Longueuil, Boucherville et environs.',
      canonical: 'https://belangerbrosseau.com/conseiller-financier-rive-sud',
    },
    sections: [
      section({
        _type: 'heroSection',
        eyebrow: 'Conseiller financier — Rive-Sud de Montréal',
        heading: 'Conseiller financier sur la Rive-Sud de Montréal',
        subheading: 'Fiscalité, assurances et placements* pour les entrepreneurs et professionnels de la Rive-Sud.',
        paragraphs: [
          'Établi à Saint-Hubert, Bélanger Brosseau est un cabinet financier indépendant qui accompagne les entrepreneurs, les professionnels incorporés et les familles de toute la Rive-Sud de Montréal.',
          'Une équipe, une vision : nous réunissons la fiscalité, les assurances et les placements* sous un même toit pour des décisions financières claires et cohérentes.',
        ],
        primaryLabel: 'Prendre rendez-vous',
        primaryUrl: '/contact',
        secondaryLabel: 'Découvrir nos services',
        secondaryUrl: '/services',
        image: '/images/original/hero.webp',
      }),
      section({
        _type: 'proseSection',
        background: 'white',
        eyebrow: 'Votre cabinet de proximité',
        heading: 'Un conseiller financier ancré sur la Rive-Sud',
        body: [
          para("Depuis nos bureaux du 5215, chemin Chambly à Saint-Hubert, nous servons une clientèle locale qui cherche bien plus qu'un produit financier : une stratégie intégrée et un accompagnement durable."),
          para('Notre proximité avec les entrepreneurs et professionnels de la Rive-Sud nous permet de comprendre votre réalité corporative et de bâtir des solutions adaptées à votre situation.'),
          para('Rencontrez-nous à nos bureaux, à domicile ou par vidéoconférence — de jour comme de soir, selon vos disponibilités.'),
        ],
      }),
      section({
        _type: 'servicesGridSection',
        background: 'gray',
        eyebrow: 'Nos services financiers',
        heading: 'Des services intégrés pour les clients de la Rive-Sud',
        items: [
          svc('Fiscalité', 'La fiscalité est au cœur de chaque décision financière. Nous aidons les entrepreneurs de la Rive-Sud à structurer et optimiser leur situation.', ['Optimisation de la structure corporative', 'Gestion des revenus', 'Réduction des impacts fiscaux']),
          svc('Assurances', 'Protéger votre revenu, votre famille et votre entreprise avec des couvertures adaptées à vos besoins réels.', ['Assurance vie', 'Assurance invalidité', 'Assurance maladies graves']),
          svc('Placements*', 'Des portefeuilles structurés avec discipline, en cohérence avec votre réalité fiscale et corporative.', ['Actions et obligations', 'Fonds négociés en bourse (FNB)', 'Gestion discrétionnaire disponible']),
        ],
      }),
      section({
        _type: 'areasSection',
        background: 'white',
        eyebrow: 'Secteurs desservis',
        heading: 'Nous accompagnons les clients de toute la Rive-Sud',
        intro: "Notre cabinet de Saint-Hubert dessert l'ensemble de la Rive-Sud de Montréal. Voici quelques-uns des secteurs où nous accompagnons nos clients :",
        areas: ['Saint-Hubert', 'Brossard', 'Longueuil', 'Boucherville', 'Saint-Bruno-de-Montarville', 'Saint-Lambert', 'Saint-Constant'],
      }),
      section({_type: 'statsBandSection', stats: LANDING_STATS}),
      section({
        _type: 'featureGridSection',
        variant: 'check',
        background: 'gray',
        eyebrow: 'Pourquoi nous choisir',
        heading: 'Pourquoi choisir Bélanger Brosseau sur la Rive-Sud',
        items: [
          step('Cabinet 100% indépendant', "Pas de produits maison, pas de conflits d'intérêts — vos intérêts seulement."),
          step('Fiscaliste attitrée à votre dossier', 'Annie Bélanger (M. Fisc.) est impliquée dans chaque dossier dès le départ.'),
          step('Retours garantis en moins de 24h', 'Appelez ou écrivez — nous vous répondons rapidement.'),
          step('Approche multi-générationnelle', "33% de nos familles sont servies sur plus d'une génération."),
        ],
      }),
      section({
        _type: 'ctaSection',
        heading: 'Discutons de votre situation financière',
        paragraphs: [
          'Une bonne structure financière commence toujours par une bonne compréhension.',
          'Prenez rendez-vous avec un conseiller de la Rive-Sud pour faire le point sur votre fiscalité, vos assurances et vos placements*.',
        ],
        buttonLabel: 'Prendre rendez-vous',
        buttonUrl: '/contact',
        image: '/images/generated/section-contact.webp',
      }),
    ],
  },

  'conseiller-montreal': {
    pageKey: 'conseiller-montreal',
    title: 'Conseiller financier — Montréal',
    seo: {
      title: 'Conseiller financier à Montréal | Bélanger Brosseau — Fiscalité, Assurances & Placements',
      description: 'Conseiller financier pour les clients de Montréal et du Grand Montréal. Cabinet indépendant en fiscalité, assurances et placements pour entrepreneurs et professionnels. Rencontres à domicile ou par vidéoconférence.',
      canonical: 'https://belangerbrosseau.com/conseiller-financier-montreal',
    },
    sections: [
      section({
        _type: 'heroSection',
        eyebrow: 'Conseiller financier — Montréal & Grand Montréal',
        heading: 'Conseiller financier à Montréal',
        subheading: 'Fiscalité, assurances et placements* pour les entrepreneurs et professionnels du Grand Montréal.',
        paragraphs: [
          'Bélanger Brosseau est un cabinet financier indépendant qui accompagne les entrepreneurs, les professionnels incorporés et les familles de Montréal et du Grand Montréal.',
          'Une équipe, une vision : fiscalité, assurances et placements* réunis sous un même toit pour des décisions financières claires et cohérentes.',
        ],
        primaryLabel: 'Prendre rendez-vous',
        primaryUrl: '/contact',
        secondaryLabel: 'Découvrir nos services',
        secondaryUrl: '/services',
        image: '/images/team/team-dark.webp',
      }),
      section({
        _type: 'proseSection',
        background: 'white',
        eyebrow: 'Au service du Grand Montréal',
        heading: 'Un conseiller financier accessible où que vous soyez à Montréal',
        body: [
          para("Que vous soyez en début de parcours ou en phase d'optimisation, nous vous accompagnons partout dans le Grand Montréal avec une approche structurée et indépendante."),
          para('Pas besoin de vous déplacer : nous vous rencontrons à domicile ou par vidéoconférence, de jour comme de soir, selon vos disponibilités. Notre bureau principal est situé à Saint-Hubert, à quelques minutes du centre-ville de Montréal.'),
          para('Notre objectif : vous aider à prendre des décisions financières cohérentes en tenant compte de votre réalité professionnelle, de votre structure corporative et de vos objectifs.'),
        ],
      }),
      section({
        _type: 'servicesGridSection',
        background: 'gray',
        eyebrow: 'Nos services financiers',
        heading: 'Des services financiers intégrés pour les Montréalais',
        items: [
          svc('Fiscalité', 'La fiscalité est au cœur de chaque décision financière. Nous aidons les entrepreneurs du Grand Montréal à structurer et optimiser leur situation.', ['Optimisation de la structure corporative', 'Gestion des revenus', 'Réduction des impacts fiscaux']),
          svc('Assurances', 'Protéger votre revenu, votre famille et votre entreprise avec des couvertures adaptées à vos besoins réels.', ['Assurance vie', 'Assurance invalidité', 'Assurance maladies graves']),
          svc('Placements*', 'Des portefeuilles structurés avec discipline, en cohérence avec votre réalité fiscale et corporative.', ['Actions et obligations', 'Fonds négociés en bourse (FNB)', 'Gestion discrétionnaire disponible']),
        ],
      }),
      section({
        _type: 'areasSection',
        background: 'white',
        eyebrow: 'Secteurs desservis',
        heading: 'Nous accompagnons les clients de Montréal et des environs',
        intro: 'Depuis notre cabinet de la Rive-Sud, nous accompagnons une clientèle répartie dans tout le Grand Montréal, sur place ou par vidéoconférence :',
        areas: ['Montréal', 'Grand Montréal', 'Rive-Sud', 'Longueuil', 'Brossard', 'Saint-Lambert', 'Boucherville'],
      }),
      section({_type: 'statsBandSection', stats: LANDING_STATS}),
      section({
        _type: 'featureGridSection',
        variant: 'check',
        background: 'gray',
        eyebrow: 'Pourquoi nous choisir',
        heading: 'Pourquoi choisir Bélanger Brosseau à Montréal',
        items: [
          step('Cabinet 100% indépendant', "Pas de produits maison, pas de conflits d'intérêts — vos intérêts seulement."),
          step('Rencontres flexibles', 'À domicile ou par vidéoconférence, de jour comme de soir, partout dans le Grand Montréal.'),
          step('Fiscaliste attitrée à votre dossier', 'Annie Bélanger (M. Fisc.) est impliquée dans chaque dossier dès le départ.'),
          step('Gestion discrétionnaire disponible', 'Frédéric Babeux (CIM) offre un service normalement réservé aux grandes banques.'),
        ],
      }),
      section({
        _type: 'ctaSection',
        heading: 'Discutons de votre situation financière',
        paragraphs: [
          'Une bonne structure financière commence toujours par une bonne compréhension.',
          'Prenez rendez-vous avec un conseiller — où que vous soyez à Montréal — pour faire le point sur votre fiscalité, vos assurances et vos placements*.',
        ],
        buttonLabel: 'Prendre rendez-vous',
        buttonUrl: '/contact',
        image: '/images/generated/section-contact.webp',
      }),
    ],
  },
}

const requested = process.argv.slice(2)
const keysToSeed = requested.length ? requested : Object.keys(PAGES)

for (const k of keysToSeed) {
  const page = PAGES[k]
  if (!page) {
    console.warn(`[seed-pages] No seed defined for "${k}" — skipping.`)
    continue
  }
  await client.createOrReplace({_id: `page.${k}`, _type: 'page', ...page})
  console.log(`[seed-pages] Seeded page.${k} (${page.sections.length} sections).`)
}
console.log('[seed-pages] Done.')

async function loadDotEnv(path) {
  try {
    await access(path)
  } catch {
    return
  }
  const text = await readFile(path, 'utf8')
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = value
  }
}
