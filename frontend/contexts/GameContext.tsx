import { GameState } from '@/types/types'
import { createContext, useContext } from 'react'

const GameContext = createContext<GameState>({
    correctEvent: () => {},
    missEvent: () => {},
    navigateEvent: () => {}
})

export const useGameContext = () => {
    return useContext(GameContext)
}

export default GameContext
