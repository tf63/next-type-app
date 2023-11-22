import { useEffect, useState } from 'react'
import React from 'react'
import TypeBoard from './TypeBoard'
import { ProblemState } from '@/types/types'
import { useTypeContext } from '@/contexts/TypeContext'
import { useGameContext } from '@/contexts/GameContext'

const TypeSystem: React.FC = () => {
    const typeCtx = useTypeContext()
    const gameCtx = useGameContext()

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const key = event.key
        const text = typeCtx.typeList[typeCtx.indexLine]
        const indexText = typeCtx.indexText

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
                typeCtx.setIndexText(typeCtx.indexText + 1)
                gameCtx.correctEvent()
            } else {
                // 入力が間違っていたら
                gameCtx.missEvent()
            }
        } else {
            // 行末に達していたら
            if (key === 'Enter') {
                // Enterが押されたら次の行へ移動
                typeCtx.setIndexText(0)
                typeCtx.setIndexLine(typeCtx.indexLine + 1)
                gameCtx.correctEvent()

                if (typeCtx.indexLine == typeCtx.typeList.length - 1) {
                    gameCtx.navigateEvent()
                }
            } else {
                // Enter以外のキーが押されたらミスとする
                gameCtx.missEvent()
            }
        }

        console.log(key, typeCtx.indexText)
    }

    return <TypeBoard handleKeyDown={handleKeyDown} />
}

export default TypeSystem
