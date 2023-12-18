import { NextApiRequest, NextApiResponse } from 'next'

const languages = [
    { name: 'python', language_id: 1 },
    { name: 'go', language_id: 2 },
    { name: 'typescript', language_id: 3 },
    { name: 'javascript', language_id: 4 },
    { name: 'c', language_id: 5 },
    { name: 'c++', language_id: 6 },
    { name: 'c#', language_id: 7 },
    { name: 'php', language_id: 8 },
    { name: 'kotlin', language_id: 9 },
    { name: 'swift', language_id: 10 },
    { name: 'java', language_id: 11 },
    { name: 'ruby', language_id: 12 },
    { name: 'haskell', language_id: 13 },
    { name: 'rust', language_id: 14 },
    { name: 'dart', language_id: 15 },
    { name: 'elixir', language_id: 16 },
    { name: 'elm', language_id: 17 },
    { name: 'julia', language_id: 18 }
]

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(languages)
}
