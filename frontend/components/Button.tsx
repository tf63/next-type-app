import React, { ReactNode } from 'react'
import { Color } from '../types/types'
import styles from '../styles/Button.module.css'

export type ButtonProps = {
    children: ReactNode
    onClick: () => void
    color?: Color
    flex?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, onClick, color = 'blue', flex = false }) => {
    let className = `${styles.button}`

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
