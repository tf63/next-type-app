import type { NextPage } from 'next'
import Card from '@/components/Card'
import { LinkedButton } from '@/components/LinkedButton'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ResultState } from '@/types/types'

const Result: NextPage = () => {
    const router = useRouter()
    const [resultState, setResultState] = useState<ResultState>({ correct: 0, miss: 0 })

    useEffect(() => {
        if (router.query.state) {
            const state: ResultState = JSON.parse(router.query.state as string)
            setResultState(state)
        }
    }, [])
    return (
        <main>
            <Card>{`correct: ${resultState.correct}, miss: ${resultState.miss}`}</Card>
            <LinkedButton href="/" text="Home" color="blue" />
        </main>
    )
}

export default Result
