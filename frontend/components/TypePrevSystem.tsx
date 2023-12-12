import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { wrapKey } from '@/lib/format'
import KeyRef from './KeyRef'
import { KEY_TO_IDX } from '@/lib/const'

type TypeSystemProps = {
    children: ReactNode
    missPrevPerTypes: number[][]
    setOpacitys: Dispatch<SetStateAction<number[]>>
}

/**
 * ラップした要素にタイピングゲームのKeyEventを割り当てる
 * @param param0 children
 * @returns
 */
const TypePrevSystem: React.FC<TypeSystemProps> = ({ children, missPrevPerTypes, setOpacitys }) => {
    // キーイベントのハンドラ
    const handleKeyDown = (event: React.KeyboardEvent) => {
        const key = wrapKey(event.key, event.shiftKey)
        // ブラウザの動作があるキーを無効化する
        if (key === 'Tab' || key === ' ') {
            event.preventDefault()
            console.log('prevent default')
        }

        // 一部のキーはエスケープする
        if (key === 'Shift' || key === 'Control' || key === 'CapsLock' || key === 'Meta' || key === 'Alt') {
            console.log('disable key')
            return false
        }

        const idx = KEY_TO_IDX.get(key)
        if (idx != null) {
            const op = missPrevPerTypes[0].slice(idx * KEY_TO_IDX.size, (idx + 1) * KEY_TO_IDX.size)
            console.log('op', op)
            setOpacitys(op)
            console.log('key: ', key, 'idx: ', idx)
        }
    }

    // キーイベントのハンドラ
    const handleKeyUp = (event: React.KeyboardEvent) => {
        setOpacitys(Array.from({ length: KEY_TO_IDX.size }, () => 0))
    }

    return (
        <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
            <KeyRef>{children}</KeyRef>
        </div>
    )
}

export default TypePrevSystem
