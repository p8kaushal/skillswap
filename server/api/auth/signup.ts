import { prisma } from '../../../prisma/db'
import bcrypt from 'bcrypt'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
    const { name, email, phone, address, url, description, status, password} = await readBody(event);

    if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required',
    })
  }

    const existing = await prisma.person.findUnique({ where: { email } })
  if (existing) {
    throw createError({
      statusCode: 409,
      statusMessage: 'User with this email already exists',
    })
  }

  const hashed = await bcrypt.hash(password, 10)

    const createPerson = await prisma.person.create({
        data: {
            name,
            email,
            phone,
            address,
            url,
            status,
            description,
            password: hashed
        }
    })
    .catch((error) => {
        console.error(error);
    });

    return createPerson;
});