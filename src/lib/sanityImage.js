import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env?.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env?.VITE_SANITY_DATASET || 'production'

const builder = projectId ? imageUrlBuilder({projectId, dataset}) : null

export function urlFor(source) {
  if (!builder || !source) return null
  return builder.image(source)
}

export function imageSrc(source, {width, height, quality = 75} = {}) {
  if (!source) return null
  if (typeof source === 'string') return source
  if (!builder) return null
  let url = builder.image(source).auto('format').quality(quality)
  if (width) url = url.width(width)
  if (height) url = url.height(height)
  return url.url()
}
