import React from 'react'

type SmallHeightProps = {
    height?: string
}

/**
 * 小さいスペース
 * @param param0 height 高さ
 * @returns
 */
export const SmallHeight: React.FC<SmallHeightProps> = ({ height = '50px' }) => {
    return <div style={{ marginTop: height }} />
}
