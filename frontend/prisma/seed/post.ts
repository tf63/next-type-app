import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const post = async () => {
    await prisma.post.createMany({
        data: Array(60)
            .fill(0)
            .map((v, i) => ({
                title: 'post' + i.toString(),
                content: i.toString()
            }))
    })
}
