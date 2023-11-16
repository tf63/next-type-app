import React from 'react'

import styles from '../styles/Theme.module.css'
import buttonStyles from '../styles/Button.module.css'

export const DropDown: React.FC = () => {
    return (
        <>
            <select>
                <option>optionの例1</option>
                <option>optionの例2</option>
                <option>optionの例3</option>
            </select>
        </>
    )
}
