import { prisma } from '../../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
    const { name, email, phone, address, url, description, status} = await readBody(event);

    const createPerson = await prisma.person.create({
        data: {
            name,
            email,
            phone,
            address,
            url,
            status,
            description,
        }
    })
    .catch((error) => {
        console.error(error);
    });

    return createPerson;
});