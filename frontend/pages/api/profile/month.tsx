import { ProfileMonthAPIRequest, ProfileMonthAPIResponse } from '@/interfaces/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { PostgrestError } from '@supabase/supabase-js'

type ResponseObject = {
    data: ProfileMonthAPIResponse[] | null
    error: PostgrestError | null
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const body: ProfileMonthAPIRequest = req.body

    const { data, error }: ResponseObject = await supabase
        .from('user_log_miss_prev_per_type')
        .select('month, miss_prev_per_type')
        .order('month', { ascending: false })
        .eq('user_id', body.userId)
        .range(body.offset, body.offset + body.num - 1)

    if (error != null) {
        res.status(503).json({ error: error })
    } else {
        res.status(200).json(data)
    }
}
