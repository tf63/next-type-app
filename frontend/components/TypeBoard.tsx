import React from 'react'
import { useEffect, useRef } from 'react'
import { TypeLine, TypeLineWithCaret } from './TypeLine'
import { GameState } from '@/types/types'
import Card from './Card'
import styles from '../styles/TypeBoard.module.css'
import { useGameStateContext } from '@/contexts/GameStateContext'

type TypeBoardProps = {
    state: GameState
    handleKeyDown: (event: React.KeyboardEvent) => false | undefined
}

const TypeBoard: React.FC<TypeBoardProps> = (props) => {
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (divRef.current) {
            divRef.current.focus()
        }
    }, [])

    const ctx = useGameStateContext()
    const typeItemList = []
    for (const [i, typeText] of ctx.typeList.entries()) {
        if (i < props.state.indexLine) {
            const typeLine = <TypeLine text={typeText} prefix={ctx.prefixList[i]} isTyped={true} />
            typeItemList.push(
                <li key={i} className={styles.type_board_item}>
                    {typeLine}
                </li>
            )
        } else if (i == props.state.indexLine) {
            const typeLine = (
                <TypeLineWithCaret text={typeText} indexCaret={props.state.indexText} prefix={ctx.prefixList[i]} />
            )
            typeItemList.push(
                <li key={i} className={styles.type_board_item}>
                    {typeLine}
                </li>
            )
        } else {
            const typeLine = <TypeLine text={typeText} prefix={ctx.prefixList[i]} isTyped={false} />
            typeItemList.push(
                <li key={i} className={styles.type_board_item}>
                    {typeLine}
                </li>
            )
        }
    }

    return (
        <div className={styles.type_board} tabIndex={0} onKeyDown={props.handleKeyDown} ref={divRef}>
            <Card>
                <ul>{typeItemList}</ul>
            </Card>
        </div>
    )
}

export default TypeBoard
