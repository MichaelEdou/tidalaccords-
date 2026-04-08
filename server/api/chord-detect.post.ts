export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { audioUrl, audioId, videoId } = body

  const vid = videoId || audioId?.replace('yt-', '') || ''
  if (!vid) {
    throw createError({ statusCode: 400, message: 'videoId required' })
  }

  // Try local pipeline server first (port 5200), fall back to Contabo VPS
  const localUrl = 'http://localhost:5200'
  const remoteUrl = config.chordApiUrl || 'http://62.169.29.146:5100'

  try {
    // Try local pipeline
    const response = await $fetch(`${localUrl}/song/${vid}`, {
      timeout: 5000,
    })
    return response
  } catch {
    // Local not available, try remote
    try {
      const response = await $fetch(`${remoteUrl}/detect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': config.chordApiKey || '',
        },
        body: { audioUrl: audioUrl || `https://www.youtube.com/watch?v=${vid}`, audioId: `yt-${vid}` },
        timeout: 10000,
      })
      return response
    } catch (err: any) {
      return { status: 'not_processed', videoId: vid, message: 'Song not yet processed. Run the pipeline.' }
    }
  }
})
