import React from 'react'
import { TypeLine, TypeLineWithCaret } from './TypeLine'
import Card from './Card'
import styles from '../styles/TypeBoard.module.css'
import { useGameStore } from '@/states/Game'

/**
 * タイピングの問題文を表示するボード
 * @returns
 */
const TypeBoard: React.FC = () => {
    const typeList = useGameStore((state) => state.typeList)
    const indexLine = useGameStore((state) => state.indexLine)
    const indexText = useGameStore((state) => state.indexText)
    const prefixList = useGameStore((state) => state.prefixList)

    return (
        <div className={styles.type_board}>
            <Card>
                <ul>
                    {typeList.map((typeText, index) => {
                        if (index < indexLine) {
                            // タイプ済みの行
                            return (
                                <li key={index} className={styles.type_board_item}>
                                    <TypeLine text={typeText} prefix={prefixList[index]} isTyped={true} />
                                </li>
                            )
                        } else if (index === indexLine) {
                            // 現在ターゲットにしている行
                            return (
                                <li key={index} className={styles.type_board_item}>
                                    <TypeLineWithCaret
                                        text={typeText}
                                        indexCaret={indexText}
                                        prefix={prefixList[index]}
                                    />
                                </li>
                            )
                        } else {
                            // タイプしていない行
                            return (
                                <li key={index} className={styles.type_board_item}>
                                    <TypeLine text={typeText} prefix={prefixList[index]} isTyped={false} />
                                </li>
                            )
                        }
                    })}
                </ul>
            </Card>
        </div>
    )
}

export default TypeBoard
