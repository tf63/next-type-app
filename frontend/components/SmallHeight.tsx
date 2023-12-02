import React from 'react'

type SmallHeightProps = {
    height?: 'string'
}

const SmallHeight: React.FC<SmallHeightProps> = ({ height = '50px' }) => {
    return <div style={{ marginTop: height }} />
}

export default SmallHeight
