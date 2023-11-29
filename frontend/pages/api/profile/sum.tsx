import { ProfileSumAPIResponse, ProfileSumAPIRequest } from '@/interfaces/interfaces'
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { PostgrestError } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const body: ProfileSumAPIRequest = req.body

    // type a = {
    //     month: string
    //     correct: number
    //     miss: number
    //     speed: number
    // }
    // type ResponseObject = {
    //     data: a | null
    //     error: PostgrestError | null
    // }
    const { data, error } = await supabase.rpc('get_user_log_summary', { user_id_input: body.userId }).select(`*`)

    if (error) {
        res.status(200).json([])
    } else {
        res.status(200).json(data)
    }
}