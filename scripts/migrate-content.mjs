#!/usr/bin/env node
/**
 * One-time migration: import legacy blogPosts.js + canonical video list into Sanity.
 *
 * Required env (in .env or shell):
 *   VITE_SANITY_PROJECT_ID   — your Sanity project id
 *   VITE_SANITY_DATASET      — dataset name (defaults to "production")
 *   SANITY_WRITE_TOKEN       — token with Editor rights (delete after migration)
 *
 * Idempotent: skips blog posts whose slug already exists, and videos whose title already exists.
 * Re-running is safe; manual edits in Studio are preserved.
 */

import {readFile, access} from 'node:fs/promises'
import {createReadStream} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {dirname, resolve, basename} from 'node:path'
import {createClient} from '@sanity/client'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const LEGACY_VIDEOS = [
  {title: 'Le CELI, le plus beau cadeau pour vos héritiers?', duration: '4:32', description: 'Pourquoi le CELI pourrait être le plus beau cadeau à laisser à vos héritiers.', thumbnail: '/images/generated/thumb-1.png', youtubeUrl: null},
  {title: 'Tout investir au Canada — une bonne idée?', duration: '3:31', description: 'Devriez-vous investir 100% de vos actifs au Canada? Notre analyse.', thumbnail: '/images/generated/thumb-2.png', youtubeUrl: null},
  {title: 'Attention au risque de concentration!', duration: '4:53', description: 'Le risque de concentration et pourquoi il ne faut pas le négliger.', thumbnail: '/images/generated/thumb-3.png', youtubeUrl: null},
  {title: 'Investir par soi-même vs avec un conseiller', duration: '11:48', description: 'Gérer vos placements* seul ou avec un conseiller — quelle est la meilleure option?', thumbnail: '/images/generated/thumb-4.png', youtubeUrl: null},
  {title: 'Votre tolérance au risque tue vos chances d’une retraite confortable', duration: '6:49', description: 'Comment votre aversion au risque peut nuire à votre retraite.', thumbnail: '/images/generated/thumb-5.png', youtubeUrl: null},
  {title: 'Assurance vie temporaire vs permanente — Laquelle choisir?', duration: '12:49', description: 'La différence entre assurance vie temporaire et permanente, et quand choisir chacune.', thumbnail: '/images/generated/thumb-6.png', youtubeUrl: null},
  {title: 'Convention d’actionnaires : essentielle pour votre entreprise', duration: '5:51', description: 'Pourquoi une convention d’actionnaires est indispensable pour protéger votre entreprise.', thumbnail: '/images/generated/thumb-7.png', youtubeUrl: null},
  {title: 'Placer de l’argent dans une compagnie de gestion? Attention à cette erreur fatale', duration: '5:43', description: 'L’erreur fatale à éviter pour ne pas perdre la déduction pour petite entreprise.', thumbnail: '/images/original/general-8.webp', youtubeUrl: null},
  {title: 'Gel Successoral : C’est quoi?', duration: '8:21', description: 'Le gel successoral expliqué par Annie Bélanger, M.Fisc — outil puissant de planification fiscale.', thumbnail: '/images/generated/thumb-9.png', youtubeUrl: null},
]

await loadDotEnv(resolve(ROOT, '.env'))

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || projectId === 'REPLACE_WITH_PROJECT_ID') {
  console.error('Missing VITE_SANITY_PROJECT_ID. Set it in .env or shell.')
  process.exit(1)
}
if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN. Generate one at sanity.io/manage with Editor permissions.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-09-01',
  useCdn: false,
  token,
})

const blogModule = await import(resolve(ROOT, 'src/data/blogPosts.js'))
const legacyPosts = blogModule.blogPosts

const imageAssetCache = new Map()

console.log(`[migrate] Migrating ${legacyPosts.length} blog posts to Sanity (project=${projectId}, dataset=${dataset})…`)

let createdPosts = 0
let skippedPosts = 0

for (const post of legacyPosts) {
  const existing = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]._id`,
    {slug: post.slug}
  )
  if (existing) {
    console.log(`  - skip "${post.slug}" (already exists)`)
    skippedPosts++
    continue
  }

  const heroAssetId = post.image ? await uploadImageOnce(post.image) : null

  const doc = {
    _type: 'blogPost',
    title: post.title,
    slug: {_type: 'slug', current: post.slug},
    publishedAt: `${post.date}T12:00:00.000Z`,
    readTime: post.readTime,
    category: post.category,
    excerpt: post.excerpt,
    hasVideo: !!post.hasVideo,
    body: paragraphsToPortableText(post.content),
  }

  if (heroAssetId) {
    doc.heroImage = {
      _type: 'image',
      asset: {_type: 'reference', _ref: heroAssetId},
      alt: post.title,
    }
  }

  await client.create(doc)
  console.log(`  ✓ created "${post.slug}"`)
  createdPosts++
}

console.log(`[migrate] Posts: ${createdPosts} created, ${skippedPosts} skipped.`)

console.log(`[migrate] Migrating ${LEGACY_VIDEOS.length} videos…`)

let createdVideos = 0
let skippedVideos = 0

for (let i = 0; i < LEGACY_VIDEOS.length; i++) {
  const v = LEGACY_VIDEOS[i]
  const existing = await client.fetch(
    `*[_type == "video" && title == $title][0]._id`,
    {title: v.title}
  )
  if (existing) {
    console.log(`  - skip "${v.title}" (already exists)`)
    skippedVideos++
    continue
  }

  const thumbAssetId = v.thumbnail ? await uploadImageOnce(v.thumbnail) : null

  const doc = {
    _type: 'video',
    title: v.title,
    duration: v.duration,
    description: v.description,
    order: i,
    featuredOnHome: true,
  }

  if (v.youtubeUrl) {
    doc.youtubeUrl = v.youtubeUrl
  }

  if (thumbAssetId) {
    doc.customThumbnail = {
      _type: 'image',
      asset: {_type: 'reference', _ref: thumbAssetId},
      alt: v.title,
    }
  }

  await client.create(doc)
  console.log(`  ✓ created "${v.title}" (youtubeUrl ${v.youtubeUrl ? 'set' : 'missing — fill in Studio'})`)
  createdVideos++
}

console.log(`[migrate] Videos: ${createdVideos} created, ${skippedVideos} skipped.`)
console.log('[migrate] Done. Open Studio to fill in the per-video YouTube URLs.')

async function uploadImageOnce(publicPath) {
  if (imageAssetCache.has(publicPath)) return imageAssetCache.get(publicPath)
  const fsPath = resolve(ROOT, 'public', publicPath.replace(/^\//, ''))
  try {
    await access(fsPath)
  } catch {
    console.warn(`    ! image not found, skipping: ${publicPath}`)
    return null
  }
  const asset = await client.assets.upload('image', createReadStream(fsPath), {
    filename: basename(fsPath),
  })
  imageAssetCache.set(publicPath, asset._id)
  return asset._id
}

function paragraphsToPortableText(paragraphs) {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `block-${i}`,
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `span-${i}`,
        text,
        marks: [],
      },
    ],
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
