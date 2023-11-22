import React, { ReactNode } from 'react'

import styles from '../styles/Accordion.module.css'

export const Accordion: React.FC<{ summary: string; children: ReactNode }> = ({ summary, children }) => {
    return (
        <>
            <details className={styles.accordion}>
                <summary className={`${styles.summary}`}>{summary}</summary>
                <div>{children}</div>
            </details>
        </>
    )
}
