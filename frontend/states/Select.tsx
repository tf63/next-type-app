import { Label } from '@/types/types'
import axios from 'axios'
import { create } from 'zustand'

import {
    AlgorithmAPIResponse,
    FrameworkAPIResponse,
    LanguageAPIResponse,
    PatternAPIResponse
} from '@/interfaces/interfaces'

type State = {
    categoryLabels: Label[]
    sizeLabels: Label[]
    languageLabels: Label[]
    frameworkLabels: Label[]
    algorithmLabels: Label[]
    patternLabels: Label[]
    category: Label
    size: Label
    language: Label
    framework: Label
    algorithm: Label
    pattern: Label
}

type Action = {
    setCategory: (id: number) => void
    setSize: (id: number) => void
    setLanguage: (id: number) => void
    setFramework: (id: number) => void
    setAlgorithm: (id: number) => void
    setPattern: (id: number) => void
    setLabels: () => void
}

const getLabelById = (id: number, labels: Label[]) => {
    for (const label of labels) {
        if (label.id === id) {
            console.log('getLabelById', label)
            return label
        }
    }

    console.log('getLabelById', { id: 0, name: '' })
    return { id: 0, name: '' }
}

// Create your store, which includes both state and (optionally) actions
export const useSelectStore = create<State & Action>((set) => {
    const categoryLabels = [
        { id: 1, name: 'language' },
        { id: 2, name: 'framework' },
        { id: 3, name: 'algorithm' },
        { id: 4, name: 'pattern' }
    ]
    const sizeLabels = [
        { id: 1, name: 'short' },
        { id: 2, name: 'medium' },
        { id: 3, name: 'long' }
    ]

    return {
        categoryLabels: categoryLabels,
        sizeLabels: sizeLabels,
        languageLabels: [{ id: 0, name: '' }],
        frameworkLabels: [{ id: 0, name: '' }],
        algorithmLabels: [{ id: 0, name: '' }],
        patternLabels: [{ id: 0, name: '' }],
        category: categoryLabels[0],
        size: sizeLabels[0],
        language: { id: 0, name: '' },
        framework: { id: 0, name: '' },
        algorithm: { id: 0, name: '' },
        pattern: { id: 0, name: '' },
        setCategory: (id) => {
            set((state) => {
                return { category: getLabelById(id, state.categoryLabels) }
            })
        },
        setSize: (id) => {
            set((state) => {
                return { size: getLabelById(id, state.sizeLabels) }
            })
        },
        setLanguage: (id) => {
            set((state) => {
                return { language: getLabelById(id, state.languageLabels) }
            })
        },
        setFramework: (id) => {
            set((state) => {
                return { framework: getLabelById(id, state.frameworkLabels) }
            })
        },
        setAlgorithm: (id) => {
            set((state) => {
                return { algorithm: getLabelById(id, state.algorithmLabels) }
            })
        },
        setPattern: (id) => {
            set((state) => {
                return { pattern: getLabelById(id, state.patternLabels) }
            })
        },
        setLabels: async () => {
            try {
                // カテゴリデータを取得する
                // ----------------------------------------------------------------
                let response = await axios.get('/api/language')
                const languages: LanguageAPIResponse[] = await response.data
                const languageLabels: Label[] = languages.map((obj) => ({ id: obj.language_id, name: obj.name }))

                response = await axios.get('/api/framework')
                const frameworks: FrameworkAPIResponse[] = await response.data
                const frameworkLabels: Label[] = frameworks.map((obj) => ({ id: obj.tool_id, name: obj.name }))

                response = await axios.get('/api/algorithm')
                const algorithms: AlgorithmAPIResponse[] = await response.data
                const algorithmLabels: Label[] = algorithms.map((obj) => ({ id: obj.algorithm_id, name: obj.name }))

                response = await axios.get('/api/pattern')
                const patterns: PatternAPIResponse[] = await response.data
                const patternLabels: Label[] = patterns.map((obj) => ({ id: obj.pattern_id, name: obj.name }))

                set(() => ({
                    language: languageLabels[0],
                    framework: frameworkLabels[0],
                    algorithm: algorithmLabels[0],
                    pattern: patternLabels[0],
                    languageLabels: languageLabels,
                    frameworkLabels: frameworkLabels,
                    algorithmLabels: algorithmLabels,
                    patternLabels: patternLabels
                }))
            } catch (error) {
                console.error('Error fetching data:', error)

                set(() => ({
                    languageLabels: [],
                    frameworkLabels: [],
                    algorithmLabels: [],
                    patternLabels: []
                }))
            }
        }
    }
})
