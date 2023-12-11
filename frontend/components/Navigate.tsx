import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'

type NavigateButtonProps = {
    children: ReactNode
    href: string
}

/**
 * クリック時に遷移するラッパーオブジェクト
 * @param param0 children
 * @param param0 href 遷移先
 * @returns
 */
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
