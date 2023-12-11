import React, { ReactNode } from 'react'
import { Color } from '../types/types'
import styles from '../styles/Button.module.css'

export type ButtonProps = {
    children: ReactNode
    onClick: () => void
    color?: Color
    flex?: boolean
}

/**
 *
 * @param param0 color 色 初期値はblue
 * @param param0 flex フレックスかどうか 初期値はfalse
 * @param param0 onClick
 * @param param0 children
 * @returns
 */
const Button: React.FC<ButtonProps> = ({ children, onClick, color = 'blue', flex = false }) => {
    // 共通クラス
    let className = `${styles.button}`

    // クラスに色情報を割り当て
    switch (color) {
        case 'blue':
            className += ` ${styles.blue}`
            break
        case 'green':
            className += ` ${styles.green}`
            break
        case 'github':
            className += ` ${styles.github}`
            break
        case 'none':
            break
        default:
            className += ` ${styles.blue}`
            break
    }

    // クラスにflex情報を割り当て
    if (flex) {
        className += ` ${styles.flex_button}`
    }

    return (
        <div className={className} onClick={onClick}>
            {children}
        </div>
    )
}

export default Button
