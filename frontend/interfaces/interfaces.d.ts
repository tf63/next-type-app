// interfaces

export interface GameState {
    typeList: string[]
    prefixList: string[]
    indexText: number
    indexLine: number
}

export interface TagAPI {
    name: string
}

export interface LanguageAPI extends TagAPI {
    language_id: number
}

export interface ToolAPI extends TagAPI {
    tool_id: number
}

export interface AlgorithmAPI extends TagAPI {
    algorithm_id: number
}

export interface PatternAPI extends TagAPI {
    pattern_id: number
}
