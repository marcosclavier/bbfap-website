import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Article de blogue',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'readTime',
      title: 'Temps de lecture',
      type: 'string',
      description: 'Ex. "3 min", "5 min"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Placements', value: 'Placements'},
          {title: 'Fiscalité', value: 'Fiscalité'},
          {title: 'Impôts', value: 'Impôts'},
          {title: 'Assurances', value: 'Assurances'},
          {title: 'Conseils', value: 'Conseils'},
          {title: 'Planification Successorale', value: 'Planification Successorale'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Image principale',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          description: 'Description pour l’accessibilité et le SEO.',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait',
      type: 'text',
      rows: 3,
      description: 'Court résumé affiché dans la liste et en haut de l’article.',
      validation: (rule) => rule.required().min(40).max(500),
    }),
    defineField({
      name: 'hasVideo',
      title: 'Cet article contient une vidéo',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
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
                  {name: 'newWindow', type: 'boolean', title: 'Ouvrir dans un nouvel onglet', initialValue: true},
                ],
              },
            ],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  orderings: [
    {
      title: 'Date de publication, plus récent',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'heroImage'},
  },
})
