import React from 'react'
import { useEffect, useRef } from 'react'
import { TypeLine, TypeLineWithCaret } from './TypeLine'
import { GameState } from '../interfaces/interfaces'
import Card from './Card'
import styles from '../styles/TypeBoard.module.css'

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

    const typeItemList = []
    for (const [i, typeText] of props.state.typeList.entries()) {
        let typeLine
        if (i < props.state.indexLine) {
            typeLine = <TypeLine text={typeText} prefix={props.state.prefixList[i]} isTyped={true} />
        } else if (i == props.state.indexLine) {
            typeLine = (
                <TypeLineWithCaret
                    text={typeText}
                    indexCaret={props.state.indexText}
                    prefix={props.state.prefixList[i]}
                />
            )
        } else {
            typeLine = <TypeLine text={typeText} prefix={props.state.prefixList[i]} isTyped={false} />
        }

        typeItemList.push(
            <li key={i} className={styles.type_board_item}>
                {typeLine}
            </li>
        )
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
