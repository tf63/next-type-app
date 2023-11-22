import { Dispatch } from 'react'

export type Color = 'blue' | 'green' | 'white' | 'none'
// export type Category = 'language' | 'framework' | 'algorithm' | 'pattern'
// export type ProblemSize = 'short' | 'medium' | 'long'

export type Label = {
    id: number
    name: string
}

export type SelectBoardProps = {
    category: Label
    setCategory: Dispatch<SetStateAction<Label>>
    setSize: Dispatch<SetStateAction<Label>>
    setLanguage: Dispatch<SetStateAction<Label>>
    setTag: Dispatch<SetStateAction<Label>>
}

export type ProblemState = {
    category: Label
    size: Label
    tag: Label
    language: Label
}

export type TypeState = {
    indexText: number
    setIndexText: Dispatch<SetStateAction<number>>
    indexLine: number
    setIndexLine: Dispatch<SetStateAction<number>>
    typeList: string[]
    prefixList: string[]
}

export type GameState = {
    correctEvent: () => void
    missEvent: () => void
    navigateEvent: () => void
}

export type ResultState = {
    correct: number
    miss: number
    timer: number
}
