import { NextApiRequest, NextApiResponse } from 'next'

const algorithms = [
    { algorithm_id: 1, name: 'dfs' },
    { algorithm_id: 2, name: 'bfs' },
    { algorithm_id: 3, name: 'dp' },
    { algorithm_id: 4, name: 'binary_search' },
    { algorithm_id: 5, name: 'union_find' },
    { algorithm_id: 6, name: 'bubble_sort' },
    { algorithm_id: 7, name: 'quick_sort' },
    { algorithm_id: 8, name: 'merge_sort' },
    { algorithm_id: 9, name: 'selection_sort' },
    { algorithm_id: 10, name: 'insertion_sort' },
    { algorithm_id: 11, name: 'heap_sort' },
    { algorithm_id: 12, name: 'stack' },
    { algorithm_id: 13, name: 'queue' },
    { algorithm_id: 14, name: 'gcd' },
    { algorithm_id: 15, name: 'prime_factorization' }
]

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(algorithms)
}
