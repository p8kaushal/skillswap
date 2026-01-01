import { getServerSession } from '#auth'

export default eventHandler(async (event) => {
  const session = await getServerSession(event)

  if (!session) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthenticated'
    })
  }

  return {
    message: 'This is sensitive data from the server',
    user: session.user
  }
})
