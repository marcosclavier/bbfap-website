/**
 * Shared server-side helpers for the self-serve blog editor API routes
 * (api/posts.js, api/upload.js).
 *
 * SECURITY: everything in this module runs ONLY inside Vercel serverless functions.
 * It reads SANITY_API_TOKEN and ADMIN_PASSWORD from process.env — neither is ever
 * prefixed VITE_ nor imported into client code, so they never reach the browser.
 */

import {Buffer} from 'node:buffer'
import {timingSafeEqual} from 'node:crypto'

import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.VITE_SANITY_PROJECT_ID
export const dataset = process.env.VITE_SANITY_DATASET || 'production'
export const sanityConfigured =
  Boolean(projectId) && projectId !== 'REPLACE_WITH_PROJECT_ID'

// Expected admin username. Not a secret (it's an email), so a hardcoded default is fine;
// overridable via ADMIN_USERNAME without a code change.
export const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || 'fbabeux@peakgroup.com').trim().toLowerCase()

// Marketing pages editable through the /admin section builder. Keys map to routes and to
// the deterministic Sanity doc _id `page.<key>`. Mirror studio/schemas/page.ts.
export const PAGE_KEYS = [
  'home',
  'about',
  'services',
  'contact',
  'conseiller-rive-sud',
  'conseiller-montreal',
]

// Section object _type values the builder understands. Mirror src/sections/registry.js
// and studio/schemas/page.ts.
export const SECTION_TYPES = [
  'heroSection',
  'proseSection',
  'splitProseSection',
  'listSection',
  'ctaSection',
  'approachSection',
  'serviceDetailSection',
  'homeHeroSection',
  'servicesSection',
  'featureGridSection',
  'contactFormSection',
  'mapSection',
  'servicesGridSection',
  'areasSection',
  'statsBandSection',
]

// Categories must mirror studio/schemas/blogPost.ts exactly.
export const CATEGORIES = [
  'Placements',
  'Fiscalité',
  'Impôts',
  'Assurances',
  'Conseils',
  'Planification Successorale',
]

let _client = null
let _imageBuilder = null

/** Sanity client with write access (token). useCdn:false so reads are fresh. */
export function getWriteClient() {
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion: '2024-09-01',
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    })
  }
  return _client
}

export function getImageBuilder() {
  if (!_imageBuilder) _imageBuilder = imageUrlBuilder({projectId, dataset})
  return _imageBuilder
}

/**
 * Validate the admin credentials from the `x-admin-username` / `x-admin-password`
 * headers. The username must match ADMIN_USERNAME (case-insensitive); the password is
 * compared against ADMIN_PASSWORD in constant time. Returns true only if both match.
 */
export function isAuthorized(req) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false

  const providedUser = req.headers['x-admin-username']
  const suppliedUser = Array.isArray(providedUser) ? providedUser[0] : providedUser
  if (typeof suppliedUser !== 'string' || suppliedUser.trim().toLowerCase() !== ADMIN_USERNAME) {
    return false
  }

  const provided = req.headers['x-admin-password']
  const supplied = Array.isArray(provided) ? provided[0] : provided
  if (typeof supplied !== 'string' || supplied.length === 0) return false

  const a = Buffer.from(supplied)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

/**
 * Guard helper. Returns true if the request may proceed; otherwise writes the
 * appropriate error response (500 if misconfigured, 401 if unauthorized) and
 * returns false.
 */
export function guard(req, res) {
  if (!sanityConfigured) {
    res.status(500).json({ok: false, error: 'sanity_not_configured'})
    return false
  }
  if (!process.env.SANITY_API_TOKEN) {
    res.status(500).json({ok: false, error: 'token_not_configured'})
    return false
  }
  if (!process.env.ADMIN_PASSWORD) {
    res.status(500).json({ok: false, error: 'admin_password_not_configured'})
    return false
  }
  if (!isAuthorized(req)) {
    res.status(401).json({ok: false, error: 'unauthorized'})
    return false
  }
  return true
}

/** Parse a JSON request body whether Vercel delivered it as object or string. */
export function readJsonBody(req) {
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }
  return body && typeof body === 'object' ? body : {}
}

/**
 * Best-effort trigger of a Vercel deploy hook so the static site rebuilds and
 * re-fetches posts from Sanity. Never throws; returns whether a rebuild started.
 */
export async function triggerRebuild() {
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL
  if (!hook) return false
  try {
    const res = await fetch(hook, {method: 'POST'})
    return res.ok
  } catch (err) {
    console.error('[adminApi] deploy hook failed:', err.message)
    return false
  }
}
