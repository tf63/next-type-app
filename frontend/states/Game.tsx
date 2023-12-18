import { GameMonthAPIRequest } from '@/interfaces/interfaces'
import { KEY_TO_IDX } from '@/lib/const'
import { decomposeContent, getMissPrevPerType } from '@/lib/format'
import { Category } from '@/types/types'
import axios from 'axios'
import { create } from 'zustand'

type State = {
    indexText: number
    indexLine: number
    typeList: string[]
    prefixList: string[]
    category: string
    problemId: number
    correct: number
    miss: number
    time: number
    correctTypes: number[]
    missTypes: number[]
    missPrevTypes: number[]
}

type Action = {
    initializeGameState: () => void
    incrementIndexText: () => void
    incrementIndexLine: () => void
    resetIndexText: () => void
    setContent: (category: Category, requestBody: any) => void
    correctEvent: (key: string) => void
    missEvent: (key: string, actual: string, prev: string) => void
    incrementTime: () => void
    postMonthLog: (userId: string) => void
}

const initialGameState = {
    indexText: 0,
    indexLine: 0,
    typeList: [],
    prefixList: [],
    category: '',
    problemId: 0,
    correct: 0,
    miss: 0,
    time: 0,
    correctTypes: Array.from({ length: KEY_TO_IDX.size }, () => 0),
    missTypes: Array.from({ length: KEY_TO_IDX.size }, () => 0),
    missPrevTypes: Array.from({ length: KEY_TO_IDX.size * KEY_TO_IDX.size }, () => 0)
}

// Create your store, which includes both state and (optionally) actions
export const useGameStore = create<State & Action>((set, get) => ({
    ...initialGameState,
    initializeGameState: () => set(() => initialGameState),
    incrementIndexText: () => set((state) => ({ indexText: state.indexText + 1 })),
    incrementIndexLine: () => set((state) => ({ indexLine: state.indexLine + 1 })),
    resetIndexText: () => set(() => ({ indexText: 0 })),
    setContent: async (category, requestBody) => {
        try {
            const response = await axios.post(`/api/${category}/code`, requestBody)
            const result = await response.data
            const content = result.content
            const [typeList, prefixList] = decomposeContent(content)
            set(() => ({ problemId: result.id, category: category, typeList: typeList, prefixList: prefixList }))
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    },
    correctEvent: (key) => {
        set((state) => {
            const keyIdx = KEY_TO_IDX.get(key)

            const correctTypes = state.correctTypes

            // 入力キーが定義済みのキーであったら
            if (keyIdx != null) {
                correctTypes[keyIdx] += 1
            }

            return { correctTypes: correctTypes, correct: state.correct + 1 }
        })
    },
    missEvent: (key: string, actual: string, prev: string) => {
        set((state) => {
            const actualIdx = KEY_TO_IDX.get(actual)
            const prevIdx = KEY_TO_IDX.get(prev)

            const missTypes = state.missTypes
            const missPrevTypes = state.missPrevTypes

            // 正解のキーが定義済みのキーであったら
            // ミスを記録する
            if (actualIdx != null) {
                missTypes[actualIdx] += 1
            }

            // 正解のキーと一つ前のキーがが定義済みのキーであったら
            // 一つ前のキーを記録する
            if (actualIdx != null && prevIdx != null) {
                missPrevTypes[actualIdx * KEY_TO_IDX.size + prevIdx] += 1
            }

            return { missTypes: missTypes, missPrevTypes: missPrevTypes, miss: state.miss + 1 }
        })
    },
    incrementTime: () => set((state) => ({ time: state.time + 1 })),
    postMonthLog: async (userId) => {
        try {
            const missPrevPerType = getMissPrevPerType(get().correctTypes, get().missPrevTypes)
            const requestBody: GameMonthAPIRequest = { userId: userId, missPrevPerType: missPrevPerType }
            const _ = await axios.post('/api/game/month', requestBody)
        } catch (error) {
            console.error('Error posting data:', error)
        }
    }
}))
