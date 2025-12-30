import { prisma } from '../../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    console.log("Fetching person by ID");
    const { context: { params: { id } } } = event;

    const getPerson = await prisma.person.findUnique({
        where: {
            //@ts-ignore
            id: parseInt(id)
        },
        include: {
            skills: {
                include: {
                    trait: true
                }
            }
        }
    })
        .catch((error) => {
            console.error(error);
        });

    console.log("Fetched person:", getPerson);
    return getPerson;
});