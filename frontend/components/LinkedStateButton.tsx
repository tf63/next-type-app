import React from 'react'
import { Button } from './Button'
import { Color } from '../types/types'

import styles from '../styles/Theme.module.css'
import buttonStyles from '../styles/Button.module.css'

type LinkedButtonProps = {
    navigateEvent: () => void
    text: string
    color: Color
}

export const LinkedStateButton: React.FC<LinkedButtonProps> = (props) => {
    return (
        <div
            className={`${styles.center_container} ${styles.link} ${buttonStyles.button_container}`}
            onClick={props.navigateEvent}
        >
            <Button text={props.text} color={props.color} />
        </div>
    )
}
