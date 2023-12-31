import React from 'react'
import styles from '@/styles/Caret.module.css'

/**
 * テキストボックス内で点滅するやつ (カーソル位置を表すやつ)
 * @returns Caret
 */
export const Caret: React.FC = () => <span className={styles.caret}></span>
