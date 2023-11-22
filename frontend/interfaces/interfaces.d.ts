// interfaces

import { Category } from '@/types/types'

export interface Language {
    language_id: number
}

export interface Framework {
    tool_id: number
}

export interface Algorithm {
    algorithm_id: number
}

export interface Pattern {
    pattern_id: number
}

export interface TagAPI {
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
    nrow: number
    content: string
}

export interface LanguageCodeAPIResponse extends ProblemCodeAPIResponse, Language {}
export interface FrameworkCodeAPIResponse extends ProblemCodeAPIResponse, Framework {}
export interface AlgorithmCodeAPIResponse extends ProblemCodeAPIResponse, Language, Algorithm {}
export interface PatternCodeAPIResponse extends ProblemCodeAPIResponse, Language, Pattern {}
