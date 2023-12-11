import React from 'react'
import styles from '../styles/PageBar.module.css'
import FlexContainer from './FlexContainer'

export type IconProps = {
    datas: Array<any>
    page: number
    setPage: (page: number) => void
    pageSize: number
}

/**
 * ページネーションの見出し
 * @param param0 datas 現在のデータ
 * @param param0 page 現在のページ
 * @param param0 setPage 現在のページを設定する
 * @param param0 pageSize ページサイズ
 * @returns PageBar
 */
const PageBar: React.FC<IconProps> = ({ datas, page, setPage, pageSize }) => {
    // ページを増加させる処理
    const incrementPage = () => {
        // 現在のデータ数がページサイズよりも1つ多い (次のデータがある)
        if (datas.length === pageSize + 1) {
            setPage(page + 1)
        }
    }

    // ページを減少させる処理
    const decrementPage = () => {
        // ページが負にならないように
        if (page > 0) {
            setPage(page - 1)
        }
    }

    return (
        <FlexContainer position="left">
            <p>History</p>
            <div style={{ marginLeft: '10px', padding: '10px', cursor: 'pointer' }} onClick={decrementPage}>
                <div className={styles.lt} />
            </div>
            <div>{page + 1}</div>
            <div style={{ padding: '10px', cursor: 'pointer' }} onClick={incrementPage}>
                <div className={styles.gt} />
            </div>
        </FlexContainer>
    )
}

export default PageBar
