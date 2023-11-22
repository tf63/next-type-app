import type { NextPage } from 'next'
import Card from '@/components/Card'
import { LinkedStateButton } from '@/components/LinkedStateButton'
import SelectBoard from '@/components/SelectBoard'
import styles from '../styles/Select.module.css'
import { Label, SelectBoardProps } from '@/types/types'
import { useState } from 'react'

const Select: NextPage = () => {
    const [category, setCategory] = useState<Label>({ id: 0, name: '' })
    const [size, setSize] = useState<Label>({ id: 0, name: '' })
    const [tag, setTag] = useState<Label>({ id: 0, name: '' })
    const [language, setLanguage] = useState<Label>({ id: 0, name: '' })

    const selectBoardProps: SelectBoardProps = {
        category: category,
        setCategory: setCategory,
        setSize: setSize,
        setLanguage: setLanguage,
        setTag: setTag
    }

    const state = { category: category, size: size, tag: tag, language: language }
    return (
        <main className={styles.main}>
            <Card>
                <span>{`Language: ${language.name}, Size: ${size.name}`}</span>
                {category.name !== 'language' && <span>{`, Tag: ${tag.name}`}</span>}
            </Card>
            <LinkedStateButton href="/game" state={state} text="Game" color="blue" />
            <SelectBoard {...selectBoardProps} />
        </main>
    )
}

export default Select
