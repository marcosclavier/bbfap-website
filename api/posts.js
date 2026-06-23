/**
 * /api/posts — server-side CRUD for blog posts, backing the self-serve editor at /admin.
 *
 * All writes go through the Sanity write token held in SANITY_API_TOKEN (server-only).
 * Every request is gated by the ADMIN_PASSWORD shared password (see scripts/lib/adminApi.mjs).
 *
 *   GET            -> list all posts (summary) for the editor list view / password check
 *   GET ?id=<id>   -> single post (with editable bodyText) for the editor form
 *   POST           -> create (no _id) or replace (with _id) a post; { publish:true } also
 *                     fires a Vercel deploy hook so the change goes live on the static site
 *   DELETE ?id=<id>-> delete a post, then fire the deploy hook
 *
 * The site reads a build-time snapshot (src/data/blog.generated.json), so saved changes
 * only appear on the public site after a rebuild — hence the deploy hook on publish.
 */

import {randomUUID} from 'node:crypto'

import {
  CATEGORIES,
  getImageBuilder,
  getWriteClient,
  guard,
  readJsonBody,
  triggerRebuild,
} from '../scripts/lib/adminApi.mjs'

const newKey = () => randomUUID().replace(/-/g, '').slice(0, 12)

const LIST_QUERY = `*[_type == "blogPost"] | order(publishedAt desc){
  _id, title, "slug": slug.current, publishedAt, readTime, category, excerpt, hasVideo, heroImage
}`

const SINGLE_QUERY = `*[_id == $id][0]{
  _id, title, "slug": slug.current, publishedAt, readTime, category, excerpt, hasVideo, heroImage, body
}`

export default async function handler(req, res) {
  if (!guard(req, res)) return

  try {
    if (req.method === 'GET') return await handleGet(req, res)
    if (req.method === 'POST') return await handlePost(req, res)
    if (req.method === 'DELETE') return await handleDelete(req, res)
    res.setHeader('Allow', 'GET, POST, DELETE')
    return res.status(405).json({ok: false, error: 'method_not_allowed'})
  } catch (err) {
    console.error('[api/posts] error:', err.message)
    return res.status(500).json({ok: false, error: 'server_error', detail: err.message})
  }
}

async function handleGet(req, res) {
  const client = getWriteClient()
  const builder = getImageBuilder()
  const id = req.query?.id

  if (id) {
    const post = await client.fetch(SINGLE_QUERY, {id})
    if (!post) return res.status(404).json({ok: false, error: 'not_found'})
    return res.status(200).json({ok: true, post: shapeSingle(post, builder)})
  }

  const posts = await client.fetch(LIST_QUERY)
  return res.status(200).json({
    ok: true,
    posts: posts.map((p) => ({
      _id: p._id,
      title: p.title,
      slug: p.slug,
      publishedAt: p.publishedAt,
      readTime: p.readTime,
      category: p.category,
      excerpt: p.excerpt,
      hasVideo: !!p.hasVideo,
      heroImageUrl: p.heroImage
        ? builder.image(p.heroImage).width(400).height(225).fit('crop').auto('format').url()
        : null,
    })),
  })
}

function shapeSingle(post, builder) {
  return {
    _id: post._id,
    title: post.title || '',
    slug: post.slug || '',
    publishedAt: post.publishedAt || '',
    readTime: post.readTime || '',
    category: post.category || '',
    excerpt: post.excerpt || '',
    hasVideo: !!post.hasVideo,
    heroImageAssetId: post.heroImage?.asset?._ref || null,
    heroImageAlt: post.heroImage?.alt || '',
    heroImageUrl: post.heroImage
      ? builder.image(post.heroImage).width(800).auto('format').url()
      : null,
    body: post.body || [],
  }
}

async function handlePost(req, res) {
  const body = readJsonBody(req)
  const errors = validate(body)
  if (errors.length) {
    return res.status(400).json({ok: false, error: 'validation_failed', fields: errors})
  }

  const client = getWriteClient()

  const publishedAt = normalizeDate(body.publishedAt)
  const doc = {
    _type: 'blogPost',
    title: body.title.trim(),
    slug: {_type: 'slug', current: slugify(body.slug || body.title)},
    publishedAt,
    readTime: body.readTime.trim(),
    category: body.category,
    excerpt: body.excerpt.trim(),
    hasVideo: !!body.hasVideo,
    heroImage: {
      _type: 'image',
      asset: {_type: 'reference', _ref: body.heroImageAssetId},
      alt: (body.heroImageAlt || body.title).trim(),
    },
    body: ensureKeys(body.body),
  }

  let saved
  if (body._id) {
    saved = await client.createOrReplace({_id: body._id, ...doc})
  } else {
    saved = await client.create(doc)
  }

  const rebuildTriggered = body.publish ? await triggerRebuild() : false
  return res.status(200).json({ok: true, id: saved._id, rebuildTriggered})
}

async function handleDelete(req, res) {
  const id = req.query?.id
  if (!id) return res.status(400).json({ok: false, error: 'missing_id'})
  await getWriteClient().delete(id)
  const rebuildTriggered = await triggerRebuild()
  return res.status(200).json({ok: true, rebuildTriggered})
}

// --- validation & helpers -------------------------------------------------

function validate(body) {
  const errors = []
  const str = (v) => (typeof v === 'string' ? v.trim() : '')

  if (str(body.title).length < 5 || str(body.title).length > 200) {
    errors.push('title')
  }
  if (!str(body.slug) && !str(body.title)) errors.push('slug')
  if (!str(body.publishedAt) || Number.isNaN(Date.parse(body.publishedAt))) {
    errors.push('publishedAt')
  }
  if (!str(body.readTime)) errors.push('readTime')
  if (!CATEGORIES.includes(body.category)) errors.push('category')
  if (str(body.excerpt).length < 40 || str(body.excerpt).length > 500) {
    errors.push('excerpt')
  }
  if (!str(body.heroImageAssetId)) errors.push('heroImage')
  if (!hasBodyContent(body.body)) errors.push('body')
  return errors
}

/** True when the Portable Text body has at least one block with visible text. */
function hasBodyContent(blocks) {
  return (
    Array.isArray(blocks) &&
    blocks.some(
      (b) =>
        b &&
        b._type === 'block' &&
        Array.isArray(b.children) &&
        b.children.some((s) => typeof s?.text === 'string' && s.text.trim()),
    )
  )
}

/**
 * Defensively ensure every block / span / markDef carries a `_key` (Sanity requires unique
 * keys in arrays). The client generates them, but never trust client input.
 */
function ensureKeys(blocks) {
  if (!Array.isArray(blocks)) return []
  return blocks.map((block) => {
    const b = {...block, _key: block._key || newKey()}
    if (Array.isArray(b.markDefs)) {
      b.markDefs = b.markDefs.map((d) => ({...d, _key: d._key || newKey()}))
    }
    if (Array.isArray(b.children)) {
      b.children = b.children.map((c) => ({...c, _key: c._key || newKey()}))
    }
    return b
  })
}

function normalizeDate(value) {
  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? new Date().toISOString() : new Date(parsed).toISOString()
}

function slugify(input) {
  return String(input)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}
