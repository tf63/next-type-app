import SelectBoard from '@/components/SelectBoard'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { CustomNextPage } from '@/types/custom-next-page'
import Button from '@/components/Button'
import SmallHeight from '@/components/SmallHeight'
import FlexContainer from '@/components/FlexContainer'
import { useSelectStore } from '@/states/Select'
import { getSelectorId, getSelectorName } from '@/lib/format'
import { SelectData } from '@/types/types'

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

    // Select -> Gameに遷移
    const router = useRouter()
    const navigateEvent = () => {
        let selectData: SelectData
        const categoryName = getSelectorName(category)
        const sizeName = getSelectorName(size)
        switch (categoryName) {
            case 'language':
                selectData = { category: categoryName, size: sizeName, languageId: getSelectorId(language) }
                break
            case 'framework':
                selectData = { category: categoryName, size: sizeName, frameworkId: getSelectorId(framework) }
                break
            case 'algorithm':
                selectData = {
                    category: categoryName,
                    size: sizeName,
                    languageId: getSelectorId(language),
                    algorithmId: getSelectorId(algorithm)
                }
                break
            case 'pattern':
                selectData = {
                    category: categoryName,
                    size: sizeName,
                    languageId: getSelectorId(language),
                    patternId: getSelectorId(pattern)
                }
                break
            default:
                selectData = { category: categoryName, size: sizeName }
                break
        }

        router.push({
            pathname: '/game',
            query: { state: JSON.stringify(selectData) }
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
