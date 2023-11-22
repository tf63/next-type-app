import React from 'react'
import { useEffect, useRef } from 'react'
import { TypeLine, TypeLineWithCaret } from './TypeLine'
// import { TypeState } from '@/types/types'
import Card from './Card'
import styles from '../styles/TypeBoard.module.css'
import { useTypeContext } from '@/contexts/TypeContext'

type TypeBoardProps = {
    handleKeyDown: (event: React.KeyboardEvent) => false | undefined
}

const TypeBoard: React.FC<TypeBoardProps> = ({ handleKeyDown }) => {
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (divRef.current) {
            divRef.current.focus()
        }
    }, [])

    const ctx = useTypeContext()

    const typeItemList = []
    for (const [i, typeText] of ctx.typeList.entries()) {
        if (i < ctx.indexLine) {
            const typeLine = <TypeLine text={typeText} prefix={ctx.prefixList[i]} isTyped={true} />
            typeItemList.push(
                <li key={i} className={styles.type_board_item}>
                    {typeLine}
                </li>
            )
        } else if (i == ctx.indexLine) {
            const typeLine = <TypeLineWithCaret text={typeText} indexCaret={ctx.indexText} prefix={ctx.prefixList[i]} />
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
        <div className={styles.type_board} tabIndex={0} onKeyDown={handleKeyDown} ref={divRef}>
            <Card>
                <ul>{typeItemList}</ul>
            </Card>
        </div>
    )
}

export default TypeBoard
