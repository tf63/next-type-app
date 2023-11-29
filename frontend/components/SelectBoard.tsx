import { useEffect, useState } from 'react'
import axios from 'axios'
import Accordion from './Accordion'
import { SelectGroup, SelectGroupMultiLine } from './SelectGroup'
import {
    AlgorithmAPIResponse,
    LanguageAPIResponse,
    PatternAPIResponse,
    FrameworkAPIResponse
} from '@/interfaces/interfaces'
import { Label, SelectBoardProps } from '@/types/types'
import SmallHeight from './SmallHeight'

const SelectBoard: React.FC<SelectBoardProps> = (props) => {
    const categoryLabels: Label[] = [
        { id: 1, name: 'language' },
        { id: 2, name: 'framework' },
        { id: 3, name: 'algorithm' },
        { id: 4, name: 'pattern' }
    ]

    const sizeLabels: Label[] = [
        { id: 1, name: 'short' },
        { id: 2, name: 'medium' },
        { id: 3, name: 'long' }
    ]

    const [languageLabels, setLanguageLabels] = useState<Label[]>([])
    const [tagLabels, setTagLabels] = useState<Label[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/language')
                const result: LanguageAPIResponse[] = await response.data
                const label: Label[] = result.map((obj) => ({ id: obj.language_id, name: obj.name }))
                setLanguageLabels(label)
                props.setLanguage(label[0])
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
        props.setCategory(categoryLabels[0])
        props.setSize(sizeLabels[0])
    }, [])

    useEffect(() => {
        const fetchData = async (categoryName: string) => {
            try {
                if (categoryName === 'language') {
                    setTagLabels([{ id: 0, name: '' }])
                    props.setTag({ id: 0, name: '' })
                } else if (categoryName === 'framework') {
                    const response = await axios.get('/api/framework')
                    const result: FrameworkAPIResponse[] = await response.data
                    const label: Label[] = result.map((obj) => ({ id: obj.tool_id, name: obj.name }))
                    setTagLabels(label)
                    props.setTag(label[0])
                } else if (categoryName === 'algorithm') {
                    const response = await axios.get('/api/algorithm')
                    const result: AlgorithmAPIResponse[] = await response.data
                    const label: Label[] = result.map((obj) => ({ id: obj.algorithm_id, name: obj.name }))
                    setTagLabels(label)
                    props.setTag(label[0])
                } else if (categoryName === 'pattern') {
                    const response = await axios.get('/api/pattern')
                    const result: PatternAPIResponse[] = await response.data
                    const label: Label[] = result.map((obj) => ({ id: obj.pattern_id, name: obj.name }))
                    setTagLabels(label)
                    props.setTag(label[0])
                } else {
                    // pass
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData(props.category.name)
    }, [props.category])

    return (
        <>
            <p>Problem Category</p>
            <SelectGroup {...{ labels: categoryLabels, setLabel: props.setCategory }} />

            <SmallHeight />
            <p>Problem Size</p>
            <SelectGroup {...{ labels: sizeLabels, setLabel: props.setSize }} />

            <SmallHeight />
            {props.category.name !== 'framework' && (
                <Accordion summary={'Programming Language'}>
                    <SelectGroupMultiLine {...{ labels: languageLabels, setLabel: props.setLanguage }} />
                </Accordion>
            )}

            {props.category.name === 'framework' && (
                <Accordion summary={'Programming Framework'}>
                    <SelectGroupMultiLine {...{ labels: tagLabels, setLabel: props.setTag }} />
                </Accordion>
            )}

            <SmallHeight />
            {(props.category.name === 'algorithm' || props.category.name === 'pattern') && (
                <Accordion summary={'Problem Tag'}>
                    <SelectGroupMultiLine {...{ labels: tagLabels, setLabel: props.setTag }} />
                </Accordion>
            )}
        </>
    )
}

export default SelectBoard
