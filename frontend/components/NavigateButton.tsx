import React from 'react'
import { useRouter } from 'next/router'

import Button, { ButtonProps } from './Button'

type NavigateButtonProps = Omit<ButtonProps, `onClick`> & {
    href: string
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ children, href, color = 'blue', flex = false }) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(href)
    }

    return (
        <Button color={color} flex={flex} onClick={handleClick}>
            {children}
        </Button>
    )
}

export default NavigateButton
