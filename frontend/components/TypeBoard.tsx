import React from 'react'
import { TypeLine, TypeLineWithCaret } from './TypeLine'
import Card from './Card'
import styles from '../styles/TypeBoard.module.css'
import { useTypeContext } from '@/contexts/TypeContext'

/**
 * タイピングの問題文を表示するボード
 * @returns
 */
const TypeBoard: React.FC = () => {
    const ctx = useTypeContext()

    return (
        <div className={styles.type_board}>
            <Card>
                <ul>
                    {ctx.typeList.map((typeText, index) => {
                        if (index < ctx.indexLine) {
                            // タイプ済みの行
                            return (
                                <li key={index} className={styles.type_board_item}>
                                    <TypeLine text={typeText} prefix={ctx.prefixList[index]} isTyped={true} />
                                </li>
                            )
                        } else if (index === ctx.indexLine) {
                            // 現在ターゲットにしている行
                            return (
                                <li key={index} className={styles.type_board_item}>
                                    <TypeLineWithCaret
                                        text={typeText}
                                        indexCaret={ctx.indexText}
                                        prefix={ctx.prefixList[index]}
                                    />
                                </li>
                            )
                        } else {
                            // タイプしていない行
                            return (
                                <li key={index} className={styles.type_board_item}>
                                    <TypeLine text={typeText} prefix={ctx.prefixList[index]} isTyped={false} />
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
