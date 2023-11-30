import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { data, error } = await supabase.from('language').select()
    console.log(error)
    res.status(200).json(data)
}
