import { useState } from 'react'
import { Label } from '@/types/types'
import styles from '../styles/SelectGroup.module.css'
import FlexContainer from './FlexContainer'

type SelectGroupProps = {
    labels: Label[]
    setLabel: (label: Label) => void
    mode?: 'card' | 'dent'
}

export const SelectGroup: React.FC<SelectGroupProps> = ({ labels, setLabel, mode = 'card' }) => {
    const [activeButton, setActiveButton] = useState(0)

    const handleButtonClick = (buttonNumber: number) => {
        setActiveButton(buttonNumber)
        setLabel(labels[buttonNumber])
    }

    const selectClassName = mode === 'card' ? styles.selected_card : styles.selected_dent

    const buttons = []
    for (const [i, label] of labels.entries()) {
        const button = (
            <div
                className={`${styles.select_box} ${styles.pointer} ${
                    activeButton === i ? selectClassName : styles.unselected
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

export const SelectGroupMultiLine: React.FC<SelectGroupProps> = ({ labels, setLabel, mode = 'card' }) => {
    const [activeButton, setActiveButton] = useState(0)

    const handleButtonClick = (buttonNumber: number) => {
        setActiveButton(buttonNumber)
        setLabel(labels[buttonNumber])
    }

    const selectClassName = mode === 'card' ? styles.selected_card : styles.selected_dent

    const buttonMat = []
    for (let j = 0; j * 4 < labels.length; j++) {
        const buttonVec = []
        for (let i = 0; i < 4; i++) {
            let button
            const labelIndex = i + j * 4
            if (labelIndex < labels.length) {
                const label = labels[labelIndex]
                button = (
                    <div
                        className={`${styles.select_box} ${styles.pointer} ${
                            activeButton === labelIndex ? selectClassName : styles.unselected
                        }`}
                        onClick={() => handleButtonClick(labelIndex)}
                        key={labelIndex}
                    >
                        {label.name}
                    </div>
                )
            } else {
                // 空白埋め
                button = <div className={`${styles.select_box} ${styles.unselected}`} key={labelIndex} />
            }
            buttonVec.push(button)
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
