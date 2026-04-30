import {createClient} from '@sanity/client'

const projectId = import.meta.env?.VITE_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env?.VITE_SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production'

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-09-01',
      useCdn: true,
      perspective: 'published',
    })
  : null
