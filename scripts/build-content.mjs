#!/usr/bin/env node
/**
 * Build-time content fetch.
 * - If VITE_SANITY_PROJECT_ID is configured, fetch posts/videos from Sanity.
 * - Otherwise, fall back to the legacy hardcoded blogPosts.js + canonical video list.
 * Output: src/data/blog.generated.json, src/data/videos.generated.json.
 */

import {readFile, writeFile, access} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {dirname, resolve} from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const LEGACY_VIDEOS = [
  {
    title: 'Le CELI, le plus beau cadeau pour vos héritiers?',
    duration: '4:32',
    description: 'Pourquoi le CELI pourrait être le plus beau cadeau à laisser à vos héritiers.',
    thumbnail: '/images/generated/thumb-1.png',
    youtubeUrl: null,
  },
  {
    title: 'Tout investir au Canada — une bonne idée?',
    duration: '3:31',
    description: 'Devriez-vous investir 100% de vos actifs au Canada? Notre analyse.',
    thumbnail: '/images/generated/thumb-2.png',
    youtubeUrl: null,
  },
  {
    title: 'Attention au risque de concentration!',
    duration: '4:53',
    description: 'Le risque de concentration et pourquoi il ne faut pas le négliger.',
    thumbnail: '/images/generated/thumb-3.png',
    youtubeUrl: null,
  },
  {
    title: 'Investir par soi-même vs avec un conseiller',
    duration: '11:48',
    description: 'Gérer vos placements* seul ou avec un conseiller — quelle est la meilleure option?',
    thumbnail: '/images/generated/thumb-4.png',
    youtubeUrl: null,
  },
  {
    title: 'Votre tolérance au risque tue vos chances d’une retraite confortable',
    duration: '6:49',
    description: 'Comment votre aversion au risque peut nuire à votre retraite.',
    thumbnail: '/images/generated/thumb-5.png',
    youtubeUrl: null,
  },
  {
    title: 'Assurance vie temporaire vs permanente — Laquelle choisir?',
    duration: '12:49',
    description: 'La différence entre assurance vie temporaire et permanente, et quand choisir chacune.',
    thumbnail: '/images/generated/thumb-6.png',
    youtubeUrl: null,
  },
  {
    title: 'Convention d’actionnaires : essentielle pour votre entreprise',
    duration: '5:51',
    description: 'Pourquoi une convention d’actionnaires est indispensable pour protéger votre entreprise.',
    thumbnail: '/images/generated/thumb-7.png',
    youtubeUrl: null,
  },
  {
    title: 'Placer de l’argent dans une compagnie de gestion? Attention à cette erreur fatale',
    duration: '5:43',
    description: 'L’erreur fatale à éviter pour ne pas perdre la déduction pour petite entreprise.',
    thumbnail: '/images/original/general-8.webp',
    youtubeUrl: null,
  },
  {
    title: 'Gel Successoral : C’est quoi?',
    duration: '8:21',
    description: 'Le gel successoral expliqué par Annie Bélanger, M.Fisc — outil puissant de planification fiscale.',
    thumbnail: '/images/generated/thumb-9.png',
    youtubeUrl: null,
  },
]

await loadDotEnv(resolve(ROOT, '.env'))

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || 'production'

const blogOut = resolve(ROOT, 'src/data/blog.generated.json')
const videosOut = resolve(ROOT, 'src/data/videos.generated.json')

const sanityConfigured = projectId && projectId !== 'REPLACE_WITH_PROJECT_ID'

if (sanityConfigured) {
  console.log(`[build-content] Fetching from Sanity (project=${projectId}, dataset=${dataset})…`)
  const {posts, videos} = await fetchFromSanity()
  await writeFile(blogOut, JSON.stringify(posts, null, 2))
  await writeFile(videosOut, JSON.stringify(videos, null, 2))
  console.log(`[build-content] Wrote ${posts.length} posts and ${videos.length} videos.`)
} else {
  console.log('[build-content] VITE_SANITY_PROJECT_ID not set — using legacy fallback.')
  const {posts, videos} = await buildFromLegacy()
  await writeFile(blogOut, JSON.stringify(posts, null, 2))
  await writeFile(videosOut, JSON.stringify(videos, null, 2))
  console.log(`[build-content] Wrote ${posts.length} posts and ${videos.length} videos.`)
}

async function fetchFromSanity() {
  const {createClient} = await import('@sanity/client')
  const imageUrlBuilder = (await import('@sanity/image-url')).default
  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-09-01',
    useCdn: true,
    perspective: 'published',
  })
  const builder = imageUrlBuilder({projectId, dataset})

  const postsRaw = await client.fetch(
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
    }`
  )

  const posts = postsRaw.map((p) => ({
    id: p._id,
    slug: p.slug,
    title: p.title,
    publishedAt: p.publishedAt,
    readTime: p.readTime,
    category: p.category,
    heroImageUrl: p.heroImage ? builder.image(p.heroImage).auto('format').width(1600).quality(80).url() : null,
    heroImageAlt: p.heroImage?.alt || p.title,
    excerpt: p.excerpt,
    hasVideo: !!p.hasVideo,
    body: p.body || [],
  }))

  const videosRaw = await client.fetch(
    `*[_type == "video"] | order(order asc) {
      _id,
      title,
      youtubeUrl,
      duration,
      description,
      customThumbnail,
      order,
      featuredOnHome
    }`
  )

  const videos = videosRaw.map((v) => ({
    id: v._id,
    title: v.title,
    youtubeUrl: v.youtubeUrl || null,
    duration: v.duration || '',
    description: v.description || '',
    thumbnailUrl: v.customThumbnail
      ? builder.image(v.customThumbnail).auto('format').width(960).quality(80).url()
      : null,
    order: v.order ?? 0,
    featuredOnHome: v.featuredOnHome !== false,
  }))

  return {posts, videos}
}

async function buildFromLegacy() {
  const blogModule = await import(resolve(ROOT, 'src/data/blogPosts.js'))
  const legacyPosts = blogModule.blogPosts

  const posts = legacyPosts.map((p, i) => ({
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

  const videos = LEGACY_VIDEOS.map((v, i) => ({
    id: `legacy-video-${i + 1}`,
    title: v.title,
    youtubeUrl: v.youtubeUrl || null,
    duration: v.duration,
    description: v.description,
    thumbnailUrl: v.thumbnail,
    order: i,
    featuredOnHome: true,
  }))

  return {posts, videos}
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
