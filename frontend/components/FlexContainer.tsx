import React, { ReactNode } from 'react'
import styles from '../styles/FlexContainer.module.css'

type PositionType = 'left' | 'center' | 'right'
type AlignType = 'top' | 'center' | 'bottom'

type FlexContainerProps = {
    position?: PositionType
    align?: AlignType
    children: ReactNode
}

const FlexContainer: React.FC<FlexContainerProps> = ({ position = 'center', align = 'center', children }) => {
    const positionToClass = new Map<PositionType, string>([
        ['left', styles.left],
        ['center', styles.center],
        ['right', styles.right]
    ])

    const alignToClass = new Map<AlignType, string>([
        ['top', styles.align_top],
        ['center', styles.align_center],
        ['bottom', styles.align_bottom]
    ])

    return (
        <div className={`${styles.flex} ${positionToClass.get(position)} ${alignToClass.get(align)}`}>{children}</div>
    )
}

export default FlexContainer
