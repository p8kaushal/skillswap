import { prisma } from '../../../prisma/db'

export default defineEventHandler(async (event) => {
    const { personAId, personBId, skillAId, skillBId, status} = await readBody(event);

    if (!personAId || !personBId || !skillAId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'person and skill id are required',
    })
  }

    const createMatch = await prisma.match.create({
        data: {
            personAId,
            personBId,
            skillAId,
            skillBId,
            status
        }
    })
    .catch((error) => {
        console.error(error);
    });

    return createMatch;
});

//@to-do actual invitation should be sent through email or notification system