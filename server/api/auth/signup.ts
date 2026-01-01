// Similar to signin, but add new user to mock array (in-memory, resets on restart)
import jwt from 'jsonwebtoken'
import { defineEventHandler, readBody, createError, getHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password, name } = body
  // Mock - in real app, use DB
  const token = jwt.sign({ userId: email }, useRuntimeConfig().jwtSecret, { expiresIn: '1h' })
  return { token: `Bearer ${token}`, user: { name, email } }
})
