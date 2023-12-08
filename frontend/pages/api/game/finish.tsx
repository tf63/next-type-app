import { GameFinishAPIRequest } from '@/interfaces/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { PostgrestSingleResponse } from '@supabase/supabase-js'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const body: GameFinishAPIRequest = req.body

    let category_id: number
    switch (body.category) {
        case 'language':
            category_id = 1
            break
        case 'framework':
            category_id = 2
            break
        case 'algorithm':
            category_id = 3
            break
        case 'pattern':
            category_id = 4
            break
    }
    const speed = body.correct / (body.timer + 0.000001)
    const now = new Date()
    const nowISO = now.toISOString()

    let error: PostgrestSingleResponse<null>
    error = await supabase.from('user_log_problem').insert({
        user_id: body.userId,
        created_at: nowISO,
        category_id: category_id,
        problem_id: body.problemId,
        correct: body.correct,
        miss: body.miss,
        speed: speed
    })

    if (error.error != null) {
        console.log(error)
        res.status(503).json({ error: error })
        return
    }

    // トランザクションにしたい
    error = await supabase.from('user_log_miss_per_type').insert({
        user_id: body.userId,
        month: nowISO,
        miss_per_type: body.missPerType
    })
    if (error.error != null) {
        console.log(error)
        res.status(503).json({ error: error })
        return
    }

    res.status(200).json({})
}
