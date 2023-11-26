import type { NextPage } from 'next'
import Card from '@/components/Card'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ResultState } from '@/types/types'
import { CustomNextPage } from '@/types/custom-next-page'
import NavigateButton from '@/components/NavigateButton'

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
            <NavigateButton href="/">Home</NavigateButton>
        </main>
    )
}

export default Result
