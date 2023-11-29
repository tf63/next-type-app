import React from 'react'
import styles from '../styles/Icon.module.css'
import FlexContainer from './FlexContainer'
import Icon, { IconProps } from './Icon'

type UserIconProps = IconProps & {
    userName: string
}

const UserIcon: React.FC<UserIconProps> = ({ url, userName, alt = '' }) => {
    return (
        <FlexContainer position="center">
            <Icon url={url} alt={alt} />
            <div className={styles.user_name}>{userName}</div>
        </FlexContainer>
    )
}

export default UserIcon
