import { useState } from 'react'
import React from 'react'
import TypeBoard from './TypeBoard'
import { GameState } from '@/interfaces/interfaces'

const TypeSystem: React.FC<{ typeList: string[]; prefixList: string[] }> = ({ typeList, prefixList }) => {
    const [state, setState] = useState<GameState>({
        typeList: typeList,
        prefixList: prefixList,
        indexText: 0,
        indexLine: 0
    })

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const key = event.key
        const text = state.typeList[state.indexLine]
        const indexText = state.indexText

        // ブラウザの動作があるキーを無効化する
        if (key == 'Tab' || key == ' ') {
            event.preventDefault()
            console.log('prevent default')
        }

        // 一部のキーはエスケープする
        if (key == 'Shift' || key == 'Control' || key == 'CapsLock' || key == 'Meta' || key == 'Alt') {
            console.log('disable key')
            return false
        }

        // 正誤判定
        if (indexText !== text.length) {
            // まだ行末に達していなかったら
            if (key == text[indexText]) {
                // 入力が合っていたら
                setState((prev) => ({ ...prev, indexText: prev.indexText + 1 }))
                // gameStateContext.correct()
                console.log('correct !!')
            } else {
                // 入力が間違っていたら
                // gameStateContext.miss()
                console.log('incorrect !!')
            }
        } else {
            // 行末に達していたら
            if (key === 'Enter') {
                // Enterが押されたら次の行へ移動
                setState((prev) => ({ ...prev, indexText: 0, indexLine: prev.indexLine + 1 }))
                // gameStateContext.correct()
                console.log('correct !!')

                if (state.indexLine == state.typeList.length - 1) {
                    // gameStateContext.navigate()
                }
            } else {
                // Enter以外のキーが押されたらミスとする
                // gameStateContext.miss()
                console.log('incorrect !!')
            }
        }

        console.log(key, state.indexText)
    }

    return <TypeBoard {...{ state: state, handleKeyDown: handleKeyDown }} />
}

export default TypeSystem
