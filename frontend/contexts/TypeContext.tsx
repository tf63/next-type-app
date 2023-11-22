import { TypeState } from '@/types/types'
import { createContext, useContext } from 'react'

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
