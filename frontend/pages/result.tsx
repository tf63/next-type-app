import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GameData } from '@/types/types'
import { CustomNextPage } from '@/types/custom-next-page'
import { useSession } from 'next-auth/react'
import { GameFinishAPIRequest } from '@/interfaces/interfaces'
import axios from 'axios'
import { FlexContainer, SmallHeight, NavigateButton } from '@/features/ui'
import { KeyBoard } from '@/features/keyboard'
import { KEY_TO_IDX } from '@/lib/const'

const Result: CustomNextPage = () => {
    const router = useRouter()
    const { data, status } = useSession()
    const [posted, setPosted] = useState(false)
    const [resultState, setResultState] = useState<GameData>({
        category: 'language',
        problemId: 0,
        correct: 0,
        miss: 0,
        timer: 0,
        missPerType: Array.from({ length: KEY_TO_IDX.size }, () => 0)
    })

    // GameページからGameDataを取得する
    useEffect(() => {
        // 前のページからデータが送られていることを確認する
        if (router.query.state == null) {
            // このときのエラーハンドリングが必要かもしれない
            return
        }

        const state: GameData = JSON.parse(router.query.state as string)
        setResultState(state)
    }, [])

    // ユーザーのログを保存する
    useEffect(() => {
        if (resultState.problemId === 0 || posted) {
            return
        }

        const postData = async () => {
            try {
                const userLog: GameFinishAPIRequest = { userId: data?.user?.id!, ...resultState }
                const _ = await axios.post('/api/game/finish', userLog)
                setPosted(true)
            } catch (error) {
                console.error('Error posting data:', error)
            }
        }

        if (status === 'authenticated') {
            postData()
        }
    }, [resultState])

    return (
        <main>
            <p style={{ padding: '0px 20px 20px 20px' }}>Your Typo</p>
            <KeyBoard list={resultState.missPerType} />
            <FlexContainer>
                <p style={{ opacity: '70%' }}>press the shift key and toggle the keyboard</p>
            </FlexContainer>
            <SmallHeight />
            <p style={{ padding: '0px 20px 0px 20px' }}>Your Result</p>
            <FlexContainer>
                <p>{`correct: ${resultState.correct}, miss: ${resultState.miss}, time: ${resultState.timer}, acc: ${(
                    (100 * resultState.correct) /
                    (resultState.correct + resultState.miss)
                ).toFixed(2)} %, speed: ${(resultState.correct / (resultState.timer + 0.000001)).toFixed(2)} /s.`}</p>
            </FlexContainer>
            <NavigateButton href="/">Home</NavigateButton>
        </main>
    )
}

export default Result
