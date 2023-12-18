import {
    ProfileLogAPIRequest,
    ProfileLogAPIResponse,
    ProfileMonthAPIRequest,
    ProfileMonthAPIResponse,
    ProfileSummaryAPIRequest,
    ProfileSummaryAPIResponse
} from '@/interfaces/interfaces'
import { KEY_TO_IDX } from '@/lib/const'
import { getYearMonth } from '@/lib/format'
import { Label, ProfileSummary, Selector } from '@/types/types'
import axios from 'axios'
import { create } from 'zustand'

type State = {
    month: Selector
    page: number
    logs: ProfileLogAPIResponse[]
    summarys: ProfileSummary[]
    missPrevPerTypes: number[][]
    opacityValues: number[]
}

type Action = {
    setMonth: (id: number) => void
    setProfileSummary: (requestBody: ProfileSummaryAPIRequest) => void
    setProfileMonth: (requestBody: ProfileMonthAPIRequest) => void
    setProfileLog: (requestBody: ProfileLogAPIRequest) => void
    updatePage: (page: number) => void
    updateOpacityValues: (opacityValues: number[]) => void
}

// Create your store, which includes both state and (optionally) actions
export const useProfileStore = create<State & Action>((set) => ({
    month: { id: 0, labels: [{ id: 0, name: '' }] },
    page: 0,
    logs: [],
    summarys: [],
    opacityValues: Array.from({ length: KEY_TO_IDX.size }, () => 0),
    missPrevPerTypes: [Array.from({ length: KEY_TO_IDX.size * KEY_TO_IDX.size }, () => 0)],
    setMonth: (id) => {
        set((state) => {
            return { month: { id: id, labels: state.month.labels } }
        })
    },
    setProfileSummary: async (requestBody) => {
        try {
            const response = await axios.post('/api/profile/summary', requestBody)
            const responseData: ProfileSummaryAPIResponse[] = response.data
            if (responseData.length == 0) {
                return
            }

            const monthLabels: Label[] = []
            const summarys: ProfileSummary[] = []

            responseData.forEach((response, index) => {
                const { month, correct, miss, speed } = response
                // 2000/01の形式に変換
                const yearMonth = getYearMonth(month)

                summarys.push({ month: yearMonth, correct: correct, miss: miss, speed: speed })
                monthLabels.push({ id: index, name: yearMonth })
            })

            set(() => ({
                month: { id: monthLabels[0].id, labels: monthLabels },
                summarys: summarys
            }))
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    },
    setProfileMonth: async (requestBody) => {
        try {
            const response = await axios.post('/api/profile/month/', requestBody)
            const responseData: ProfileMonthAPIResponse[] = response.data
            if (responseData.length == 0) {
                return
            }

            const missPrevPerTypes = responseData.map((data) => data.miss_prev_per_type)
            set(() => ({ missPrevPerTypes: missPrevPerTypes }))
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    },
    setProfileLog: async (requestBody) => {
        try {
            const response = await axios.post('/api/profile/log', requestBody)
            console.log('log', response.data)
            set(() => ({ logs: response.data }))
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    },
    updatePage: (page) => {
        set(() => ({ page: page }))
    },
    updateOpacityValues: (opacityValues) => {
        set(() => ({ opacityValues: opacityValues }))
    }
}))
