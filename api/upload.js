/**
 * POST /api/upload — upload a hero image to Sanity's asset store for the blog editor.
 *
 * Gated by the same ADMIN_PASSWORD as /api/posts. The browser downscales/encodes the
 * image first (see src/pages/AdminPage.jsx) so the base64 payload stays well under
 * Vercel's ~4.5 MB request-body limit.
 *
 * Body: { filename, contentType, dataBase64 }  (dataBase64 may be a bare base64 string
 *        or a full "data:<type>;base64,<...>" data URL).
 * Returns: { ok, assetId, url }
 */

import {Buffer} from 'node:buffer'

import {getImageBuilder, getWriteClient, guard, readJsonBody} from '../scripts/lib/adminApi.mjs'

const MAX_BYTES = 4 * 1024 * 1024 // keep under Vercel's body limit

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ok: false, error: 'method_not_allowed'})
  }
  if (!guard(req, res)) return

  try {
    const body = readJsonBody(req)
    const {filename, contentType} = body
    let dataBase64 = body.dataBase64

    if (typeof dataBase64 !== 'string' || !dataBase64) {
      return res.status(400).json({ok: false, error: 'missing_image'})
    }
    // Accept a full data URL or a bare base64 string.
    const comma = dataBase64.indexOf(',')
    if (dataBase64.startsWith('data:') && comma !== -1) {
      dataBase64 = dataBase64.slice(comma + 1)
    }

    const buffer = Buffer.from(dataBase64, 'base64')
    if (buffer.length === 0) {
      return res.status(400).json({ok: false, error: 'invalid_image'})
    }
    if (buffer.length > MAX_BYTES) {
      return res.status(413).json({ok: false, error: 'image_too_large'})
    }

    const asset = await getWriteClient().assets.upload('image', buffer, {
      filename: filename || 'hero-image',
      contentType: contentType || 'image/jpeg',
    })

    const url = getImageBuilder().image(asset).width(800).auto('format').url()
    return res.status(200).json({ok: true, assetId: asset._id, url})
  } catch (err) {
    console.error('[api/upload] error:', err.message)
    return res.status(500).json({ok: false, error: 'upload_failed', detail: err.message})
  }
}
