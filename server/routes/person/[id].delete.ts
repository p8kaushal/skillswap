import { prisma } from '../../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    const id = event.context.params.id;

    const deletePerson = await prisma.person.delete({
        where: {
            //@ts-ignore
            id: parseInt(id)
        }
    }) 
    .catch((error) => {
        console.error(error);
    });

    return deletePerson;
});