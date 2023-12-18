import { NextApiRequest, NextApiResponse } from 'next'

const patterns = [
    { name: 'abstract_factor', pattern_id: 1 },
    { name: 'builder', pattern_id: 2 },
    { name: 'factory_method', pattern_id: 3 },
    { name: 'prototype', pattern_id: 4 },
    { name: 'singleton', pattern_id: 5 },
    { name: 'adapter', pattern_id: 6 },
    { name: 'bridge', pattern_id: 7 },
    { name: 'composite', pattern_id: 8 },
    { name: 'decorator', pattern_id: 9 },
    { name: 'facade', pattern_id: 10 },
    { name: 'flyweight', pattern_id: 11 },
    { name: 'proxy', pattern_id: 12 },
    { name: 'chain_of_responsibility', pattern_id: 13 },
    { name: 'command', pattern_id: 14 },
    { name: 'interpreter', pattern_id: 15 },
    { name: 'iterator', pattern_id: 16 },
    { name: 'mediator', pattern_id: 17 },
    { name: 'momento', pattern_id: 18 },
    { name: 'observer', pattern_id: 19 },
    { name: 'state', pattern_id: 20 },
    { name: 'template_method', pattern_id: 21 },
    { name: 'strategy', pattern_id: 22 },
    { name: 'visitor', pattern_id: 23 }
]

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(patterns)
}
