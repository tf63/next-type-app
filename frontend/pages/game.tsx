import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Category, GameData, SelectData } from '@/types/types'
import { CustomNextPage } from '@/types/custom-next-page'
import { useGameStore } from '@/states/Game'
import { getMissPerType } from '@/lib/format'
import { TypeSystem, TypeBoard } from '@/features/game'

const Game: CustomNextPage = () => {
    const router = useRouter()
    const { data, status } = useSession()

    const initializeGameState = useGameStore((state) => state.initializeGameState)
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

    // ページ読み込み時にcategoryに応じて問題文を取得する
    useEffect(() => {
        // 前のページからデータが送られていることを確認する
        if (router.query.state == null) {
            // このときのエラーハンドリングが必要かもしれない
            return
        }

        // ページ読み込み時にGameStateを初期化する
        initializeGameState()

        const selectData: SelectData = JSON.parse(router.query.state as string)
        const category = selectData.category

        // categoryに応じてresponseBodyを作成
        let requestBody: any
        switch (category) {
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

        // Categoryにキャスト出来ない場合はreturnされる (良くないかも)
        setContent(category as Category, requestBody)
    }, [])

    // ゲーム中のタイマー
    useEffect(() => {
        const timerId = setInterval(() => {
            incrementTime()
        }, 1000)

        return () => clearInterval(timerId)
    }, [time])

    // ゲーム終了時にresultページへ遷移するためのイベント
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
