import { Caret } from './Caret'
import styles from '../styles/TypeLine.module.css'

export const TypeLineWithCaret: React.FC<{ text: string; prefix: string; indexCaret: number }> = ({
    text,
    indexCaret,
    prefix
}) => {
    return (
        <div>
            <span>{prefix}</span>
            <span className={styles.typed}>{text.substring(0, indexCaret).replace(/ /g, '\u00A0')}</span>
            <Caret />
            <span className={styles.untyped}>{text.substring(indexCaret).replace(/ /g, '\u00A0')}</span>
        </div>
    )
}
export const TypeLine: React.FC<{ text: string; prefix: string; isTyped: boolean }> = ({ text, prefix, isTyped }) => {
    const typeLineClass = isTyped ? styles.typed : styles.untyped

    return (
        <div>
            <span>{prefix}</span>
            <span className={typeLineClass}>{text.replace(/ /g, '\u00A0')}</span>
        </div>
    )
}
