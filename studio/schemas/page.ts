import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * Marketing page = an ordered list of typed sections (a page builder).
 *
 * The site is normally edited through the custom /admin section builder, not this Studio —
 * but the schema is defined here so the data is documented and Studio still works as a
 * fallback. Section types and fields must stay in sync with:
 *   - src/sections/registry.js          (frontend renderers + admin editor field config)
 *   - api/pages.js                      (server-side validation)
 *
 * v1 is text-first: image fields exist on sections (so the data carries the current image)
 * but are not yet exposed in the /admin editor.
 */

// --- reusable inline object members ---------------------------------------

const richBody = defineField({
  name: 'body',
  title: 'Contenu',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraphe', value: 'normal'},
        {title: 'Titre H2', value: 'h2'},
        {title: 'Titre H3', value: 'h3'},
        {title: 'Citation', value: 'blockquote'},
      ],
      lists: [
        {title: 'Liste à puces', value: 'bullet'},
        {title: 'Liste numérotée', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Gras', value: 'strong'},
          {title: 'Italique', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Lien',
            fields: [
              {name: 'href', type: 'url', title: 'URL'},
              {name: 'newWindow', type: 'boolean', title: 'Nouvel onglet', initialValue: true},
            ],
          },
        ],
      },
    }),
  ],
})

const backgroundField = defineField({
  name: 'background',
  title: 'Arrière-plan',
  type: 'string',
  options: {list: ['white', 'gray', 'navy'], layout: 'radio'},
  initialValue: 'white',
})

const imageField = defineField({name: 'image', title: 'Image (chemin)', type: 'string'})
const imageAltField = defineField({name: 'imageAlt', title: 'Texte alternatif', type: 'string'})

// --- section object types -------------------------------------------------

const heroSection = defineArrayMember({
  name: 'heroSection',
  title: 'Section — En-tête (hero)',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Surtitre', type: 'string'}),
    defineField({name: 'heading', title: 'Titre (H1)', type: 'string'}),
    defineField({name: 'subheading', title: 'Sous-titre (ambre)', type: 'string'}),
    defineField({name: 'lead', title: 'Texte d’introduction (court)', type: 'text', rows: 3}),
    defineField({name: 'paragraphs', title: 'Paragraphes', type: 'array', of: [{type: 'text'}]}),
    imageField,
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'En-tête', subtitle: 'Hero'})},
})

const approachSection = defineArrayMember({
  name: 'approachSection',
  title: 'Section — Méthode (étapes)',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Surtitre', type: 'string'}),
    defineField({name: 'heading', title: 'Titre (H2)', type: 'string'}),
    defineField({
      name: 'steps',
      title: 'Étapes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Titre', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
          ],
        }),
      ],
    }),
    backgroundField,
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Méthode', subtitle: 'Étapes'})},
})

const serviceDetailSection = defineArrayMember({
  name: 'serviceDetailSection',
  title: 'Section — Détail de service',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Titre (H2)', type: 'string'}),
    richBody,
    defineField({
      name: 'accent',
      title: 'Couleur',
      type: 'string',
      options: {list: ['blue', 'indigo', 'amber'], layout: 'radio'},
      initialValue: 'blue',
    }),
    defineField({
      name: 'imageSide',
      title: 'Côté de l’image',
      type: 'string',
      options: {list: ['left', 'right'], layout: 'radio'},
      initialValue: 'left',
    }),
    imageField,
    imageAltField,
    backgroundField,
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Détail de service', subtitle: 'Service'})},
})

const proseSection = defineArrayMember({
  name: 'proseSection',
  title: 'Section — Texte',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Surtitre', type: 'string'}),
    defineField({name: 'heading', title: 'Titre (H2)', type: 'string'}),
    richBody,
    backgroundField,
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Texte', subtitle: 'Texte'})},
})

const splitProseSection = defineArrayMember({
  name: 'splitProseSection',
  title: 'Section — Texte + image',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Surtitre', type: 'string'}),
    defineField({name: 'heading', title: 'Titre (H2)', type: 'string'}),
    richBody,
    defineField({
      name: 'imageSide',
      title: 'Côté de l’image',
      type: 'string',
      options: {list: ['left', 'right'], layout: 'radio'},
      initialValue: 'left',
    }),
    imageField,
    imageAltField,
    backgroundField,
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Texte + image', subtitle: 'Texte + image'})},
})

const listSection = defineArrayMember({
  name: 'listSection',
  title: 'Section — Liste',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Surtitre', type: 'string'}),
    defineField({name: 'heading', title: 'Titre (H2)', type: 'string'}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 2}),
    defineField({name: 'items', title: 'Éléments', type: 'array', of: [{type: 'string'}]}),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      options: {list: ['grid3', 'grid2'], layout: 'radio'},
      initialValue: 'grid3',
    }),
    defineField({name: 'ctaLabel', title: 'Lien d’appel (optionnel)', type: 'string'}),
    defineField({name: 'ctaUrl', title: 'URL du lien d’appel', type: 'string'}),
    defineField({name: 'outro', title: 'Conclusion', type: 'text', rows: 2}),
    backgroundField,
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Liste', subtitle: 'Liste'})},
})

const ctaSection = defineArrayMember({
  name: 'ctaSection',
  title: 'Section — Appel à l’action',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Surtitre', type: 'string'}),
    defineField({name: 'heading', title: 'Titre (H2)', type: 'string'}),
    defineField({name: 'paragraphs', title: 'Paragraphes', type: 'array', of: [{type: 'text'}]}),
    defineField({name: 'buttonLabel', title: 'Texte du bouton', type: 'string'}),
    defineField({name: 'buttonUrl', title: 'Lien du bouton', type: 'string'}),
    imageField,
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Appel à l’action', subtitle: 'CTA'})},
})

// --- the page document ----------------------------------------------------

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageKey',
      title: 'Clé de page',
      type: 'string',
      description: 'Identifiant unique correspondant à la route (ex. home, about, services).',
      options: {
        list: ['home', 'about', 'services', 'contact', 'conseiller-rive-sud', 'conseiller-montreal'],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'title', title: 'Titre (admin)', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [heroSection, proseSection, splitProseSection, serviceDetailSection, approachSection, listSection, ctaSection],
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'pageKey'}},
})
