// server/api/protected.get.ts
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  // 1. DO NOT use getServerSession(event) with local provider
  
  // 2. Extract token from the Authorization header
  const authHeader = getHeader(event, 'Authorization')
  console.log('Auth Header:', authHeader)
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: No token provided'
    })
  }

  const token = authHeader.split(' ')[1]
  console.log('Token:', token)

  try {
    // 3. Manually verify your JWT (e.g., using jsonwebtoken library)
    const decoded = jwt.verify(token, useRuntimeConfig().jwtSecret) as {
      userId: string
      email: string
      name: string
    }
    console.log('Decoded Token:', decoded)
    
    // For now, return the data if validation passes
    return {
      message: 'Secure data accessed successfully',
      user: decoded
    }
  } catch (error) {
    console.error('Token verification failed:', error)
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Invalid or expired token'
    })
  }
})
