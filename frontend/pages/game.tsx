import type { NextPage } from 'next'
import React from 'react'
import TypeSystem from '@/components/TypeSystem'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Category, ProblemState, ResultState } from '@/types/types'
import axios from 'axios'
import {
    AlgorithmCodeAPIRequest,
    AlgorithmCodeAPIResponse,
    FrameworkCodeAPIRequest,
    FrameworkCodeAPIResponse,
    LanguageCodeAPIRequest,
    LanguageCodeAPIResponse,
    PatternCodeAPIRequest,
    PatternCodeAPIResponse
} from '@/interfaces/interfaces'
import TypeContext from '@/contexts/TypeContext'
import GameContext from '@/contexts/GameContext'
import { CustomNextPage } from '@/types/custom-next-page'
import { KEY_TO_IDX } from '@/lib/const'

const Game: CustomNextPage = () => {
    const router = useRouter()
    const [content, setContent] = useState('')
    const [problemId, setProblemId] = useState(0)
    const [category, setCategory] = useState('language')

    // TypeContext
    const [indexText, setIndexText] = useState(0)
    const [indexLine, setIndexLine] = useState(0)
    const [typeList, setTypeList] = useState<string[]>([])
    const [prefixList, setPrefixList] = useState<string[]>([])

    // GameContext
    const [correct, setCorrect] = useState(0)
    const [miss, setMiss] = useState(0)
    const [timer, setTimer] = useState(0)
    const [missPerType, setMissPerType] = useState<number[]>(Array.from({ length: 96 }, () => 0))

    const correctEvent = (key: string) => {
        console.log(`correct key ${key}!!`)
        setCorrect(correct + 1)
    }

    const missEvent = (key: string) => {
        console.log(`incorrect key ${key}!!`)
        const idx = KEY_TO_IDX.get(key)

        // 存在しないキーだったらundefined
        if (idx != null) {
            setMissPerType((prev) => {
                const _missPerType = prev
                _missPerType[idx] += 1
                return _missPerType
            })
        }

        setMiss(miss + 1)
    }

    useEffect(() => {
        const fetchData = async () => {
            if (router.query.state == null) {
                return
            }

            const problemState: ProblemState = JSON.parse(router.query.state as string)
            const commonData = {
                language_id: problemState.language.id,
                size: problemState.size.name
            }

            let endpoint: string
            let requestData: any

            switch (problemState.category.name) {
                case 'language':
                    endpoint = '/api/language/code'
                    requestData = { ...commonData }
                    break
                case 'framework':
                    endpoint = '/api/framework/code'
                    requestData = { tool_id: problemState.tag.id, ...commonData }
                    break
                case 'algorithm':
                    endpoint = '/api/algorithm/code'
                    requestData = { algorithm_id: problemState.tag.id, ...commonData }
                    break
                case 'pattern':
                    endpoint = '/api/pattern/code'
                    requestData = { pattern_id: problemState.tag.id, ...commonData }
                    break
                default:
                    return
            }

            const response = await axios.post(endpoint, requestData)
            const result = await response.data
            setProblemId(result.id)
            setContent(result.content)
            setCategory(problemState.category.name)
        }

        fetchData()
    }, [])

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimer((prev) => prev + 1)
        }, 1000)

        return () => clearInterval(timerId)
    }, [timer])

    useEffect(() => {
        const decomposeContent = (content: string) => {
            const splitContent = content.split(/\r?\n/)
            const _typeList: string[] = []
            const _prefixList: string[] = []
            for (let s of splitContent) {
                const result = s.match(/^(\s*)(.*)/)
                if (result != null) {
                    _prefixList.push(result[1])
                    _typeList.push(result[2])
                }
            }

            setTypeList(_typeList)
            setPrefixList(_prefixList)
        }

        decomposeContent(content)
    }, [content])

    const resultState: ResultState = {
        category: category as Category,
        problemId: problemId,
        correct: correct,
        miss: miss,
        timer: timer,
        missPerType: missPerType
    }
    const navigateEvent = () => {
        router.push({
            pathname: '/result',
            query: { state: JSON.stringify(resultState) }
        })
    }

    return (
        <main>
            <GameContext.Provider
                value={{ correctEvent: correctEvent, missEvent: missEvent, navigateEvent: navigateEvent }}
            >
                <TypeContext.Provider
                    value={{
                        indexText: indexText,
                        setIndexText: setIndexText,
                        indexLine: indexLine,
                        setIndexLine: setIndexLine,
                        typeList: typeList,
                        prefixList: prefixList
                    }}
                >
                    <TypeSystem />
                </TypeContext.Provider>
            </GameContext.Provider>
            {`correct: ${correct}, miss: ${miss}, time: ${timer}`}
        </main>
    )
}

export default Game
