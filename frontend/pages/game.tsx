import React from 'react'
import TypeSystem from '@/components/TypeSystem'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Category, GameData, SelectData } from '@/types/types'
import { CustomNextPage } from '@/types/custom-next-page'
import TypeBoard from '@/components/TypeBoard'
import { useGameStore } from '@/states/Game'
import { useSession } from 'next-auth/react'
import { getMissPerType } from '@/lib/format'

const Game: CustomNextPage = () => {
    const router = useRouter()
    const { data, status } = useSession()

    const problemId = useGameStore((state) => state.problemId)
    const category = useGameStore((state) => state.category)
    const setContent = useGameStore((state) => state.setContent)
    const correct = useGameStore((state) => state.correct)
    const miss = useGameStore((state) => state.miss)
    const time = useGameStore((state) => state.time)
    const correctTypes = useGameStore((state) => state.correctTypes)
    const missTypes = useGameStore((state) => state.missTypes)
    const incrementTime = useGameStore((state) => state.incrementTime)
    const postMonthLog = useGameStore((status) => status.postMonthLog)

    useEffect(() => {
        if (router.query.state == null) {
            return
        }

        const selectData: SelectData = JSON.parse(router.query.state as string)
        const category = selectData.category
        let requestBody: any
        switch (selectData.category) {
            case 'language':
                requestBody = { language_id: selectData.languageId, size: selectData.size }
                break
            case 'framework':
                requestBody = { framework_id: selectData.frameworkId, size: selectData.size }
                break
            case 'algorithm':
                requestBody = {
                    language_id: selectData.languageId,
                    algorithm_id: selectData.algorithmId,
                    size: selectData.size
                }
                break
            case 'pattern':
                requestBody = {
                    language_id: selectData.languageId,
                    pattern_id: selectData.patternId,
                    size: selectData.size
                }
                break
            default:
                return
        }

        setContent(category as Category, requestBody)
    }, [])

    useEffect(() => {
        const timerId = setInterval(() => {
            incrementTime()
        }, 1000)

        return () => clearInterval(timerId)
    }, [time])

    const navigateEvent = () => {
        if (status === 'authenticated') {
            postMonthLog(data?.user?.name!)
        }

        const resultState: GameData = {
            category: category as Category,
            problemId: problemId,
            correct: correct,
            miss: miss,
            timer: time,
            missPerType: getMissPerType(correctTypes, missTypes)
        }

        router.push({
            pathname: '/result',
            query: { state: JSON.stringify(resultState) }
        })
    }

    return (
        <main>
            <TypeSystem navigateEvent={navigateEvent}>
                <TypeBoard />
            </TypeSystem>
            {`correct: ${correct}, miss: ${miss}, time: ${time}`}
        </main>
    )
}

export default Game
