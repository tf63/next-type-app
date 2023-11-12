import { NextApiRequest, NextApiResponse } from 'next'

const posts = [
    { id: 1, title: 'First Post' },
    { id: 2, title: 'Second Post' },
    { id: 3, title: 'Third Post' }
]

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(posts)
}
