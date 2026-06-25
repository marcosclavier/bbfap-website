/**
 * /api/pages — server-side CRUD for marketing-page documents, backing the /admin section builder.
 *
 * Reuses the same auth + Sanity write token + deploy-hook infra as /api/posts
 * (scripts/lib/adminApi.mjs). Each page is a `page` document with a deterministic _id
 * `page.<pageKey>`, holding an ordered `sections[]` array.
 *
 *   GET             -> list pages (key, title, section count)
 *   GET ?key=<key>  -> single page doc (sections included) for the builder
 *   POST            -> createOrReplace a page; { publish:true } fires a Vercel rebuild
 *   DELETE ?key=    -> delete the page doc (its route reverts to the legacy hardcoded component)
 */

import {randomUUID} from 'node:crypto'

import {
  PAGE_KEYS,
  SECTION_TYPES,
  getWriteClient,
  guard,
  readJsonBody,
  triggerRebuild,
} from '../scripts/lib/adminApi.mjs'

const newKey = () => randomUUID().replace(/-/g, '').slice(0, 12)
const docId = (key) => `page.${key}`

export default async function handler(req, res) {
  if (!guard(req, res)) return
  try {
    if (req.method === 'GET') return await handleGet(req, res)
    if (req.method === 'POST') return await handlePost(req, res)
    if (req.method === 'DELETE') return await handleDelete(req, res)
    res.setHeader('Allow', 'GET, POST, DELETE')
    return res.status(405).json({ok: false, error: 'method_not_allowed'})
  } catch (err) {
    console.error('[api/pages] error:', err.message)
    return res.status(500).json({ok: false, error: 'server_error', detail: err.message})
  }
}

async function handleGet(req, res) {
  const client = getWriteClient()
  const key = req.query?.key

  if (key) {
    const page = await client.fetch(`*[_id == $id][0]{ "pageKey": pageKey, title, sections }`, {id: docId(key)})
    return res.status(200).json({
      ok: true,
      page: page || {pageKey: key, title: '', sections: []},
      exists: Boolean(page),
    })
  }

  const rows = await client.fetch(
    `*[_type == "page"]{ "pageKey": pageKey, title, "sectionCount": count(sections) }`,
  )
  const byKey = new Map(rows.map((r) => [r.pageKey, r]))
  // Always return the full catalogue of editable pages, even those not yet created in Sanity.
  const pages = PAGE_KEYS.map((k) => byKey.get(k) || {pageKey: k, title: '', sectionCount: 0})
  return res.status(200).json({ok: true, pages})
}

async function handlePost(req, res) {
  const body = readJsonBody(req)
  const errors = validate(body)
  if (errors.length) {
    return res.status(400).json({ok: false, error: 'validation_failed', fields: errors})
  }

  const client = getWriteClient()
  const id = docId(body.pageKey)

  // The section builder doesn't edit SEO, so preserve any existing `seo` across a save
  // (createOrReplace would otherwise drop it) unless the request explicitly provides one.
  let seo = body.seo
  if (seo === undefined) {
    const existing = await client.fetch(`*[_id == $id][0]{seo}`, {id})
    seo = existing?.seo
  }

  const doc = {
    _id: id,
    _type: 'page',
    pageKey: body.pageKey,
    title: String(body.title || body.pageKey).trim(),
    sections: ensureKeys(body.sections),
    ...(seo ? {seo} : {}),
  }
  const saved = await client.createOrReplace(doc)
  const rebuildTriggered = body.publish ? await triggerRebuild() : false
  return res.status(200).json({ok: true, id: saved._id, rebuildTriggered})
}

async function handleDelete(req, res) {
  const key = req.query?.key
  if (!PAGE_KEYS.includes(key)) return res.status(400).json({ok: false, error: 'invalid_key'})
  await getWriteClient().delete(docId(key))
  const rebuildTriggered = await triggerRebuild()
  return res.status(200).json({ok: true, rebuildTriggered})
}

// --- validation & helpers -------------------------------------------------

function validate(body) {
  const errors = []
  if (!PAGE_KEYS.includes(body.pageKey)) errors.push('pageKey')
  if (!Array.isArray(body.sections)) {
    errors.push('sections')
  } else if (body.sections.some((s) => !s || !SECTION_TYPES.includes(s._type))) {
    errors.push('sectionType')
  }
  return errors
}

/**
 * Defensively ensure every section and every Portable Text block/span/markDef inside a
 * section body carries a unique `_key` (Sanity requires keys in arrays). Client generates
 * them, but never trust client input.
 */
function ensureKeys(sections) {
  if (!Array.isArray(sections)) return []
  return sections.map((section) => {
    const s = {...section, _key: section._key || newKey()}
    if (Array.isArray(s.body)) s.body = ensureBlockKeys(s.body)
    return s
  })
}

function ensureBlockKeys(blocks) {
  return blocks.map((block) => {
    const b = {...block, _key: block._key || newKey()}
    if (Array.isArray(b.markDefs)) b.markDefs = b.markDefs.map((d) => ({...d, _key: d._key || newKey()}))
    if (Array.isArray(b.children)) b.children = b.children.map((c) => ({...c, _key: c._key || newKey()}))
    return b
  })
}
