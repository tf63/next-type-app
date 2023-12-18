import React from 'react'
import styles from '@/styles/KeyBoard.module.css'
import { FlexContainer } from '@/features/ui'
import { getKey } from '@/lib/format'

export type KeyListProps = {
    keyIdxs: number[]
    opacitys: string[]
}

/**
 * assert keyIdxs.length === opacitys.length
 * @param param0 keyIdxs idxに変換したキー
 * @param param0 opacitys 透明度
 * @returns キーボードの行
 */
export const KeyList: React.FC<KeyListProps> = ({ keyIdxs, opacitys }) => {
    // 未定義のkeyに対しては空白を設定する
    const keyWrapper = (idx: number) => {
        const key = getKey(idx)

        if (key === 'unknown') {
            return ' '
        } else {
            return key
        }
    }

    return (
        <FlexContainer position="left">
            {keyIdxs.map((keyIdx, index) => {
                return (
                    <div
                        className={styles.key}
                        style={{ marginLeft: '7px', marginRight: '7px', opacity: opacitys[index] }}
                        key={index}
                    >
                        {keyWrapper(keyIdx)}
                    </div>
                )
            })}
        </FlexContainer>
    )
}
