import { Caret } from '@/features/ui'
import styles from '@/styles/TypeLine.module.css'

type TypeLineProps = {
    text: string
    prefix: string
}

/**
 * TypeBoardで現在ターゲットしている行
 * @param param0 text 行内の文
 * @param param0 prefix 行のプレフィックス
 * @param param0 indexCaret Caretの位置
 * @returns
 */
export const TypeLineWithCaret: React.FC<TypeLineProps & { indexCaret: number }> = ({ text, indexCaret, prefix }) => {
    return (
        <div>
            <span style={{ whiteSpace: 'pre' }}>{prefix}</span>
            <span className={styles.typed}>{text.substring(0, indexCaret).replace(/ /g, '\u00A0')}</span>
            <Caret />
            <span className={styles.untyped}>{text.substring(indexCaret).replace(/ /g, '\u00A0')}</span>
        </div>
    )
}

/**
 * TypeBoardで現在ターゲットしていない行
 * @param param0 text 行内の文
 * @param param0 prefix 行のプレフィックス
 * @param param0 isTyped タイプ済みの行か
 * @returns
 */
export const TypeLine: React.FC<TypeLineProps & { isTyped: boolean }> = ({ text, prefix, isTyped }) => {
    // タイプ済みかどうかでクラスを設定する
    const typeLineClass = isTyped ? styles.typed : styles.untyped

    return (
        <div>
            <span style={{ whiteSpace: 'pre' }}>{prefix}</span>
            <span className={typeLineClass}>{text.replace(/ /g, '\u00A0')}</span>
        </div>
    )
}
