import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prisma } from '../../../prisma/db'
interface Credentials {
  email: string
  password: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Credentials>(event)
  const { email, password } = body

 if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    })
  }

   // Fetch user without password
  const person = await prisma.person.findUnique({
    where: { email: email.toLowerCase().trim() },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,  // temporarily for verification
    },
  })

  if (!person) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

 // Verify password
  const validPassword =  bcrypt.compare(password, person.password)
  if (!validPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
    })
  }

  // Create JWT payload (no password)
  const payload = {
    userId: person.id,
    email: person.email,
    name: person.name,
  }

  const token = jwt.sign(payload, useRuntimeConfig().jwtSecret, {
    expiresIn: '7d',
  })

  // Response format NuxtAuth expects: token at /token path
  return {
    token: `${token}`,
    user: {
      id: person.id,
      email: person.email,
      name: person.name,
    },
  }
})
