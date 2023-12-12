import { useState } from 'react'
import { Label } from '@/types/types'
import styles from '../styles/SelectGroup.module.css'
import FlexContainer from './FlexContainer'

type SelectGroupProps = {
    labels: Label[]
    setLabel: (id: number) => void
    mode?: 'card' | 'dent'
}

/**
 * 中央寄せのマルチセレクト
 * @param param0 labels 選択対象のオブジェクトのリスト {id: number, name: string}[]
 * @param param0 setLabel (id: number) => void ユーザーの選択が変化するとlabelのidを指定して実行する
 * @param param0 mode cardのとき凸， dentのとき凹のスタイルを適用する (default: card)
 * @returns
 */
export const SelectGroup: React.FC<SelectGroupProps> = ({ labels, setLabel, mode = 'card' }) => {
    // 現在アクティブになっているボタン
    const [activeButton, setActiveButton] = useState(0)

    // アクティブなボタンに指定するスタイル
    const styleActive = mode === 'card' ? styles.selected_card : styles.selected_dent

    // ボタン選択時の処理
    const handleButtonClick = (buttonNumber: number) => {
        setActiveButton(buttonNumber)
        setLabel(labels[buttonNumber].id)
    }

    // セレクタを作成
    const buttons = []
    for (const [i, label] of labels.entries()) {
        const button = (
            <div
                className={`${styles.select_box} ${styles.pointer} ${
                    activeButton === i ? styleActive : styles.unselected
                }`}
                onClick={() => handleButtonClick(i)}
                key={i}
            >
                {label.name}
            </div>
        )
        buttons.push(button)
    }

    return <FlexContainer position="center">{buttons}</FlexContainer>
}

/**
 * 4つごとに改行するマルチセレクト
 * @param param0 labels 選択対象のオブジェクトのリスト {id: number, name: string}[]
 * @param param0 setLabel (id: number) => void ユーザーの選択が変化するとlabelのidを指定して実行する
 * @param param0 mode cardのとき凸， dentのとき凹のスタイルを適用する (default: card)
 * @returns
 */
export const SelectGroupMultiLine: React.FC<SelectGroupProps> = ({ labels, setLabel, mode = 'card' }) => {
    // 現在アクティブになっているボタン
    const [activeButton, setActiveButton] = useState(0)

    // アクティブなボタンに指定するスタイル
    const styleActive = mode === 'card' ? styles.selected_card : styles.selected_dent

    // ボタン選択時の処理
    const handleButtonClick = (buttonNumber: number) => {
        setActiveButton(buttonNumber)
        setLabel(labels[buttonNumber].id)
    }

    // セレクタを作成
    const buttonMat = []
    // 4つごとに改行する
    for (let j = 0; j * 4 < labels.length; j++) {
        const buttonVec = []
        for (let i = 0; i < 4; i++) {
            const labelIndex = i + j * 4
            if (labelIndex < labels.length) {
                const label = labels[labelIndex]
                const button = (
                    <div
                        className={`${styles.select_box} ${styles.pointer} ${
                            activeButton === labelIndex ? styleActive : styles.unselected
                        }`}
                        onClick={() => handleButtonClick(labelIndex)}
                        key={labelIndex}
                    >
                        {label.name}
                    </div>
                )
                buttonVec.push(button)
            } else {
                // 4で割り切れない場合， 最後の行で空白ができる
                // 空白を埋める
                const button = <div className={`${styles.select_box} ${styles.unselected}`} key={labelIndex} />
                buttonVec.push(button)
            }
        }
        buttonMat.push(buttonVec)
    }

    return (
        <>
            {buttonMat.map((buttonVec, index) => (
                <div key={index} style={{ marginTop: '20px' }}>
                    <FlexContainer position="center">{buttonVec}</FlexContainer>
                </div>
            ))}
        </>
    )
}
