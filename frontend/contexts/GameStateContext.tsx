import { createContext, useContext } from 'react'

const GameStateContext = createContext<{ typeList: string[]; prefixList: string[] }>({
    typeList: [],
    prefixList: []
})

export const useGameStateContext = () => {
    return useContext(GameStateContext)
}

export default GameStateContext
