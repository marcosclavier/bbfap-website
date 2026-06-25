#!/usr/bin/env node
/**
 * Build-time content fetch.
 * - Blog posts: from Sanity if VITE_SANITY_PROJECT_ID is set, else legacy fallback.
 * - Videos: YouTube channel RSS as source-of-truth, merged with optional Sanity overrides
 *   (custom thumbnails / title overrides). On RSS failure, the previously written snapshot
 *   is preserved so a transient network blip never blanks the site.
 * Output: src/data/blog.generated.json, src/data/videos.generated.json.
 */

import {readFile, writeFile, access} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {dirname, resolve} from 'node:path'

import {
  DEFAULT_CHANNEL_ID,
  fetchSanityOverrides,
  fetchYouTubeFeed,
  mergeVideos,
} from './lib/youtube.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

await loadDotEnv(resolve(ROOT, '.env'))

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const channelId = process.env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID

const blogOut = resolve(ROOT, 'src/data/blog.generated.json')
const videosOut = resolve(ROOT, 'src/data/videos.generated.json')
const pagesOut = resolve(ROOT, 'src/data/pages.generated.json')

const sanityConfigured = projectId && projectId !== 'REPLACE_WITH_PROJECT_ID'

let sanityClient = null
let imageBuilder = null
if (sanityConfigured) {
  const {createClient} = await import('@sanity/client')
  const imageUrlBuilder = (await import('@sanity/image-url')).default
  sanityClient = createClient({
    projectId,
    dataset,
    apiVersion: '2024-09-01',
    useCdn: true,
    perspective: 'published',
  })
  imageBuilder = imageUrlBuilder({projectId, dataset})
}

const posts = await fetchBlogPosts()
const videos = await fetchVideos()
const pages = await fetchPages()

await writeFile(blogOut, JSON.stringify(posts, null, 2))
await writeFile(videosOut, JSON.stringify(videos, null, 2))
await writeFile(pagesOut, JSON.stringify(pages, null, 2))
console.log(
  `[build-content] Wrote ${posts.length} posts, ${videos.length} videos, ${Object.keys(pages).length} CMS page(s).`,
)

async function fetchPages() {
  // Marketing pages edited via the /admin section builder. Stored as `page` documents and
  // emitted keyed by pageKey. A page only takes over its route once it appears here; until
  // then the route renders its legacy hardcoded component (see the page components).
  if (!sanityConfigured) {
    console.log('[build-content] Sanity not configured — no CMS pages.')
    return {}
  }
  // Read pages with the API token (server-side only; never shipped to the client) and bypass
  // the CDN, so a page published moments before this build (via the deploy hook) is always
  // reflected and authoritative — page edits must never lag a build.
  const freshClient = sanityClient.withConfig({useCdn: false, token: process.env.SANITY_API_TOKEN})
  const rows = await freshClient.fetch(`*[_type == "page"]{ pageKey, title, sections, seo }`)
  const byKey = {}
  for (const p of rows) {
    if (p?.pageKey) {
      byKey[p.pageKey] = {pageKey: p.pageKey, title: p.title || p.pageKey, sections: p.sections || [], seo: p.seo || null}
    }
  }
  return byKey
}

async function fetchBlogPosts() {
  if (!sanityConfigured) {
    console.log('[build-content] Sanity not configured — using legacy blog posts.')
    return buildLegacyPosts()
  }
  console.log(`[build-content] Fetching blog posts from Sanity (project=${projectId}, dataset=${dataset})…`)
  const postsRaw = await sanityClient.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      "slug": slug.current,
      title,
      publishedAt,
      readTime,
      category,
      heroImage,
      excerpt,
      hasVideo,
      body
    }`,
  )
  return postsRaw.map((p) => ({
    id: p._id,
    slug: p.slug,
    title: p.title,
    publishedAt: p.publishedAt,
    readTime: p.readTime,
    category: p.category,
    heroImageUrl: p.heroImage
      ? imageBuilder.image(p.heroImage).auto('format').width(1600).quality(80).url()
      : null,
    heroImageAlt: p.heroImage?.alt || p.title,
    excerpt: p.excerpt,
    hasVideo: !!p.hasVideo,
    body: p.body || [],
  }))
}

async function fetchVideos() {
  try {
    console.log(`[build-content] Fetching YouTube feed (channel=${channelId})…`)
    const feed = await fetchYouTubeFeed(channelId)
    let overrides = new Map()
    if (sanityConfigured) {
      try {
        overrides = await fetchSanityOverrides(sanityClient, imageBuilder)
        console.log(`[build-content] Loaded ${overrides.size} Sanity video override(s).`)
      } catch (err) {
        console.warn('[build-content] Sanity override fetch failed; continuing with feed only:', err.message)
      }
    }
    return mergeVideos(feed, overrides)
  } catch (err) {
    console.warn(`[build-content] YouTube fetch failed (${err.message}). Preserving previous snapshot.`)
    try {
      const prev = JSON.parse(await readFile(videosOut, 'utf8'))
      if (Array.isArray(prev) && prev.length > 0) return prev
    } catch {
      // no previous snapshot; fall through to empty list
    }
    return []
  }
}

async function buildLegacyPosts() {
  const blogModule = await import(resolve(ROOT, 'src/data/blogPosts.js'))
  return blogModule.blogPosts.map((p) => ({
    id: `legacy-${p.slug}`,
    slug: p.slug,
    title: p.title,
    publishedAt: `${p.date}T00:00:00.000Z`,
    readTime: p.readTime,
    category: p.category,
    heroImageUrl: p.image || null,
    heroImageAlt: p.title,
    excerpt: p.excerpt,
    hasVideo: !!p.hasVideo,
    body: p.content,
  }))
}

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
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = value
  }
}
