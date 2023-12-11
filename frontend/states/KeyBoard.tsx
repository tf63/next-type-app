import { KEY_TO_IDX } from '@/lib/const'
import { decomposeOpacitys } from '@/lib/format'
import { create } from 'zustand'

type OpacityLists = {
    unshift: string[][]
    shift: string[][]
}

type State = {
    opacityLists: OpacityLists
    shift: boolean
}

type Action = {
    setOpacityLists: (opacitys: string[]) => void
    toggleShift: (shift: boolean) => void
}

const getOpacityLists = (opacitys: string[]) => {
    const [opacityListsUnshift, opacityListsShift] = decomposeOpacitys(opacitys)
    return {
        unshift: opacityListsUnshift,
        shift: opacityListsShift
    }
}

// Create your store, which includes both state and (optionally) actions
export const useKeyBoardStore = create<State & Action>((set) => {
    const opacityLists = getOpacityLists(Array.from({ length: KEY_TO_IDX.size }, () => '100px'))

    return {
        opacityLists: opacityLists,
        shift: false,
        setOpacityLists: (opacitys) => set(() => ({ opacityLists: getOpacityLists(opacitys) })),
        toggleShift: (shift) => set(() => ({ shift: shift }))
    }
})
