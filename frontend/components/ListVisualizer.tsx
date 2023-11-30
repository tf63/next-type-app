import React from 'react'
import Card from './Card'

export type ListVisualizerProps = {
    list: number[]
}

const ListVisualizer: React.FC<ListVisualizerProps> = ({ list }) => {
    return <Card>{list}</Card>
}

export default ListVisualizer
