import { SetStateAction, createContext, useContext } from 'react'
import { Dispatch } from 'react'

export type Color = 'blue' | 'green' | 'white' | 'github' | 'none'
export type Category = 'language' | 'framework' | 'algorithm' | 'pattern'
// export type ProblemSize = 'short' | 'medium' | 'long'

export type Label = {
    id: number
    name: string
}

export type Selector = {
    labels: Label[]
    id: number
}

type ProfileSummary = {
    month: string
    correct: number
    miss: number
    speed: number
}

export type SelectBoardProps = {
    category: Label
    setCategory: Dispatch<SetStateAction<Label>>
    setSize: Dispatch<SetStateAction<Label>>
    setLanguage: Dispatch<SetStateAction<Label>>
    setTag: Dispatch<SetStateAction<Label>>
}

export interface SelectData {
    category: string
    size: string
    languageId?: number
    frameworkId?: number
    algorithmId?: number
    patternId?: number
}

export type GameData = {
    category: Category
    problemId: number
    correct: number
    miss: number
    timer: number
    missPerType: number[]
}
