import {defineType, defineField} from 'sanity'

const youtubeUrlPattern = /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)[\w-]{6,}/

export default defineType({
  name: 'video',
  title: 'Vignette personnalisée YouTube',
  type: 'document',
  description:
    'La liste des vidéos est tirée automatiquement de la chaîne YouTube. Créez un document ici uniquement si vous voulez remplacer la vignette ou le titre d’une vidéo en particulier.',
  fields: [
    defineField({
      name: 'youtubeUrl',
      title: 'URL YouTube',
      type: 'url',
      description: 'Collez l’URL complète de la vidéo (ex. https://www.youtube.com/watch?v=…). Sert de clé pour relier ce document à la vidéo sur YouTube.',
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['http', 'https']})
          .custom((value) =>
            !value || youtubeUrlPattern.test(value)
              ? true
              : 'L’URL doit pointer vers une vidéo YouTube (watch, youtu.be ou shorts).',
          ),
    }),
    defineField({
      name: 'customThumbnail',
      title: 'Vignette personnalisée',
      type: 'image',
      description:
        'Remplace la vignette automatique de YouTube. Laissez vide pour utiliser celle de YouTube.',
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
      name: 'title',
      title: 'Titre (optionnel)',
      type: 'string',
      description:
        'Laissez vide pour utiliser le titre YouTube. Remplissez seulement pour le remplacer sur le site.',
      validation: (rule) => rule.max(200),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'youtubeUrl', media: 'customThumbnail'},
    prepare({title, subtitle, media}) {
      return {
        title: title || subtitle || 'Vignette personnalisée',
        subtitle: title ? subtitle : undefined,
        media,
      }
    },
  },
})
