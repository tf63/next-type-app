import { SetStateAction, createContext, useContext } from 'react'
import { Dispatch } from 'react'

export type TypeState = {
    indexText: number
    setIndexText: Dispatch<SetStateAction<number>>
    indexLine: number
    setIndexLine: Dispatch<SetStateAction<number>>
    typeList: string[]
    prefixList: string[]
}
const TypeContext = createContext<TypeState>({
    indexText: 0,
    setIndexText: () => {},
    indexLine: 0,
    setIndexLine: () => {},
    typeList: [],
    prefixList: []
})

export const useTypeContext = () => {
    return useContext(TypeContext)
}

export default TypeContext
