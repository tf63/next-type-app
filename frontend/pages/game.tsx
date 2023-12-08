import React from 'react'
import TypeSystem from '@/components/TypeSystem'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Category, ProblemState, ResultState } from '@/types/types'
import axios from 'axios'
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
    const [correctTypes, setCorrectTypes] = useState<number[]>(Array.from({ length: KEY_TO_IDX.size }, () => 0))
    const [missTypes, setMissTypes] = useState<number[]>(Array.from({ length: KEY_TO_IDX.size }, () => 0))

    const correctEvent = (key: string) => {
        const keyIdx = KEY_TO_IDX.get(key)

        // 存在しないキーだったらundefined
        if (keyIdx != null) {
            setCorrectTypes((prev) => {
                const _correctTypes = prev
                _correctTypes[keyIdx] += 1
                return _correctTypes
            })
        }

        setCorrect((prev) => prev + 1)
        console.log(`correct key ${key}!!`)
    }

    const missEvent = (key: string, actual: string) => {
        const actualIdx = KEY_TO_IDX.get(actual)

        // 存在しないキーだったらundefined
        if (actualIdx != null) {
            setMissTypes((prev) => {
                const _missTypes = prev
                _missTypes[actualIdx] += 1
                return _missTypes
            })
        }

        setMiss((prev) => prev + 1)
        console.log(`incorrect key ${key}!! actual: ${actual}`)
    }

    useEffect(() => {
        if (router.query.state == null) {
            return
        }

        const fetchData = async () => {
            try {
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
            } catch (error) {
                console.error('Error fetching data:', error)
            }
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

    const getMissPerType = () => {
        const missPerType: number[] = []
        for (let i = 0; i < correctTypes.length; i++) {
            if (correctTypes[i] === 0) {
                missPerType.push(0)
            } else {
                // キー1つに対するミスタイプの回数を少数第二位まで
                const value = Math.ceil((100 * missTypes[i]) / correctTypes[i])
                missPerType.push(value)
            }
        }

        return missPerType
    }
    const navigateEvent = () => {
        const resultState: ResultState = {
            category: category as Category,
            problemId: problemId,
            correct: correct,
            miss: miss,
            timer: timer,
            missPerType: getMissPerType()
        }
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
