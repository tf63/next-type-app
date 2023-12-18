import React, { ReactNode } from 'react'
import { wrapKey } from '@/lib/format'
import { KEY_TO_IDX } from '@/lib/const'
import { useProfileStore } from '@/states/Profile'

type TypeSystemProps = {
    children: ReactNode
}

/**
 * ラップした要素にタイピングゲームのKeyEventを割り当てる
 * @param param0 children
 * @returns
 */
const TypePrevSystem: React.FC<TypeSystemProps> = ({ children }) => {
    const missPrevPerTypes = useProfileStore((state) => state.missPrevPerTypes)
    const updateOpacityValues = useProfileStore((state) => state.updateOpacityValues)

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

        // キーのidxを取得
        const idx = KEY_TO_IDX.get(key)
        if (idx != null) {
            // キーの前の入力のミス回数を取り出す
            const opacityValues = missPrevPerTypes[0].slice(idx * KEY_TO_IDX.size, (idx + 1) * KEY_TO_IDX.size)
            updateOpacityValues(opacityValues)
        }
    }

    // キーイベントのハンドラ
    const handleKeyUp = (event: React.KeyboardEvent) => {
        // キーが離れたら初期状態に戻す
        updateOpacityValues(Array.from({ length: KEY_TO_IDX.size }, () => 0))
    }

    return (
        <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
            {children}
        </div>
    )
}

export default TypePrevSystem
