import { prisma } from '../../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    const { context: { params: { id } } } = event;
   
    const getSkill = await prisma.skill.findUnique({
        where: {
            //@ts-ignore
            id: parseInt(id) 
        },
        include: { 
            person: true,
            trait: true
        } 
    })
    .catch((error) => {
        console.error(error);
    });

    return getSkill;
});