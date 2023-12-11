import SelectBoard from '@/components/SelectBoard'
import { Category, Label } from '@/types/types'
import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { CustomNextPage } from '@/types/custom-next-page'
import Button from '@/components/Button'
import SmallHeight from '@/components/SmallHeight'
import FlexContainer from '@/components/FlexContainer'
import { selectReducer } from '@/reducers/SelectReducer'
import SelectContext, { initialSelectState, ExternalSelectState, UpdateSelectState } from '@/contexts/SelectContext'
import axios from 'axios'
import {
    AlgorithmAPIResponse,
    FrameworkAPIResponse,
    LanguageAPIResponse,
    PatternAPIResponse
} from '@/interfaces/interfaces'

const Select: CustomNextPage = () => {
    const [state, dispatch] = useReducer(selectReducer, initialSelectState)

    // ページ読み込み時
    useEffect(() => {
        const fetchData = async () => {
            try {
                // カテゴリデータを取得する
                // ----------------------------------------------------------------
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

                // problemのメタデータ (tag) を事前準備しておく
                const categoryToTagLabels = new Map<Category, Label[]>([
                    ['language', languageLabels],
                    ['framework', frameworkLabels],
                    ['algorithm', algorithmLabels],
                    ['pattern', patternLabels]
                ])
                // 取得したデータを登録する
                const externalState: ExternalSelectState = {
                    categoryToTagLabels: categoryToTagLabels
                }
                // 初期データを登録する
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
        try {
            // カテゴリが変化したらtagを更新する
            const tagName: Label = state.categoryToTagLabels.get(state.category.name as Category)![0]
            const updateState: UpdateSelectState = {
                tag: tagName
            }
            dispatch({ type: 'UPDATE_STATE', data: updateState })
        } catch (error) {
            // エラー時は何もしない
            console.error('Error change state:', error)
        }
    }, [state.category])

    const problemState = { category: state.category, size: state.size, tag: state.tag, language: state.language } // 遷移時に渡すオブジェクト

    // Select -> Gameに遷移
    const router = useRouter()
    const navigateEvent = () => {
        router.push({
            pathname: '/game',
            query: { state: JSON.stringify(problemState) }
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
