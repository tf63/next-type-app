import React from 'react'
import { useRouter } from 'next/router'

import { Button, ButtonProps } from './Button'

type NavigateButtonProps = Omit<ButtonProps, `onClick`> & {
    href: string
}

/**
 *　押すとページ遷移するボタン
 * @param param0 href 遷移先
 * @param param0 color 色 初期値はblue
 * @param param0 flex フレックスかどうか 初期値はfalse
 * @param param0 children
 * @returns LoginButton
 */
export const NavigateButton: React.FC<NavigateButtonProps> = ({ children, href, color = 'blue', flex = false }) => {
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
