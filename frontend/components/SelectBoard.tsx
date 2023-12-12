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
    const category = useSelectStore((state) => state.category)

    // 各カテゴリのセレクタで使用するラベル
    const { categoryLabels, sizeLabels, languageLabels, frameworkLabels, algorithmLabels, patternLabels } =
        useSelectStore((state) => ({
            categoryLabels: state.categoryLabels,
            sizeLabels: state.sizeLabels,
            languageLabels: state.languageLabels,
            frameworkLabels: state.frameworkLabels,
            algorithmLabels: state.algorithmLabels,
            patternLabels: state.patternLabels
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
            <SelectGroup {...{ labels: categoryLabels, setLabel: setCategory }} />

            <SmallHeight />
            <p>Problem Size</p>
            <SelectGroup {...{ labels: sizeLabels, setLabel: setSize }} />

            {/* 基本情報 */}
            <SmallHeight />
            {category.name !== 'framework' && (
                <Accordion summary={'Language'}>
                    <SelectGroupMultiLine {...{ labels: languageLabels, setLabel: setLanguage }} />
                </Accordion>
            )}

            {category.name === 'framework' && (
                <Accordion summary={'Framework'}>
                    <SelectGroupMultiLine {...{ labels: frameworkLabels, setLabel: setFramework }} />
                </Accordion>
            )}

            {/* 追加情報 */}
            <SmallHeight />
            {category.name === 'algorithm' && (
                <Accordion summary={'Algorithm'}>
                    <SelectGroupMultiLine {...{ labels: algorithmLabels, setLabel: setAlgorithm }} />
                </Accordion>
            )}

            {category.name === 'pattern' && (
                <Accordion summary={'Pattern'}>
                    <SelectGroupMultiLine {...{ labels: patternLabels, setLabel: setPattern }} />
                </Accordion>
            )}
        </>
    )
}

export default SelectBoard
