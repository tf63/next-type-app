import type { NextPage } from 'next'
import React, { createContext } from 'react'
import TypeSystem from '@/components/TypeSystem'
import { LinkedButton } from '@/components/LinkedButton'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ProblemState, ResultState } from '@/types/types'
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

const Game: NextPage = () => {
    const router = useRouter()
    const [content, setContent] = useState('')

    // TypeContext
    const [indexText, setIndexText] = useState(0)
    const [indexLine, setIndexLine] = useState(0)
    const [typeList, setTypeList] = useState<string[]>([])
    const [prefixList, setPrefixList] = useState<string[]>([])

    // GameContxt
    const [correct, setCorrect] = useState(0)
    const [miss, setMiss] = useState(0)

    const correctEvent = () => {
        console.log('correct !!')
        setCorrect(correct + 1)
    }
    const missEvent = () => {
        console.log('incorrect !!')
        setMiss(miss + 1)
    }

    const resultState: ResultState = { correct: correct, miss: miss }
    const navigateEvent = () => {
        router.push({
            pathname: '/result',
            query: { state: JSON.stringify(resultState) }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            if (router.query.state) {
                const problemState: ProblemState = JSON.parse(router.query.state as string)
                if (problemState.category.name === 'language') {
                    const data: LanguageCodeAPIRequest = {
                        language_id: problemState.language.id,
                        size: problemState.size.name
                    }
                    const response = await axios.post('/api/language/code', data)
                    const result: LanguageCodeAPIResponse = await response.data
                    setContent(result.content)
                } else if (problemState.category.name === 'framework') {
                    const data: FrameworkCodeAPIRequest = {
                        tool_id: problemState.tag.id,
                        size: problemState.size.name
                    }
                    const response = await axios.post('/api/framework/code', data)
                    const result: FrameworkCodeAPIResponse = await response.data
                    setContent(result.content)
                } else if (problemState.category.name === 'algorithm') {
                    const data: AlgorithmCodeAPIRequest = {
                        language_id: problemState.language.id,
                        algorithm_id: problemState.tag.id,
                        size: problemState.size.name
                    }
                    const response = await axios.post('/api/algorithm/code', data)
                    const result: AlgorithmCodeAPIResponse = await response.data
                    setContent(result.content)
                } else if (problemState.category.name === 'pattern') {
                    const data: PatternCodeAPIRequest = {
                        language_id: problemState.language.id,
                        pattern_id: problemState.tag.id,
                        size: problemState.size.name
                    }
                    const response = await axios.post('/api/pattern/code', data)
                    const result: PatternCodeAPIResponse = await response.data
                    setContent(result.content)
                } else {
                    // pass
                }
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const decomposeContent = (content: string) => {
            const splitContent = content.split(/\r?\n/)
            const _typeList: string[] = []
            const _prefixList: string[] = []
            for (let s of splitContent) {
                const result = s.match(/^(\s*)(.*)/)
                if (result) {
                    _prefixList.push(result[1])
                    _typeList.push(result[2])
                }
            }

            setTypeList(_typeList)
            setPrefixList(_prefixList)
        }

        decomposeContent(content)
    }, [content])

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
            <LinkedButton href="/result" text="Result" color="blue" />
            {`correct: ${correct}, miss: ${miss}`}
        </main>
    )
}

export default Game
