import jwt from 'jsonwebtoken'
import { prisma } from '../../../prisma/db'

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization')
  if (!authHeader) throw createError({ statusCode: 401, statusMessage: 'no auth header Unauthorized' })
  if (!authHeader.startsWith('Bearer ')) throw createError({ statusCode: 401, statusMessage: 'no bearer Unauthorized' })

  console.log('Auth Header:', authHeader)
  const token = authHeader.split(' ')[1]
  console.log('Token:', token)
  try {
    const decoded = jwt.verify(token, useRuntimeConfig().jwtSecret) as {
      userId: string
      email: string
      name: string
    }
    console.log('Decoded Token:', decoded)
    // 3. Option B: Fetch fresh from Prisma (recommended)
    const userId = Number(decoded.userId)
    if (Number.isNaN(userId)) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid user id in token' })
    }
    const user = await prisma.person.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, roles: true }  // NO password!
    })

    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'User not found' })
    }

    // ✅ NuxtAuth expects exactly this shape
    return { 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles
        // Add roles, avatar, etc. as needed
      }
    }
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }
})
