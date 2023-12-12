import SelectBoard from '@/components/SelectBoard'
import { Category, Label } from '@/types/types'
import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { CustomNextPage } from '@/types/custom-next-page'
import Button from '@/components/Button'
import SmallHeight from '@/components/SmallHeight'
import FlexContainer from '@/components/FlexContainer'
import { selectReducer } from '@/reducers/SelectReducer'
import SelectContext, { initialSelectState, UpdateSelectState } from '@/contexts/SelectContext'
import { useSelectStore } from '@/states/Select'

const Select: CustomNextPage = () => {
    const setLabels = useSelectStore((state) => state.setLabels)
    const { category, size, language, framework, algorithm, pattern } = useSelectStore((state) => ({
        category: state.category,
        size: state.size,
        language: state.language,
        framework: state.framework,
        algorithm: state.algorithm,
        pattern: state.pattern
    }))

    // ページ読み込み時
    useEffect(() => {
        setLabels()
    }, [])

    const problemState = { category: category, size: size, language: language } // 遷移時に渡すオブジェクト

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
                    <span>{`Language: ${language.name}, Size: ${size.name}`}</span>
                    {category.name === 'framework' && <span>{`, Framework: ${framework.name}`}</span>}
                    {category.name === 'algorithm' && <span>{`, Algorithm: ${algorithm.name}`}</span>}
                    {category.name === 'pattern' && <span>{`, Pattern: ${pattern.name}`}</span>}
                </p>
            </FlexContainer>
            <FlexContainer>
                <Button onClick={navigateEvent} flex={true}>
                    Start
                </Button>
            </FlexContainer>
            <SmallHeight />
            <SelectBoard />
        </main>
    )
}

export default Select
