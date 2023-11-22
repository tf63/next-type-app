import { useEffect, useState } from 'react'
import styles from '../styles/SelectGroup.module.css'
import { Label } from '@/types/types'

export const SelectGroup: React.FC<{ labels: Label[]; setLabel: (label: Label) => void }> = ({ labels, setLabel }) => {
    const [activeButton, setActiveButton] = useState(0)

    const handleButtonClick = (buttonNumber: number) => {
        setActiveButton(buttonNumber)
        setLabel(labels[buttonNumber])
    }

    const buttons = []
    for (const [i, label] of labels.entries()) {
        const button = (
            <div
                className={`${styles.select_box} ${styles.pointer} ${
                    activeButton === i ? styles.selected : styles.unselected
                }`}
                onClick={() => handleButtonClick(i)}
                key={i}
            >
                {label.name}
            </div>
        )
        buttons.push(button)
    }

    return <div className={styles.center_container}>{buttons}</div>
}

export const SelectGroupMultiLine: React.FC<{ labels: Label[]; setLabel: (label: Label) => void }> = ({
    labels,
    setLabel
}) => {
    const [activeButton, setActiveButton] = useState(0)

    const handleButtonClick = (buttonNumber: number) => {
        setActiveButton(buttonNumber)
        setLabel(labels[buttonNumber])
    }

    useEffect(() => {}, [labels])

    const buttonBlock = []
    for (let j = 0; j * 4 < labels.length; j++) {
        const buttons = []
        for (let i = 0; i < 4; i++) {
            let button
            const labelIndex = i + j * 4
            if (labelIndex < labels.length) {
                const label = labels[labelIndex]
                button = (
                    <div
                        className={`${styles.select_box} ${styles.pointer} ${
                            activeButton === labelIndex ? styles.selected : styles.unselected
                        }`}
                        onClick={() => handleButtonClick(labelIndex)}
                        key={labelIndex}
                    >
                        {label.name}
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
