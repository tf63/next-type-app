// import { SelectState, TypeState } from '@/types/types'
import { Category, Label } from '@/types/types'
import { Dispatch, createContext, useContext } from 'react'

export type SelectState = {
    category: Label
    categoryLabels: Label[]
    size: Label
    sizeLabels: Label[]
    language: Label
    tag: Label
    categoryToTagLabels: Map<Category, Label[]>
}

export type ExternalSelectState = {
    categoryToTagLabels: Map<Category, Label[]>
}

export type UpdateSelectState = {
    category?: Label
    size?: Label
    language?: Label
    tag?: Label
}

export const initialSelectState: SelectState = {
    categoryLabels: [
        { id: 1, name: 'language' },
        { id: 2, name: 'framework' },
        { id: 3, name: 'algorithm' },
        { id: 4, name: 'pattern' }
    ],
    sizeLabels: [
        { id: 1, name: 'short' },
        { id: 2, name: 'medium' },
        { id: 3, name: 'long' }
    ],
    category: { id: 1, name: 'language' },
    size: { id: 1, name: 'short' },
    language: { id: 0, name: '' },
    tag: { id: 0, name: '' },
    categoryToTagLabels: new Map<Category, Label[]>([
        ['language', []],
        ['framework', []],
        ['algorithm', []],
        ['pattern', []]
    ])
}

export type Action =
    | { type: 'INIT_STATE'; data: ExternalSelectState }
    | { type: 'UPDATE_STATE'; data: UpdateSelectState }

const SelectContext = createContext<{ state: SelectState; dispatch: Dispatch<Action> }>({
    state: initialSelectState,
    dispatch: () => {}
})

export const useSelectContext = () => {
    return useContext(SelectContext)
}

export default SelectContext
