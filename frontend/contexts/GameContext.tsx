import { GameState } from '@/types/types'
import { createContext, useContext } from 'react'

const GameContext = createContext<GameState>({
    correctEvent: (_) => {},
    missEvent: (_) => {},
    navigateEvent: () => {}
})

export const useGameContext = () => {
    return useContext(GameContext)
}

export default GameContext
