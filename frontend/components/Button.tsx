import React from 'react'
import styles from '../styles/Button.module.css'
import { Color } from '../types/types'

type ButtonProps = {
    text: string
    color: Color
}

export const Button: React.FC<ButtonProps> = ({ text, color }) => {
    switch (color) {
        case 'blue':
            return <div className={`${styles.button} ${styles.blue}`}>{text}</div>
        case 'green':
            return <div className={`${styles.button} ${styles.green}`}>{text}</div>
        case 'white':
            return <div className={`${styles.button}`}>{text}</div>
        case 'none':
            return <div className={`${styles.button}`}>{text}</div>
    }
}
