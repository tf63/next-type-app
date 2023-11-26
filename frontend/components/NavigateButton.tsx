import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'

import Button from './Button'
import { Color } from '../types/types'

type NavigateButtonProps = {
    children: ReactNode
    href: string
    color?: Color
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ children, href, color = 'blue' }) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(href)
    }

    return (
        <Button color={color} onClick={handleClick}>
            {children}
        </Button>
    )
}

export default NavigateButton
