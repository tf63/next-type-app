import React from 'react'
import styles from '../styles/PageBar.module.css'
import FlexContainer from './FlexContainer'

export type IconProps = {
    datas: Array<any>
    page: number
    setPage: (page: number) => void
    pageSize: number
}

const PageBar: React.FC<IconProps> = ({ datas, page, setPage, pageSize }) => {
    const incrementPage = () => {
        if (datas.length === pageSize + 1) {
            console.log(datas.length, pageSize + 1)
            setPage(page + 1)
        }
    }
    const decrementPage = () => {
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
