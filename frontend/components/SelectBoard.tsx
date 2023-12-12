import { getSelectorName } from '@/lib/format'
import Accordion from './Accordion'
import { SelectGroup, SelectGroupMultiLine } from './SelectGroup'
import SmallHeight from './SmallHeight'
import { useSelectStore } from '@/states/Select'

/**
 * selectページで使用するボード
 * @returns
 */
const SelectBoard: React.FC = () => {
    // カテゴリ (language / framework / algorithm / pattern)

    // 各カテゴリのセレクタで使用するラベル
    const { category, size, language, framework, algorithm, pattern } = useSelectStore((state) => ({
        category: state.category,
        size: state.size,
        language: state.language,
        framework: state.framework,
        algorithm: state.algorithm,
        pattern: state.pattern
    }))

    // ラベルをセットする関数
    const { setCategory, setSize, setLanguage, setFramework, setAlgorithm, setPattern } = useSelectStore((state) => ({
        setCategory: state.setCategory,
        setSize: state.setSize,
        setLanguage: state.setLanguage,
        setFramework: state.setFramework,
        setAlgorithm: state.setAlgorithm,
        setPattern: state.setPattern
    }))

    return (
        <>
            <p>Problem Category</p>
            <SelectGroup {...{ labels: category.labels, setLabel: setCategory }} />

            <SmallHeight />
            <p>Problem Size</p>
            <SelectGroup {...{ labels: size.labels, setLabel: setSize }} />

            {/* 基本情報 */}
            <SmallHeight />
            {['language', 'algorithm', 'pattern'].includes(getSelectorName(category)) && (
                <Accordion summary={'Language'}>
                    <SelectGroupMultiLine {...{ labels: language.labels, setLabel: setLanguage }} />
                </Accordion>
            )}

            {getSelectorName(category) === 'framework' && (
                <Accordion summary={'Framework'}>
                    <SelectGroupMultiLine {...{ labels: framework.labels, setLabel: setFramework }} />
                </Accordion>
            )}

            {/* 追加情報 */}
            <SmallHeight />
            {getSelectorName(category) === 'algorithm' && (
                <Accordion summary={'Algorithm'}>
                    <SelectGroupMultiLine {...{ labels: algorithm.labels, setLabel: setAlgorithm }} />
                </Accordion>
            )}

            {getSelectorName(category) === 'pattern' && (
                <Accordion summary={'Pattern'}>
                    <SelectGroupMultiLine {...{ labels: pattern.labels, setLabel: setPattern }} />
                </Accordion>
            )}
        </>
    )
}

export default SelectBoard
