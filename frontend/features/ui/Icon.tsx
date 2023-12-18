import React from 'react'
import styles from '@/styles/Icon.module.css'

export type IconProps = {
    url: string
    alt?: string
    width?: number
}

/**
 * 円状にくり抜いたアイコン画像
 * widthのサイズで正方形にクロップされる
 * @param param0 url アイコン画像のURL
 * @param param0 alt 説明文 default: ''
 * @param param0 width 画像サイズ default: 50
 * @returns
 */
export const Icon: React.FC<IconProps> = ({ url, alt = '', width = 50 }) => {
    return <img style={{ width: width }} src={url} className={styles.icon} alt={alt} />
}
