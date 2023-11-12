import { ReactNode } from 'react'
import styles from '../styles/Card.module.css'

type CardProps = {
    children: ReactNode
}

const Card: React.FC<CardProps> = ({ children }) => {
    return <div className={styles.card}>{children}</div>
}

export default Card
