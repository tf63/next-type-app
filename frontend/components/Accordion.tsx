import React, { ReactNode } from 'react'
import styles from '../styles/Accordion.module.css'

type AccordionProps = {
    summary: string
    children: ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ summary, children }) => {
    return (
        <details className={styles.accordion}>
            <summary>{summary}</summary>
            <div className={styles.content}>{children}</div>
        </details>
        // <section className={styles.accordion}>
        //     <input id="block-01" type="checkbox" className={styles.toggle} />
        //     <label className={styles.label} htmlFor="block-01">
        //         {summary}
        //     </label>
        //     <div className={styles.content}>{children}</div>
        // </section>
    )
}

export default Accordion
