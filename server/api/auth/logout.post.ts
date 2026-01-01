export default defineEventHandler(async (event) => {
  // 1. Extract the token from the Authorization header
  const authHeader = getHeader(event, 'Authorization')
  
  if (!authHeader) {
    // If there's no token, the user is technically already "logged out"
    return { status: 'success', message: 'No active session found' }
  }
console.log('Auth Header:', authHeader)
  const token = authHeader.split(' ')[1]

  try {
    /**
     * 2. Invalidation Logic
     * Depending on your auth strategy:
     * - JWT: Add the token to a Redis blacklist until its 'exp' time.
     * - Database Sessions: Delete the session record from your 'sessions' table.
     */
    // await myAuthService.invalidateToken(token)

    // 3. Clear any server-side cookies if used (optional for Local Provider)
    deleteCookie(event, 'auth.token')

    return {
      status: 'success',
      message: 'Logged out successfully'
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Logout failed',
    })
  }
})
