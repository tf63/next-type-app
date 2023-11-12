import React from 'react'
import { Button } from './Button'
import { Color } from '../types/types'
import { RLink } from './RLink'

import styles from '../styles/Theme.module.css'
import buttonStyles from '../styles/Button.module.css'

type LinkedButtonProps = {
    href: string
    text: string
    color: Color
}

export const LinkedButton: React.FC<LinkedButtonProps> = (props) => {
    return (
        <div className={`${styles.center_container} ${buttonStyles.button_container}`}>
            <RLink href={props.href}>
                <Button text={props.text} color={props.color} />
            </RLink>
        </div>
    )
}
