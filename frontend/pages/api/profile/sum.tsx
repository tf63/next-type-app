import { ProfileSumAPIResponse, ProfileSumAPIRequest } from '@/interfaces/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { PostgrestError } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const body: ProfileSumAPIRequest = req.body

    const { data, error } = await supabase.rpc('get_user_log_summary', { user_id_input: body.userId }).select(`*`)

    if (error != null) {
        res.status(503).json({ error: error })
    } else {
        res.status(200).json(data)
    }
}
