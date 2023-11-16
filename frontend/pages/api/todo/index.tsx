import { NextApiRequest, NextApiResponse } from 'next'

const todos = [
    { id: 1, title: 'First Todo' },
    { id: 2, title: 'Second Todo' },
    { id: 3, title: 'Third Todo' }
]

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(todos)
}
