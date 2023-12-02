import React from 'react'
import Card from './Card'
import styles from '../styles/KeyBoard.module.css'
import FlexContainer from './FlexContainer'
import { IDX_TO_KEY } from '@/lib/const'

export type KeyListProps = {
    keyIdxs: number[]
    opacitys: string[]
}

const KeyList: React.FC<KeyListProps> = ({ keyIdxs, opacitys }) => {
    const displayWrapper = (idx: number) => {
        const key = IDX_TO_KEY.get(idx)
        if (idx != null) {
            return key
        } else {
            return ' '
        }
    }

    console.log(opacitys)

    return (
        <FlexContainer position="left">
            {keyIdxs.map((keyIdx, index) => {
                return (
                    <div
                        className={styles.key}
                        style={{ marginLeft: '7px', marginRight: '7px', opacity: opacitys[index] }}
                        key={index}
                    >
                        {displayWrapper(keyIdx)}
                    </div>
                )
            })}
        </FlexContainer>
    )
}

export default KeyList
