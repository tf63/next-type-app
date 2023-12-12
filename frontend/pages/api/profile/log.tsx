import { ProfileLogAPIRequest, ProfileLogAPIResponse } from '@/interfaces/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { PostgrestError } from '@supabase/supabase-js'

type ResponseObject = {
    data: ProfileLogAPIResponse[] | null
    error: PostgrestError | null
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const body: ProfileLogAPIRequest = req.body

    const { data, error }: ResponseObject = await supabase
        .from('user_log_problem')
        .select('created_at, category_id, problem_id, correct, miss, speed')
        .order('created_at', { ascending: false })
        .eq('user_id', body.userId)
        .range(body.offset, body.offset + body.num - 1)

    if (error != null) {
        res.status(503).json({ error: error })
    } else {
        res.status(200).json(data)
    }
}
