import React from 'react'
import theme from '../styles/Theme.module.css'
import styles from '../styles/Icon.module.css'

interface IconProps {
    url: string
}

interface UserIconProps extends IconProps {
    userName: string
}

export const Icon: React.FC<IconProps> = ({ url }) => {
    return <img src={url} className={styles.icon} />
}

const UserIcon: React.FC<UserIconProps> = ({ url, userName }) => {
    return (
        <div className={theme.center_container}>
            <Icon url={url} />
            <div className={styles.user_name}>{userName}</div>
        </div>
    )
}

export default UserIcon
