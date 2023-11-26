import styles from '../styles/Theme.module.css'
import userIconStyles from '../styles/UserIcon.module.css'
import React from 'react'
import Card from './Card'

type UserIconProps = {
    url: string
    userName: string
}

const UserIcon: React.FC<UserIconProps> = ({ url, userName }) => {
    return (
        <div className={`${styles.center_container}`}>
            <img src={url} className={userIconStyles.img_circle} />
            <div className={userIconStyles.user_name}>{userName}</div>
        </div>
    )
}

export default UserIcon
