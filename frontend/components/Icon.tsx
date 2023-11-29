import React from 'react'
import styles from '../styles/Icon.module.css'

export type IconProps = {
    url: string
    alt?: string
    width?: number
}

const Icon: React.FC<IconProps> = ({ url, alt = '', width = 50 }) => {
    return <img style={{ width: width }} src={url} className={styles.icon} alt={alt} />
}

export default Icon
