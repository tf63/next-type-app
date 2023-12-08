import { ProfileMonthAPIRequest } from '@/interfaces/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const body: ProfileMonthAPIRequest = req.body

    let numLogs = 0
    {
        const { data, error } = await supabase.rpc('count_user_log_miss_prev_per_type', { user_id_input: body.userId })
        if (data != null) {
            numLogs = data
        }
        if (error != null) {
            res.status(503).json({ error: error })
            return
        }
    }

    if (numLogs === 1) {
        const { data, error } = await supabase.rpc('update_miss_prev_per_type', {
            vec: body.missPrevPerType,
            user_id_input: body.userId
        })
        if (error != null) {
            res.status(503).json({ error: error })
            return
        }
        console.log('update', body.missPrevPerType)
    } else {
        const { data, error } = await supabase.from('user_log_miss_prev_per_type').insert({
            user_id: body.userId,
            miss_prev_per_type: body.missPrevPerType
        })
        if (error != null) {
            res.status(503).json({ error: error })
            return
        }
        console.log('insert', body.missPrevPerType)
    }

    res.status(200).json({ data: {} })
}
