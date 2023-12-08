import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import styles from '../styles/KeyBoard.module.css'
import KeyList from './KeyList'
import FlexContainer from './FlexContainer'
import { KEY_TO_IDX } from '@/lib/const'
export type KeyBoardProps = {
    list: number[]
}

const KeyBoard: React.FC<KeyBoardProps> = ({ list }) => {
    const getOpacitys = (list: number[]) => {
        const maxValue = Math.max(...list)
        const opacitys = list.map((value) => {
            if (maxValue > 0.0001) {
                const opacity = 20 + (125 * value) / maxValue
                return `${Math.min(opacity, 100).toFixed(0)}%`
            } else {
                return `100%`
            }
        })

        return opacitys
    }

    const decomposeOpacitys = (opacitys: string[]) => {
        const opacityListsUnshift = [
            opacitys.slice(0, 13),
            opacitys.slice(13, 25),
            opacitys.slice(25, 37),
            opacitys.slice(37, 48).concat([opacitys[opacitys.length - 1]])
        ]

        const opacityListsShift = [
            opacitys.slice(48, 61),
            opacitys.slice(61, 73),
            opacitys.slice(73, 85),
            opacitys.slice(85, 97)
        ]

        return [opacityListsUnshift, opacityListsShift]
    }

    const keyBoardCharsUnshift = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '^', '¥'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '@', '['],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', ':', ']'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '\\', ' ']
    ]

    const keyBoardCharsShift = [
        ['!', '"', '#', '$', '%', '&', `'`, '(', ')', ' ', '=', '~', '|'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '`', '{'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '+', '*', '}'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '_', ' ']
    ]

    const keyBoardIdxsShift = keyBoardCharsShift.map((keyListChars) => {
        return keyListChars.map((val) => {
            const idx = KEY_TO_IDX.get(val)
            if (idx != null) {
                return idx
            } else {
                return 100
            }
        })
    })

    const keyBoardIdxsUnshift = keyBoardCharsUnshift.map((keyListChars) => {
        return keyListChars.map((val) => {
            const idx = KEY_TO_IDX.get(val)
            if (idx != null) {
                return idx
            } else {
                return -1
            }
        })
    })

    const [initOpacityList, _] = decomposeOpacitys(Array.from({ length: KEY_TO_IDX.size }, () => '100px'))
    const [opacityLists, setOpacityLists] = useState(initOpacityList)
    const [opacityListsUnshift, setOpacityListsUnshift] = useState(initOpacityList)
    const [opacityListsShift, setOpacityListsShift] = useState(initOpacityList)
    const [keyBoardIdxs, setKeyBoardChars] = useState(keyBoardIdxsUnshift)

    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (divRef.current != null) {
            divRef.current.focus()
        }
    }, [])

    useEffect(() => {
        const opacitys = getOpacitys(list)
        const [opacityListsUnshift, opacityListsShift, opacitySpace] = decomposeOpacitys(opacitys)
        setOpacityListsUnshift(opacityListsUnshift)
        setOpacityListsShift(opacityListsShift)
        setOpacityLists(opacityListsUnshift)
    }, [list])

    const keyListPaddings = ['0px', '20px', '40px', '60px']

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const key = event.key
        if (key === 'Shift') {
            setKeyBoardChars(keyBoardIdxsShift)
            setOpacityLists(opacityListsShift)
        }
    }

    const handleKeyUp = (event: React.KeyboardEvent) => {
        const key = event.key
        if (key === 'Shift') {
            setKeyBoardChars(keyBoardIdxsUnshift)
            setOpacityLists(opacityListsUnshift)
        }
    }

    return (
        <div
            style={{ border: 'none', outline: 'none' }}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            tabIndex={0}
            ref={divRef}
        >
            <FlexContainer position="center">
                <div>
                    {keyBoardIdxs.map((keyIdxs, index) => {
                        return (
                            <div key={index} style={{ marginLeft: keyListPaddings[index], marginBottom: '20px' }}>
                                <KeyList opacitys={opacityLists[index]} keyIdxs={keyIdxs} />
                            </div>
                        )
                    })}
                </div>
            </FlexContainer>
        </div>
    )
}

export default KeyBoard
