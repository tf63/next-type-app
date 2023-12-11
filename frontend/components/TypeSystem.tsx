import React, { ReactNode, useEffect, useRef } from 'react'
import { useTypeContext } from '@/contexts/TypeContext'
import { useGameContext } from '@/contexts/GameContext'
import { wrapKey } from '@/lib/format'

type TypeSystemProps = {
    children: ReactNode
}

/**
 * ラップした要素にタイピングゲームのKeyEventを割り当てる
 * @param param0 children
 * @returns
 */
const TypeSystem: React.FC<TypeSystemProps> = ({ children }) => {
    const typeCtx = useTypeContext()
    const gameCtx = useGameContext()

    // キーイベントの参照
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (divRef.current != null) {
            divRef.current.focus()
        }
    }, [])

    // キーイベントのハンドラ
    const handleKeyDown = (event: React.KeyboardEvent) => {
        // 押されたキーをラップしてから取得
        const key = wrapKey(event.key, event.shiftKey)
        // 行内のテキスト
        const text = typeCtx.typeList[typeCtx.indexLine]
        // テキスト内の位置
        const indexText = typeCtx.indexText

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
                typeCtx.setIndexText(typeCtx.indexText + 1)
                // 正解時のイベント
                gameCtx.correctEvent(key)
            } else {
                // 入力が不正解のとき
                const prevKey = indexText == 0 ? '' : text[indexText - 1]

                // 不正解時のイベント
                gameCtx.missEvent(key, text[indexText], prevKey)
            }
        } else {
            // 行末に達している場合
            if (key === 'Enter') {
                // Enterキーが押されたら正解

                // Enterが押されたら次の行へ移動
                typeCtx.setIndexText(0)
                typeCtx.setIndexLine(typeCtx.indexLine + 1)

                // 正解時のイベント
                gameCtx.correctEvent(key)

                // 最後の行だったらゲーム終了
                if (typeCtx.indexLine === typeCtx.typeList.length - 1) {
                    // ベージ遷移
                    gameCtx.navigateEvent()
                }
            } else {
                // Enter以外のキーが押されたら不正解とする
                const prevKey = indexText == 0 ? '' : text[indexText - 1]

                // 不正解時のイベント
                gameCtx.missEvent(key, text[indexText], prevKey)
            }
        }
    }

    return (
        <div style={{ outline: 'none' }} onKeyDown={handleKeyDown} tabIndex={0} ref={divRef}>
            {children}
        </div>
    )
}

export default TypeSystem
