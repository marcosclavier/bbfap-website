import {useEffect, useState} from 'react'
import baked from '../data/videos.generated.json'

export function useVideos() {
  const [videos, setVideos] = useState(baked)

  useEffect(() => {
    let cancelled = false
    fetch('/api/videos')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data && Array.isArray(data.videos) && data.videos.length > 0) {
          setVideos(data.videos)
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return videos
}
