import React from 'react'
import styles from '@/styles/Icon.module.css'
import { Icon, IconProps, FlexContainer } from '@/features/ui'

type UserIconProps = IconProps & {
    userName: string
}

/**
 * ユーザーのアイコン + 名前
 * @param param0 url アイコン画像のURL
 * @param param0 userName ユーザー名
 * @param param0 alt アイコンのalt
 * @returns
 */
export const UserIcon: React.FC<UserIconProps> = ({ url, userName, alt = '' }) => {
    return (
        <FlexContainer position="center">
            <Icon url={url} alt={alt} />
            <div className={styles.user_name}>{userName}</div>
        </FlexContainer>
    )
}
