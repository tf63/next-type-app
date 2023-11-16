import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SelectGroup, SelectGroupMultiLine } from './SelectGroup'
import Card from './Card'
import styles from '../styles/SelectBoard.module.css'
import axios from 'axios'
import { AlgorithmAPI, LanguageAPI, PatternAPI, TagAPI, ToolAPI } from '@/interfaces/interfaces'
import { DropDown } from './DropDown'
import { Accordion } from './Accordion'

const SelectBoard: React.FC = () => {
    // 初期値周りが汚い
    // SelectGroupの初期値とtagの初期値が別々で指定されている
    const [category, setCategory] = useState('language')
    const categoryNames = ['language', 'framework', 'algorithm', 'pattern']
    const [size, setSize] = useState('short')
    const sizeNames = ['short', 'medium', 'long']
    const [language, setLanguage] = useState('')
    const [languageNames, setLanguageNames] = useState<string[]>([])
    const [tag, setTag] = useState('')
    const [tagNames, setTagNames] = useState<string[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/language')
                const result: LanguageAPI[] = await response.data
                const languageNames = result.map((obj) => obj.name)
                setLanguageNames(languageNames)
                setLanguage(languageNames[0])
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    let tagSelectComponent = <div />
    useEffect(() => {
        console.log(category)
        const setResultData = (result: TagAPI[]) => {
            const tagNames = result.map((obj) => obj.name)
            setTagNames(tagNames)
            setTag(tagNames[0])
        }

        const fetchData = async (category: string) => {
            try {
                if (category === 'framework') {
                    const response = await axios.get('/api/tool')
                    const result: ToolAPI[] = await response.data
                    setResultData(result)
                } else if (category === 'algorithm') {
                    const response = await axios.get('/api/algorithm')
                    const result: AlgorithmAPI[] = await response.data
                    setResultData(result)
                } else if (category === 'pattern') {
                    const response = await axios.get('/api/pattern')
                    const result: PatternAPI[] = await response.data
                    setResultData(result)
                } else {
                    // pass
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData(category)
    }, [category])

    return (
        <>
            <p>Problem Category</p>
            <SelectGroup {...{ labelNames: categoryNames, setLabel: setCategory }} />
            <p>Problem Size</p>
            <SelectGroup {...{ labelNames: sizeNames, setLabel: setSize }} />
            {/* <p>Programming Language</p> */}

            <Accordion summary={'Programming Language'}>
                <SelectGroupMultiLine {...{ labelNames: languageNames, setLabel: setLanguage }} />
            </Accordion>
            {category !== 'language' && (
                <Accordion summary={'Problem Tag'}>
                    <SelectGroupMultiLine {...{ labelNames: tagNames, setLabel: setTag }} />
                </Accordion>
            )}
            {/* <Card>{`Problem: ${category}, Size: ${size}, Language: ${language}`}</Card> */}
        </>
    )
}

export default SelectBoard
