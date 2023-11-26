import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { post } from './post'

async function main() {
    await prisma.post.deleteMany()
    await post()
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
