import Card from '@/components/Card'
import SelectBoard from '@/components/SelectBoard'
import { Category, Label, SelectBoardProps } from '@/types/types'
import { useEffect, useReducer, useState } from 'react'
import { useRouter } from 'next/router'
import { CustomNextPage } from '@/types/custom-next-page'
import Button from '@/components/Button'
import SmallHeight from '@/components/SmallHeight'
import NavigateButton from '@/components/NavigateButton'
import FlexContainer from '@/components/FlexContainer'
import { selectReducer } from '@/reducers/SelectReducer'
import SelectContext, {
    SelectState,
    Action,
    initialSelectState,
    ExternalSelectState,
    UpdateSelectState
} from '@/contexts/SelectContext'
import axios from 'axios'
import {
    AlgorithmAPIResponse,
    FrameworkAPIResponse,
    LanguageAPIResponse,
    PatternAPIResponse
} from '@/interfaces/interfaces'

const Select: CustomNextPage = () => {
    const [state, dispatch] = useReducer(selectReducer, initialSelectState)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get('/api/language')
                const languages: LanguageAPIResponse[] = await response.data
                const languageLabels: Label[] = languages.map((obj) => ({ id: obj.language_id, name: obj.name }))

                response = await axios.get('/api/framework')
                const frameworks: FrameworkAPIResponse[] = await response.data
                const frameworkLabels: Label[] = frameworks.map((obj) => ({ id: obj.tool_id, name: obj.name }))

                response = await axios.get('/api/algorithm')
                const algorithms: AlgorithmAPIResponse[] = await response.data
                const algorithmLabels: Label[] = algorithms.map((obj) => ({ id: obj.algorithm_id, name: obj.name }))

                response = await axios.get('/api/pattern')
                const patterns: PatternAPIResponse[] = await response.data
                const patternLabels: Label[] = patterns.map((obj) => ({ id: obj.pattern_id, name: obj.name }))

                const categoryToTagLabels = new Map<Category, Label[]>([
                    ['language', languageLabels],
                    ['framework', frameworkLabels],
                    ['algorithm', algorithmLabels],
                    ['pattern', patternLabels]
                ])

                const externalState: ExternalSelectState = {
                    categoryToTagLabels: categoryToTagLabels
                }
                const updateState: UpdateSelectState = {
                    category: state.categoryLabels[0],
                    size: state.sizeLabels[0],
                    language: languageLabels[0],
                    tag: categoryToTagLabels.get('language')![0]
                }

                dispatch({ type: 'INIT_STATE', data: externalState })
                dispatch({ type: 'UPDATE_STATE', data: updateState })
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const tagName: Label = state.categoryToTagLabels.get(state.category.name as Category)![0]
        const updateState: UpdateSelectState = {
            tag: tagName
        }
        dispatch({ type: 'UPDATE_STATE', data: updateState })
    }, [state.category])

    const resultState = { category: state.category, size: state.size, tag: state.tag, language: state.language }

    const router = useRouter()
    const navigateEvent = () => {
        router.push({
            pathname: '/game',
            query: { state: JSON.stringify(resultState) }
        })
    }

    return (
        <main style={{ height: '1300px' }}>
            <FlexContainer>
                <p style={{ marginBottom: '50px' }}>
                    <span>{`Language: ${state.language.name}, Size: ${state.size.name}`}</span>
                    {state.category.name !== 'language' && <span>{`, Tag: ${state.tag.name}`}</span>}
                </p>
            </FlexContainer>
            <FlexContainer>
                <Button onClick={navigateEvent} flex={true}>
                    Start
                </Button>
            </FlexContainer>
            <SmallHeight />
            <SelectContext.Provider value={{ state, dispatch }}>
                <SelectBoard />
            </SelectContext.Provider>
        </main>
    )
}

export default Select
