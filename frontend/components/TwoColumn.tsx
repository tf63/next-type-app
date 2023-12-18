import { ReactNode } from 'react'
import FlexContainer, { FlexContainerProps } from './FlexContainer'

type TwoColumnProps = {
    children: [ReactNode, ReactNode]
}

/**
 * 2つの子要素を等しい幅で横並びにする
 * @param param0 children 2つ必要
 * @returns
 */
const TwoColumn: React.FC<TwoColumnProps & Omit<FlexContainerProps, 'children'>> = ({
    children,
    position = 'center',
    align = 'center'
}) => {
    return (
        <FlexContainer position={position} align={align}>
            <div style={{ width: '50%' }}>{children[0]}</div>
            <div style={{ width: '50%' }}>{children[1]}</div>
        </FlexContainer>
    )
}

export default TwoColumn
