import React, { ReactNode } from 'react'
import styles from '../styles/Accordion.module.css'

type AccordionProps = {
    summary: string
    children: ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ summary, children }) => {
    return (
        <>
            <details className={styles.accordion}>
                <summary className={styles.summary}>{summary}</summary>
                <div>{children}</div>
            </details>
        </>
    )
}

export default Accordion
