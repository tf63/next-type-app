import { useContext } from 'react'
import Accordion from './Accordion'
import { SelectGroup, SelectGroupMultiLine } from './SelectGroup'
import { Label } from '@/types/types'
import SmallHeight from './SmallHeight'
import SelectContext, { UpdateSelectState } from '@/contexts/SelectContext'

const SelectBoard: React.FC = () => {
    const { state, dispatch } = useContext(SelectContext)

    const setData = <T extends keyof UpdateSelectState>(key: T) => {
        return (label: Label) => {
            dispatch({ type: 'UPDATE_STATE', data: { [key]: label } })
        }
    }

    return (
        <>
            <p>Problem Category</p>
            <SelectGroup {...{ labels: state.categoryLabels, setLabel: setData('category') }} />

            <SmallHeight />
            <p>Problem Size</p>
            <SelectGroup {...{ labels: state.sizeLabels, setLabel: setData('size') }} />

            <SmallHeight />
            {state.category.name !== 'framework' && (
                <Accordion summary={'Programming Language'}>
                    <SelectGroupMultiLine
                        {...{ labels: state.categoryToTagLabels.get('language')!, setLabel: setData('language') }}
                    />
                </Accordion>
            )}

            {state.category.name === 'framework' && (
                <Accordion summary={'Programming Framework'}>
                    <SelectGroupMultiLine
                        {...{ labels: state.categoryToTagLabels.get('framework')!, setLabel: setData('tag') }}
                    />
                </Accordion>
            )}

            <SmallHeight />
            {(state.category.name === 'algorithm' || state.category.name === 'pattern') && (
                <Accordion summary={'Problem Tag'}>
                    <SelectGroupMultiLine
                        {...{ labels: state.categoryToTagLabels.get(state.category.name)!, setLabel: setData('tag') }}
                    />
                </Accordion>
            )}
        </>
    )
}

export default SelectBoard
