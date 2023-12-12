import { ProfileSummaryAPIRequest, ProfileSummaryAPIResponse } from '@/interfaces/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { PostgrestError } from '@supabase/supabase-js'

type ResponseObject = {
    data: ProfileSummaryAPIResponse[] | null
    error: PostgrestError | null
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const body: ProfileSummaryAPIRequest = req.body

    const { data, error }: ResponseObject = await supabase
        .rpc('get_user_log_summary', { user_id_input: body.userId })
        .select(`*`)

    if (error != null) {
        res.status(503).json({ error: error })
    } else {
        res.status(200).json(data)
    }
}
