import { prisma } from '../../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    const { context: { params: { id } } } = event;
   
    const getTrait = await prisma.trait.findUnique({
        where: {
            //@ts-ignore
            id: parseInt(id) 
        },
        } 
    )
    .catch((error) => {
        console.error(error);
    });

    return getTrait;
});