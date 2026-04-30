#!/usr/bin/env node
/**
 * One-off: patch youtubeUrl on existing Sanity video documents.
 * Matches by title exactly. Idempotent — re-running just sets the same value.
 */

import {readFile, access} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {dirname, resolve} from 'node:path'
import {createClient} from '@sanity/client'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

await loadDotEnv(resolve(ROOT, '.env'))

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || !token) {
  console.error('Missing VITE_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN.')
  process.exit(1)
}

const client = createClient({projectId, dataset, apiVersion: '2024-09-01', useCdn: false, token})

const MAPPING = [
  {title: 'Le CELI, le plus beau cadeau pour vos héritiers?', url: 'https://www.youtube.com/watch?v=ZZQXa3f_Jmk'},
  {title: 'Tout investir au Canada — une bonne idée?', url: 'https://www.youtube.com/watch?v=HhLWwRFawys'},
  {title: 'Attention au risque de concentration!', url: 'https://www.youtube.com/watch?v=-dB9Z90bJhA'},
  {title: 'Investir par soi-même vs avec un conseiller', url: 'https://www.youtube.com/watch?v=s55jlOKr3fU'},
  {title: 'Votre tolérance au risque tue vos chances d’une retraite confortable', url: 'https://www.youtube.com/watch?v=C6pI3kCtthk'},
  {title: 'Assurance vie temporaire vs permanente — Laquelle choisir?', url: 'https://www.youtube.com/watch?v=ILNtQOFNP68'},
  {title: 'Convention d’actionnaires : essentielle pour votre entreprise', url: 'https://www.youtube.com/watch?v=uNpKE8h4iBE'},
  {title: 'Placer de l’argent dans une compagnie de gestion? Attention à cette erreur fatale', url: 'https://www.youtube.com/watch?v=51gsK1q-uGg'},
  {title: 'Gel Successoral : C’est quoi?', url: 'https://www.youtube.com/watch?v=gmx84xFkFMM'},
]

let updated = 0
let missing = 0

for (const {title, url} of MAPPING) {
  const id = await client.fetch(`*[_type == "video" && title == $title][0]._id`, {title})
  if (!id) {
    console.warn(`  ! no Sanity video matched title: ${title}`)
    missing++
    continue
  }
  await client.patch(id).set({youtubeUrl: url}).commit()
  console.log(`  ✓ ${title} → ${url}`)
  updated++
}

console.log(`[set-video-urls] Updated ${updated}/${MAPPING.length} videos. ${missing} unmatched.`)

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
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = value
  }
}
