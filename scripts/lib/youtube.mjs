/**
 * Shared YouTube + Sanity merge logic used by:
 *   - scripts/build-content.mjs (build-time snapshot baked into videos.generated.json)
 *   - api/videos.js (Vercel serverless function serving the live merged feed)
 *
 * Source-of-truth model:
 *   - YouTube channel RSS feed determines WHICH videos appear and in WHAT order (newest first).
 *   - Sanity `video` documents are optional overrides keyed by youtubeUrl; they can supply a
 *     custom thumbnail and/or a title override.
 */

import {XMLParser} from 'fast-xml-parser'

export const DEFAULT_CHANNEL_ID = 'UC0qp3oXbnyHBRsg74-FSikQ'

const ID_PATTERNS = [
  /[?&]v=([\w-]{6,})/,
  /youtu\.be\/([\w-]{6,})/,
  /youtube\.com\/shorts\/([\w-]{6,})/,
  /youtube\.com\/embed\/([\w-]{6,})/,
]

export function extractVideoId(url) {
  if (!url) return null
  for (const pattern of ID_PATTERNS) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export function youtubeFallbackThumbnail(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  parseTagValue: false,
})

export async function fetchYouTubeFeed(channelId = DEFAULT_CHANNEL_ID) {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
  const res = await fetch(url, {
    headers: {'User-Agent': 'bbfap-com-build/1.0 (+https://www.bbfap.com)'},
  })
  if (!res.ok) {
    throw new Error(`YouTube RSS fetch failed: ${res.status} ${res.statusText}`)
  }
  const xml = await res.text()
  const parsed = xmlParser.parse(xml)
  const entries = parsed?.feed?.entry
  if (!entries) return []
  const list = Array.isArray(entries) ? entries : [entries]
  return list.map((entry) => {
    const videoId = entry['yt:videoId']
    const link = Array.isArray(entry.link) ? entry.link[0] : entry.link
    const href = link?.href || `https://www.youtube.com/watch?v=${videoId}`
    return {
      id: videoId,
      title: typeof entry.title === 'string' ? entry.title : entry.title?.['#text'] || '',
      youtubeUrl: href,
      publishedAt: entry.published || null,
    }
  })
}

export async function fetchSanityOverrides(client, imageBuilder) {
  const docs = await client.fetch(
    `*[_type == "video" && defined(youtubeUrl)]{ youtubeUrl, customThumbnail, title }`,
  )
  const map = new Map()
  for (const doc of docs) {
    const videoId = extractVideoId(doc.youtubeUrl)
    if (!videoId) continue
    const thumbnailUrl = doc.customThumbnail
      ? imageBuilder.image(doc.customThumbnail).auto('format').width(960).quality(80).url()
      : null
    map.set(videoId, {
      thumbnailUrl,
      titleOverride: doc.title || null,
    })
  }
  return map
}

export function mergeVideos(feed, overrides = new Map()) {
  return feed.map((video) => {
    const override = overrides.get(video.id) || {}
    return {
      id: video.id,
      title: override.titleOverride || video.title,
      youtubeUrl: video.youtubeUrl,
      thumbnailUrl: override.thumbnailUrl || youtubeFallbackThumbnail(video.id),
      publishedAt: video.publishedAt,
    }
  })
}
