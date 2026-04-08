export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const audioId = query.audioId as string

  if (!audioId) {
    throw createError({ statusCode: 400, message: 'audioId is required' })
  }

  // Poll the detect endpoint with the same audioId to check status/get results
  const response = await $fetch(`${config.chordApiUrl}/detect`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': config.chordApiKey,
    },
    body: { audioUrl: '', audioId },
  })

  return response
})
