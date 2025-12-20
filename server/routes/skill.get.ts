import { prisma } from '../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const skills = await prisma.skill.findMany({
        where: {
            personId: parseInt(query.id as string)
        },
        include: {
            person: true,
            trait: true
        }
    })
    .catch((error) => {
        console.error(error);
    });

    return skills;
});
