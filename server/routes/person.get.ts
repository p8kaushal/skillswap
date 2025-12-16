import { prisma } from '../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    const persons = await prisma.person.findMany({
    })
    .catch((error) => {
        console.error(error);
    });

    return persons;
});
