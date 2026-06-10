/**
 * GET /api/videos
 *
 * Returns the live merged video feed: YouTube channel RSS as the list source-of-truth,
 * with optional per-video overrides (custom thumbnail / title) pulled from Sanity.
 *
 * Cached at Vercel's edge for 1h, stale-while-revalidate for 24h, so the live feed updates
 * within ~1h of a new YouTube upload at near-zero serverless cost.
 *
 * On RSS failure: serves the build-time snapshot baked into src/data/videos.generated.json
 * so the page never blanks. On Sanity failure: serves RSS-only (YouTube auto thumbnails).
 */

import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

import {
  DEFAULT_CHANNEL_ID,
  fetchSanityOverrides,
  fetchYouTubeFeed,
  mergeVideos,
} from '../scripts/lib/youtube.mjs'
import bakedVideos from '../src/data/videos.generated.json' with {type: 'json'}

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const channelId = process.env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID

const sanityConfigured = projectId && projectId !== 'REPLACE_WITH_PROJECT_ID'

let client = null
let imageBuilder = null
if (sanityConfigured) {
  client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-09-01',
    useCdn: true,
    perspective: 'published',
  })
  imageBuilder = imageUrlBuilder({projectId, dataset})
}

export default async function handler(req, res) {
  try {
    const [feed, overrides] = await Promise.all([
      fetchYouTubeFeed(channelId),
      sanityConfigured ? fetchSanityOverrides(client, imageBuilder).catch(() => new Map()) : new Map(),
    ])
    const videos = mergeVideos(feed, overrides)
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    res.status(200).json({videos, updatedAt: new Date().toISOString(), source: 'live'})
  } catch (err) {
    console.error('[api/videos] live fetch failed, serving baked snapshot:', err.message)
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600')
    res.status(200).json({videos: bakedVideos, updatedAt: null, source: 'fallback'})
  }
}
