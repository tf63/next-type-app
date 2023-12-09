import React, { useEffect, useRef, useState } from 'react'
import KeyList from './KeyList'
import FlexContainer from './FlexContainer'
import { KEYBOARD_IDXS_SHIFT, KEYBOARD_IDXS_UNSHIFT, KEY_TO_IDX } from '@/lib/const'
import { decomposeOpacitys, getOpacitys } from '@/lib/format'

export type KeyBoardProps = {
    list: number[]
}

/**
 *
 * @param param0 list
 * @returns キーボード
 */
const KeyBoard: React.FC<KeyBoardProps> = ({ list }) => {
    const [initOpacityListsUnshift, initOpacityListsShift] = decomposeOpacitys(
        Array.from({ length: KEY_TO_IDX.size }, () => `100px`)
    )
    const [opacityLists, setOpacityLists] = useState(initOpacityListsUnshift)
    const [opacityListsUnshift, setOpacityListsUnshift] = useState(initOpacityListsUnshift)
    const [opacityListsShift, setOpacityListsShift] = useState(initOpacityListsShift)
    const [keyBoardIdxs, setKeyBoardIdxs] = useState(KEYBOARD_IDXS_UNSHIFT)

    // キーボードの段ごとのmargin
    const keyListMargins = ['0px', '20px', '40px', '60px']

    // キー入力の参照を取得
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (divRef.current != null) {
            divRef.current.focus()
        }
    }, [])

    useEffect(() => {
        // propsをopacitys (透明度) に変換する
        const opacitys = getOpacitys(list, 20)

        // opacitysをキー配列ごとに分割する
        const [opacityListsUnshift, opacityListsShift] = decomposeOpacitys(opacitys)

        // setState
        setOpacityListsUnshift(opacityListsUnshift)
        setOpacityListsShift(opacityListsShift)
        setOpacityLists(opacityListsUnshift)
    }, [list])

    // keydownを検知したら
    const handleKeyDown = (event: React.KeyboardEvent) => {
        const key = event.key

        // shiftキーが押されたらshift状態に切り替え
        if (key === 'Shift') {
            setKeyBoardIdxs(KEYBOARD_IDXS_SHIFT)
            setOpacityLists(opacityListsShift)
        }
    }

    // keyupを検知したら
    const handleKeyUp = (event: React.KeyboardEvent) => {
        const key = event.key

        // shiftキーが離れたらunshift状態に切り替え
        if (key === 'Shift') {
            setKeyBoardIdxs(KEYBOARD_IDXS_UNSHIFT)
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
                            <div key={index} style={{ marginLeft: keyListMargins[index], marginBottom: '20px' }}>
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
