import React, { ReactNode } from 'react'
import { wrapKey } from '@/lib/format'
import { KeyRef } from '@/features/logic'
import { useGameStore } from '@/states/Game'

type TypeSystemProps = {
    children: ReactNode
    navigateEvent: () => void
}

/**
 * ラップした要素にタイピングゲームのKeyEventを割り当てる
 * @param param0 children
 * @returns
 */
export const TypeSystem: React.FC<TypeSystemProps> = ({ children, navigateEvent }) => {
    const typeList = useGameStore((state) => state.typeList)
    const indexLine = useGameStore((state) => state.indexLine)
    const indexText = useGameStore((state) => state.indexText)
    const resetIndexText = useGameStore((state) => state.resetIndexText)
    const incrementIndexLine = useGameStore((state) => state.incrementIndexLine)
    const incrementIndexText = useGameStore((state) => state.incrementIndexText)
    const correctEvent = useGameStore((state) => state.correctEvent)
    const missEvent = useGameStore((state) => state.missEvent)

    // キーイベントのハンドラ
    const handleKeyDown = (event: React.KeyboardEvent) => {
        // 押されたキーをラップしてから取得
        const key = wrapKey(event.key, event.shiftKey)
        // 行内のテキスト
        const text = typeList[indexLine]

        // ブラウザの動作があるキーを無効化する
        if (key === 'Tab' || key === ' ') {
            event.preventDefault()
        }

        // 一部のキーはエスケープする
        if (key === 'Shift' || key === 'Control' || key === 'CapsLock' || key === 'Meta' || key === 'Alt') {
            return false
        }

        // 正誤判定
        if (indexText !== text.length) {
            // まだ行末に達していない場合
            if (key === text[indexText]) {
                // 入力が正解のとき

                // indexを加算
                incrementIndexText()
                // 正解時のイベント
                correctEvent(key)
            } else {
                // 入力が不正解のとき
                const prevKey = indexText == 0 ? '' : text[indexText - 1]

                // 不正解時のイベント
                missEvent(key, text[indexText], prevKey)
            }
        } else {
            // 行末に達している場合
            if (key === 'Enter') {
                // Enterキーが押されたら正解

                // Enterが押されたら次の行へ移動
                resetIndexText()
                incrementIndexLine()

                // 正解時のイベント
                correctEvent(key)

                // 最後の行だったらゲーム終了
                if (indexLine === typeList.length - 1) {
                    // ベージ遷移
                    navigateEvent()
                }
            } else {
                // Enter以外のキーが押されたら不正解とする
                const prevKey = indexText == 0 ? '' : text[indexText - 1]

                // 不正解時のイベント
                missEvent(key, text[indexText], prevKey)
            }
        }
    }

    return (
        <div onKeyDown={handleKeyDown}>
            <KeyRef>{children}</KeyRef>
        </div>
    )
}
