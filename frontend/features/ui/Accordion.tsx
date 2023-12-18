import React, { ReactNode } from 'react'
import styles from '@/styles/Accordion.module.css'

type AccordionProps = {
    summary: string
    children: ReactNode
}

/**
 * @param param0 summary 見出し
 * @param param0 children
 * @returns アコーディオンメニュー
 */
export const Accordion: React.FC<AccordionProps> = ({ summary, children }) => {
    return (
        <details className={styles.accordion}>
            <summary>{summary}</summary>
            <div className={styles.content}>{children}</div>
        </details>
    )
}
