const ID_PATTERNS = [
  /[?&]v=([\w-]{6,})/,
  /youtu\.be\/([\w-]{6,})/,
  /youtube\.com\/shorts\/([\w-]{6,})/,
  /youtube\.com\/embed\/([\w-]{6,})/,
]

export function extractYouTubeId(url) {
  if (!url) return null
  for (const pattern of ID_PATTERNS) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export function youtubeThumbnail(idOrUrl, {quality = 'maxres'} = {}) {
  const id = idOrUrl?.length > 0 && !idOrUrl.includes('/') ? idOrUrl : extractYouTubeId(idOrUrl)
  if (!id) return null
  const file = quality === 'maxres' ? 'maxresdefault.jpg' : 'hqdefault.jpg'
  return `https://i.ytimg.com/vi/${id}/${file}`
}

export function youtubeWatchUrl(idOrUrl) {
  if (!idOrUrl) return null
  if (idOrUrl.startsWith('http')) return idOrUrl
  return `https://www.youtube.com/watch?v=${idOrUrl}`
}
