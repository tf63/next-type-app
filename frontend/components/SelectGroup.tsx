import { useState } from 'react'
import styles from '../styles/SelectGroup.module.css'

export const SelectGroup: React.FC<{ labelNames: string[]; setLabel: (label: string) => void }> = ({
    labelNames,
    setLabel
}) => {
    const [activeButton, setActiveButton] = useState(0)

    const handleButtonClick = (buttonNumber: number) => {
        setActiveButton(buttonNumber)
        setLabel(labelNames[buttonNumber])
    }

    const buttons = []
    for (const [i, labelName] of labelNames.entries()) {
        const button = (
            <div
                className={`${styles.select_box} ${styles.pointer} ${
                    activeButton === i ? styles.selected : styles.unselected
                }`}
                onClick={() => handleButtonClick(i)}
                key={i}
            >
                {labelName}
            </div>
        )
        buttons.push(button)
    }

    return <div className={styles.center_container}>{buttons}</div>
}

export const SelectGroupMultiLine: React.FC<{ labelNames: string[]; setLabel: (label: string) => void }> = ({
    labelNames,
    setLabel
}) => {
    const [activeButton, setActiveButton] = useState(0)

    const handleButtonClick = (buttonNumber: number) => {
        setActiveButton(buttonNumber)
        setLabel(labelNames[buttonNumber])
    }

    const buttonBlock = []
    for (let j = 0; j * 4 < labelNames.length; j++) {
        const buttons = []
        for (let i = 0; i < 4; i++) {
            let button
            const labelIndex = i + j * 4
            if (labelIndex < labelNames.length) {
                const labelName = labelNames[labelIndex]
                button = (
                    <div
                        className={`${styles.select_box} ${styles.pointer} ${
                            activeButton === labelIndex ? styles.selected : styles.unselected
                        }`}
                        onClick={() => handleButtonClick(labelIndex)}
                        key={labelIndex}
                    >
                        {labelName}
                    </div>
                )
            } else {
                button = <div className={`${styles.select_box} ${styles.unselected}`} key={labelIndex} />
            }
            buttons.push(button)
        }
        buttonBlock.push(buttons)
    }

    return (
        <>
            {buttonBlock.map((buttons, index) => (
                <div className={styles.center_container} key={index}>
                    {buttons}
                </div>
            ))}
        </>
    )
}
