import prisma from '../../../lib/prisma'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const posts = await prisma.post.findMany()
    res.status(200).json(posts)
}
