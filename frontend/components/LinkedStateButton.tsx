import React from 'react'
import { Button } from './Button'
import { Color } from '../types/types'
import { RLink } from './RLink'

import styles from '../styles/Theme.module.css'
import buttonStyles from '../styles/Button.module.css'
import { useRouter } from 'next/router'

type LinkedButtonProps = {
    href: string
    text: string
    state: any
    color: Color
}

export const LinkedStateButton: React.FC<LinkedButtonProps> = (props) => {
    const router = useRouter()
    const navigateTo = () => {
        router.push({
            pathname: props.href,
            query: { state: JSON.stringify(props.state) }
        })
    }
    return (
        <div
            className={`${styles.center_container} ${styles.link} ${buttonStyles.button_container}`}
            onClick={navigateTo}
        >
            <Button text={props.text} color={props.color} />
        </div>
    )
}
