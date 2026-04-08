export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { audioUrl, audioId } = body

  if (!audioUrl || !audioId) {
    throw createError({ statusCode: 400, message: 'audioUrl and audioId are required' })
  }

  const response = await $fetch(`${config.chordApiUrl}/detect`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': config.chordApiKey,
    },
    body: { audioUrl, audioId },
  })

  return response
})
