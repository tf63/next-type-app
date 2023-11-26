import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'

type NavigateButtonProps = {
    children: ReactNode
    href: string
}

const Navigate: React.FC<NavigateButtonProps> = ({ children, href }) => {
    const router = useRouter()

    const handleClick = () => {
        router.push(href)
    }

    return (
        <div style={{ cursor: 'pointer' }} onClick={handleClick}>
            {children}
        </div>
    )
}

export default Navigate
