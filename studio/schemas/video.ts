import {defineType, defineField} from 'sanity'

const youtubeUrlPattern = /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)[\w-]{6,}/

export default defineType({
  name: 'video',
  title: 'Vidéo YouTube',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required().min(3).max(200),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'URL YouTube',
      type: 'url',
      description: 'Collez l’URL complète de la vidéo (ex. https://www.youtube.com/watch?v=…).',
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['http', 'https']})
          .custom((value) =>
            !value || youtubeUrlPattern.test(value)
              ? true
              : 'L’URL doit pointer vers une vidéo YouTube (watch, youtu.be ou shorts).'
          ),
    }),
    defineField({
      name: 'duration',
      title: 'Durée',
      type: 'string',
      description: 'Format mm:ss (ex. "4:32").',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'customThumbnail',
      title: 'Vignette personnalisée (optionnel)',
      type: 'image',
      description:
        'Si laissé vide, la vignette automatique de YouTube est utilisée.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Ordre d’affichage',
      type: 'number',
      description: 'Plus le nombre est petit, plus la vidéo apparaît tôt dans la grille.',
      initialValue: 0,
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Afficher sur la page d’accueil',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Ordre manuel',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'duration', media: 'customThumbnail'},
  },
})
