import type { NextPage } from 'next'
import Card from '@/components/Card'
import { LinkedButton } from '@/components/LinkedButton'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ResultState } from '@/types/types'
import { CustomNextPage } from '@/types/custom-next-page'

const Result: CustomNextPage = () => {
    const router = useRouter()
    const [resultState, setResultState] = useState<ResultState>({ correct: 0, miss: 0, timer: 0 })

    useEffect(() => {
        if (router.query.state) {
            const state: ResultState = JSON.parse(router.query.state as string)
            setResultState(state)
        }
    }, [])
    return (
        <main>
            <Card>{`correct: ${resultState.correct}, miss: ${resultState.miss}, time: ${resultState.timer}`}</Card>
            <Card>{`acc: ${((100 * resultState.correct) / (resultState.correct + resultState.miss)).toFixed(
                2
            )} %, speed: ${(resultState.correct / (resultState.timer + 0.000001)).toFixed(2)} /s.`}</Card>
            <LinkedButton href="/" text="Home" color="blue" />
        </main>
    )
}

export default Result
