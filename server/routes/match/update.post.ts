import { prisma } from '../../../prisma/db'

export default defineEventHandler(async (event) => {
    const body = await readBody<any>(event)
    const { id, status } = body

    if (!id) {
        throw createError({ statusCode: 400, statusMessage: 'id is required' })
    }

    const updatedMatch = await prisma.match.update({
        where: {
            id: Number(id),
        },
        data: {
            status: status as string,
        },
    })

    if (!updatedMatch) {
        throw createError({ statusCode: 404, statusMessage: 'Match not found' })
    }
    else
        console.log("Updated match:", updatedMatch)
    if (status === 'ACCEPTED') {
        console.log(`Match ${id} accepted. You can trigger further actions here.`)
        //create seesion
        const session = await prisma.session.create({
            data: {
                matchId: updatedMatch.id,
                title: `Session for Match ${updatedMatch.id}`,
                url: generateMeetingUrl(),
                scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // scheduled for 24 hours later
                duration: 60,
                status: 'scheduled',
            },
        })
        console.log("Created session for accepted match:", session)
    }

    return updatedMatch
})

// server/utils/meeting.ts
export const generateMeetingUrl = () => {
    const id = Math.random().toString(36).slice(2, 10)
    return `https://meet.google.com/${id}` // replace with real Zoom/Meet later
}
