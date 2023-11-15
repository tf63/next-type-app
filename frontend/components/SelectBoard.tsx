import { useState } from 'react'
import { SelectGroup, SelectGroupMultiLine } from './SelectGroup'
import Card from './Card'
import styles from '../styles/SelectBoard.module.css'

const SelectBoard: React.FC = () => {
    // 初期値周りが汚い
    // SelectGroupの初期値とtagの初期値が別々で指定されている
    const [category, setCategory] = useState('language')
    const categoryNames = ['language', 'framework', 'algorithm', 'pattern']
    const [size, setSize] = useState('short')
    const sizeNames = ['short', 'medium', 'long']
    const [tag, setTag] = useState('')
    const tagNames = ['a', 'b', 'c', 'd', 'e']

    return (
        <>
            <p>Problem Category </p>
            <SelectGroup {...{ labelNames: categoryNames, setLabel: setCategory }} />
            <p>Problem Size </p>
            <SelectGroup {...{ labelNames: sizeNames, setLabel: setSize }} />
            <p>Tag </p>
            <SelectGroupMultiLine {...{ labelNames: tagNames, setLabel: setTag }} />
            <Card>{`Problem: ${category}, Size: ${size}, Tag: ${tag}`}</Card>
        </>
    )
}

export default SelectBoard
