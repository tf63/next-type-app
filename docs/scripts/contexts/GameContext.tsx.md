import { createContext, useContext } from 'react'

export type GameState = {
    correctEvent: (key: string) => void
    missEvent: (key: string, actual: string, prev: string) => void
    navigateEvent: () => void
}

const GameContext = createContext<GameState>({
    correctEvent: (_) => {},
    missEvent: (_) => {},
    navigateEvent: () => {}
})

export const useGameContext = () => {
    return useContext(GameContext)
}

export default GameContext
