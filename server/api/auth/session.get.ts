import jwt from 'jsonwebtoken'
import { defineEventHandler, createError, getHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization')
  if (!authHeader) throw createError({ statusCode: 401, statusMessage: 'no auth header Unauthorized' })
  if (!authHeader.startsWith('Bearer ')) throw createError({ statusCode: 401, statusMessage: 'no bearer Unauthorized' })

  console.log('Auth Header:', authHeader)
  const token = authHeader.split(' ')[1]
  console.log('Token:', token)
  try {
    const decoded = jwt.verify(token, useRuntimeConfig().jwtSecret) as any
    console.log('Decoded Token:', decoded)
    return { user: { email: decoded.userId, name: 'Demo User' } }  // Fetch from DB in real app
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }
})
