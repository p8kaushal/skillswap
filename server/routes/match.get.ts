import { get } from 'http';
import { prisma } from '../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const { idA, idB, status } = query;
    console.log("Fetching matches with params:", { idA, idB });

    const matches = await prisma.match.findMany({
        where: {
            //@ts-ignore
            personAId: idA ? parseInt(idA) : undefined,
            //@ts-ignore
            personBId: idB ? parseInt(idB) : undefined,
            status: status ? String(status) : undefined,
        },
        include: {
            personA: true,
            personB: true,
            skillA: {
                include: {
                    trait: true
                }
            },
            skillB: {
                include: {
                    trait: true
                }
            },
            sessions: true
        }
    })
    .catch((error) => {
        console.error(error);
    });

    return matches;
});
