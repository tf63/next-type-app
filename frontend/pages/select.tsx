import SelectBoard from '@/components/SelectBoard'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { CustomNextPage } from '@/types/custom-next-page'
import Button from '@/components/Button'
import SmallHeight from '@/components/SmallHeight'
import FlexContainer from '@/components/FlexContainer'
import { useSelectStore } from '@/states/Select'
import { getSelectorName } from '@/lib/format'

const Select: CustomNextPage = () => {
    const setProblemLabels = useSelectStore((state) => state.setProblemLabels)
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
        setProblemLabels()
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

    // 現在の選択状況のサマリ
    const problemSummary = () => {
        switch (getSelectorName(category)) {
            case 'language':
                return <span>{`Language: ${getSelectorName(language)}, Size: ${getSelectorName(size)}`}</span>
            case 'framework':
                return <span>{`Framework: ${getSelectorName(framework)},  Size: ${getSelectorName(size)}`}</span>
            case 'algorithm':
                return (
                    <span>{`Language: ${getSelectorName(language)}, Size: ${getSelectorName(
                        size
                    )}, Algorithm: ${getSelectorName(algorithm)}`}</span>
                )
            case 'pattern':
                return (
                    <span>{`Language: ${getSelectorName(language)}, Size: ${getSelectorName(
                        size
                    )}, Pattern: ${getSelectorName(pattern)}`}</span>
                )
            default:
                return <span></span>
        }
        return
    }
    return (
        <main style={{ height: '1300px' }}>
            <FlexContainer>
                <p style={{ marginBottom: '50px' }}>{problemSummary()}</p>
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
