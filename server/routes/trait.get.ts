import { prisma } from '../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    const traits = await prisma.trait.findMany({
    })
    .catch((error) => {
        console.error(error);
    });

    return traits;
});
