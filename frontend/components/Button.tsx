import React, { ReactNode } from 'react'
import { Color } from '../types/types'
import styles from '../styles/Button.module.css'

type ButtonProps = {
    children: ReactNode
    onClick: () => void
    color?: Color
}

const Button: React.FC<ButtonProps> = ({ children, onClick, color = 'blue' }) => {
    let className = `${styles.button} ${styles.button_container}`

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

    return (
        <div className={className} onClick={onClick}>
            {children}
        </div>
    )
}

export default Button
