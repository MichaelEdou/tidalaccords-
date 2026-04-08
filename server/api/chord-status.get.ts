export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const videoId = (query.videoId as string || '').replace('yt-', '')

  if (!videoId) {
    throw createError({ statusCode: 400, message: 'videoId required' })
  }

  // Try local pipeline server
  try {
    const response = await $fetch(`http://localhost:5200/song/${videoId}`, {
      timeout: 5000,
    })
    return response
  } catch {
    return { status: 'processing', videoId }
  }
})
