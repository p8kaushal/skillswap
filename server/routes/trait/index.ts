import { prisma } from '../../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
    const { name, description } = await readBody(event);

    const createTrait = await prisma.trait.create({
        data: {
            name,
            description,
        }
    })
    .catch((error) => {
        console.error(error);
    });

    return createTrait;
});