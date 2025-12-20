import { prisma } from '../../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
    const { personId, level, status, description, traitId } = await readBody(event);

    const createSkill = await prisma.skill.create({
        data: {
            level,
            status,
            description,
            traitId: parseInt(traitId, 10),
            personId: parseInt(personId, 10),
        }
    })
    .catch((error) => {
        console.error(error);
    });

    return createSkill;
    //@to-do skill should only be created when personId & traitId pair exist
});