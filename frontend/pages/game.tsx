import type { NextPage } from 'next'
import React, { createContext } from 'react'
import TypeSystem from '@/components/TypeSystem'
import { LinkedButton } from '@/components/LinkedButton'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ProblemState } from '@/types/types'
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
import GameStateContext from '@/contexts/GameStateContext'

const Game: NextPage = () => {
    const router = useRouter()
    const [content, setContent] = useState('')
    const [typeList, setTypeList] = useState<string[]>([])
    const [prefixList, setPrefixList] = useState<string[]>([])

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
            <GameStateContext.Provider value={{ typeList: typeList, prefixList: prefixList }}>
                <TypeSystem />
            </GameStateContext.Provider>
            <LinkedButton href="/result" text="Result" color="blue" />
        </main>
    )
}

export default Game
