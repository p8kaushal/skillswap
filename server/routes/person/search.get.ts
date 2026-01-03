import { prisma } from '../../../prisma/db'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const rawTrait = query.trait
    let trait = ''

    if (typeof rawTrait === 'string') {
        trait = rawTrait.trim()
    } else if (Array.isArray(rawTrait) && rawTrait.length) {
        trait = String(rawTrait[0]).trim()
    } else if (rawTrait != null) {
        trait = String(rawTrait).trim()
    }

    console.log('Searching for persons with trait:', trait)
    if (!trait) return []

    return prisma.person.findMany({
        where: {
            skills: {
                some: {
                    trait: {
                        name: {
                            equals: trait,
                            mode: 'insensitive'
                        }
                    }
                }
            },
        },
        select: {
            id: true,
            name: true,
            email: true,
            skills: {
                select: {
                    id: true,
                    trait: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        },
        take: 50
    })
})
