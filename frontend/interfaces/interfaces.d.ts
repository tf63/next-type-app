// interfaces

import { Category } from '@/types/types'

interface Language {
    language_id: number
}

interface Framework {
    tool_id: number
}

interface Algorithm {
    algorithm_id: number
}

interface Pattern {
    pattern_id: number
}

interface TagAPI {
    name: string
}

export interface LanguageAPIResponse extends TagAPI, Language {}
export interface FrameworkAPIResponse extends TagAPI, Framework {}
export interface AlgorithmAPIResponse extends TagAPI, Language, Algorithm {}
export interface PatternAPIResponse extends TagAPI, Language, Pattern {}

export interface ProblemCodeAPIRequest {
    size: string
}

export interface LanguageCodeAPIRequest extends ProblemCodeAPIRequest, Language {}
export interface FrameworkCodeAPIRequest extends ProblemCodeAPIRequest, Framework {}
export interface AlgorithmCodeAPIRequest extends ProblemCodeAPIRequest, Language, Algorithm {}
export interface PatternCodeAPIRequest extends ProblemCodeAPIRequest, Language, Pattern {}

export interface ProblemCodeAPIResponse {
    id: number
    nrow: number
    content: string
}

export interface LanguageCodeAPIResponse extends ProblemCodeAPIResponse, Language {}
export interface FrameworkCodeAPIResponse extends ProblemCodeAPIResponse, Framework {}
export interface AlgorithmCodeAPIResponse extends ProblemCodeAPIResponse, Language, Algorithm {}
export interface PatternCodeAPIResponse extends ProblemCodeAPIResponse, Language, Pattern {}

export interface GameFinishAPIRequest {
    category: Category
    problemId: number
    userId: string
    correct: number
    miss: number
    timer: number
    missPerType: number[]
}

export interface GameMonthAPIRequest {
    userId: string
    missPrevPerType: number[]
}

export interface ProfileLogAPIRequest {
    userId: string
    offset: number
    num: number
}

export interface ProfileLogAPIResponse {
    created_at?: string
    category_id?: number
    problem_id?: number
    correct?: number
    miss?: number
    speed?: number
}

export interface ProfileSummaryAPIRequest {
    userId: string
}

export interface ProfileSummaryAPIResponse {
    month: string
    correct: number
    miss: number
    speed: number
    miss_prev_per_type: number[]
}

export interface ProfileMonthAPIRequest {
    userId: string
    offset: number
    num: number
}

export interface ProfileMonthAPIResponse {
    month: string
    miss_prev_per_type: number[]
}
