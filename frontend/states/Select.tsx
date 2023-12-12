import { Label, Selector } from '@/types/types'
import axios from 'axios'
import { create } from 'zustand'

import {
    AlgorithmAPIResponse,
    FrameworkAPIResponse,
    LanguageAPIResponse,
    PatternAPIResponse
} from '@/interfaces/interfaces'

type State = {
    category: Selector
    size: Selector
    language: Selector
    framework: Selector
    algorithm: Selector
    pattern: Selector
}

type Action = {
    setProblemLabels: () => void
    setCategory: (id: number) => void
    setSize: (id: number) => void
    setLanguage: (id: number) => void
    setFramework: (id: number) => void
    setAlgorithm: (id: number) => void
    setPattern: (id: number) => void
}

// Create your store, which includes both state and (optionally) actions
export const useSelectStore = create<State & Action>((set) => ({
    category: {
        id: 1,
        labels: [
            { id: 1, name: 'language' },
            { id: 2, name: 'framework' },
            { id: 3, name: 'algorithm' },
            { id: 4, name: 'pattern' }
        ]
    },
    size: {
        id: 1,
        labels: [
            { id: 1, name: 'short' },
            { id: 2, name: 'medium' },
            { id: 3, name: 'long' }
        ]
    },
    language: { id: 0, labels: [{ id: 0, name: '' }] },
    framework: { id: 0, labels: [{ id: 0, name: '' }] },
    algorithm: { id: 0, labels: [{ id: 0, name: '' }] },
    pattern: { id: 0, labels: [{ id: 0, name: '' }] },
    setCategory: (id) => {
        set((state) => {
            return { category: { id: id, labels: state.category.labels } }
        })
    },
    setSize: (id) => {
        set((state) => {
            return { size: { id: id, labels: state.size.labels } }
        })
    },
    setLanguage: (id) => {
        set((state) => {
            return { language: { id: id, labels: state.language.labels } }
        })
    },
    setFramework: (id) => {
        set((state) => {
            return { framework: { id: id, labels: state.framework.labels } }
        })
    },
    setAlgorithm: (id) => {
        set((state) => {
            return { algorithm: { id: id, labels: state.algorithm.labels } }
        })
    },
    setPattern: (id) => {
        set((state) => {
            return { pattern: { id: id, labels: state.pattern.labels } }
        })
    },
    setProblemLabels: async () => {
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
                language: { id: languageLabels[0].id, labels: languageLabels },
                framework: { id: frameworkLabels[0].id, labels: frameworkLabels },
                algorithm: { id: algorithmLabels[0].id, labels: algorithmLabels },
                pattern: { id: patternLabels[0].id, labels: patternLabels }
            }))
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
}))
