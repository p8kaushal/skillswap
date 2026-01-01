import jwt from 'jsonwebtoken'
import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // Mock users
  const users = [{ email: 'user@example.com', password: 'password123', name: 'Demo User' }]
  const user = users.find(u => u.email === email && u.password === password)

  if (!user) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })

  const token = jwt.sign({ userId: user.email }, useRuntimeConfig().jwtSecret, { expiresIn: '1h' })
  return { token: `${token}`, user: { name: user.name, email: user.email } }
})
