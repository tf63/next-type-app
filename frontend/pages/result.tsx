import type { NextPage } from 'next'
import Card from '@/components/Card'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ResultState } from '@/types/types'
import { CustomNextPage } from '@/types/custom-next-page'
import NavigateButton from '@/components/NavigateButton'
import { useSession } from 'next-auth/react'
import { GameFinishAPIRequest } from '@/interfaces/interfaces'
import axios from 'axios'
import FlexContainer from '@/components/FlexContainer'

const Result: CustomNextPage = () => {
    const router = useRouter()
    const { data, status } = useSession()
    const [posted, setPosted] = useState(false)
    const [resultState, setResultState] = useState<ResultState>({
        category: 'language',
        problemId: 0,
        correct: 0,
        miss: 0,
        timer: 0
    })

    useEffect(() => {
        if (router.query.state != null) {
            const state: ResultState = JSON.parse(router.query.state as string)
            setResultState(state)
        }
    }, [])

    useEffect(() => {
        if (resultState.problemId === 0 || posted) {
            console.log('return')
            return
        }

        const postData = async () => {
            const userLog: GameFinishAPIRequest = { userId: data?.user?.id!, ...resultState }
            const _ = await axios.post('/api/game/finish', userLog)
            setPosted(true)
        }

        if (status === 'authenticated') {
            postData()
        }
    }, [resultState])

    return (
        <main>
            <Card>{`correct: ${resultState.correct}, miss: ${resultState.miss}, time: ${resultState.timer}`}</Card>
            <Card>{`acc: ${((100 * resultState.correct) / (resultState.correct + resultState.miss)).toFixed(
                2
            )} %, speed: ${(resultState.correct / (resultState.timer + 0.000001)).toFixed(2)} /s.`}</Card>

            <NavigateButton href="/">Home</NavigateButton>
        </main>
    )
}

export default Result
