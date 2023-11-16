import { NextApiRequest, NextApiResponse } from 'next'

const algorithms = [
    { name: 'dfs', algorithm_id: 1 },
    { name: 'bfs', algorithm_id: 2 },
    { name: 'dp', algorithm_id: 3 },
    { name: 'binary_search', algorithm_id: 4 },
    { name: 'union_find', algorithm_id: 5 },
    { name: 'bubble_sort', algorithm_id: 6 },
    { name: 'quick_sort', algorithm_id: 7 },
    { name: 'merge_sort', algorithm_id: 8 },
    { name: 'selection_sort', algorithm_id: 9 },
    { name: 'insertion_sort', algorithm_id: 10 },
    { name: 'heap_sort', algorithm_id: 11 },
    { name: 'stack', algorithm_id: 12 },
    { name: 'queue', algorithm_id: 13 },
    { name: 'gcd', algorithm_id: 14 },
    { name: 'prime_factorization', algorithm_id: 15 }
]

export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(algorithms)
}
