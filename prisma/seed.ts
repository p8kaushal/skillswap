import 'dotenv/config'
import { PrismaClient } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const personData = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    status: 'ACTIVE',
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    status: 'ACTIVE',
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    status: 'INACTIVE',
  },
]

const traitData = [
  {
    name: 'JavaScript',
  },
  {
    name: 'TypeScript',
  },
  {
    name: 'GraphQL',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of personData) {
    const person = await prisma.person.create({
      data: u,
    })
    console.log(`Created person with id: ${person.id}`)
  }
  for (const t of traitData) {
    const trait = await prisma.trait.create({
      data: t,
    })
    console.log(`Created trait with id: ${trait.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
