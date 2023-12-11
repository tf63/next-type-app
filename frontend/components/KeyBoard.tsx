import React, { useEffect, useRef, useState } from 'react'
import KeyList from './KeyList'
import FlexContainer from './FlexContainer'
import { KEYBOARD_IDXS_SHIFT, KEYBOARD_IDXS_UNSHIFT } from '@/lib/const'
import { getOpacitys } from '@/lib/format'
import { useKeyBoardStore } from '@/states/KeyBoard'
import KeyRef from './KeyRef'

export type KeyBoardProps = {
    list: number[]
}

/**
 *
 * @param param0 list
 * @returns キーボード
 */
const KeyBoard: React.FC<KeyBoardProps> = ({ list }) => {
    const shift = useKeyBoardStore((state) => state.shift)
    const opacityLists = useKeyBoardStore((state) => state.opacityLists)
    const setOpacityLists = useKeyBoardStore((state) => state.setOpacityLists)
    const toggleShift = useKeyBoardStore((state) => state.toggleShift)

    // キーボードの段ごとのmargin
    const keyListMargins = ['0px', '20px', '40px', '60px']

    // propsが変化したらopacitysを設定し直す
    useEffect(() => {
        // propsをopacitys (透明度) に変換する
        const opacitys = getOpacitys(list, 20)
        setOpacityLists(opacitys)
    }, [list])

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const key = event.key

        // shiftキーが押されたらshift状態に切り替え
        if (key === 'Shift') {
            toggleShift(true)
        }
    }

    const handleKeyUp = (event: React.KeyboardEvent) => {
        const key = event.key

        // shiftキーが離れたらunshift状態に切り替え
        if (key === 'Shift') {
            toggleShift(false)
        }
    }

    return (
        <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
            <KeyRef>
                <FlexContainer position="center">
                    <div>
                        {shift
                            ? KEYBOARD_IDXS_SHIFT.map((keyIdxs, index) => {
                                  return (
                                      <div
                                          key={index}
                                          style={{ marginLeft: keyListMargins[index], marginBottom: '20px' }}
                                      >
                                          <KeyList opacitys={opacityLists.shift[index]} keyIdxs={keyIdxs} />
                                      </div>
                                  )
                              })
                            : KEYBOARD_IDXS_UNSHIFT.map((keyIdxs, index) => {
                                  return (
                                      <div
                                          key={index}
                                          style={{ marginLeft: keyListMargins[index], marginBottom: '20px' }}
                                      >
                                          <KeyList opacitys={opacityLists.unshift[index]} keyIdxs={keyIdxs} />
                                      </div>
                                  )
                              })}
                    </div>
                </FlexContainer>
            </KeyRef>
        </div>
    )
}

export default KeyBoard
