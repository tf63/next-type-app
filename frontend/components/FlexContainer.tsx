import React, { ReactNode } from 'react'
import styles from '../styles/FlexContainer.module.css'

type PositionType = 'left' | 'center' | 'right'
type AlignType = 'top' | 'center' | 'bottom'

type FlexContainerProps = {
    position?: PositionType
    align?: AlignType
    children: ReactNode
}

/**
 * Flexで子要素をラップするコンテナ
 * @param param0 position 横方向の位置 left or center (default) or right
 * @param param0 align 縦方向の位置 top or center (default) or bottom
 * @returns FlexContainer
 */
const FlexContainer: React.FC<FlexContainerProps> = ({ position = 'center', align = 'center', children }) => {
    // mapの戻り値がundefinedになりうる?

    // positionをクラス名に変換するmap
    const positionToClass = new Map<PositionType, string>([
        ['left', styles.left],
        ['center', styles.center],
        ['right', styles.right]
    ])

    // alignをクラス名に変換するmap
    const alignToClass = new Map<AlignType, string>([
        ['top', styles.align_top],
        ['center', styles.align_center],
        ['bottom', styles.align_bottom]
    ])

    return (
        <div className={`${styles.flex} ${positionToClass.get(position)!} ${alignToClass.get(align)!}`}>{children}</div>
    )
}

export default FlexContainer
