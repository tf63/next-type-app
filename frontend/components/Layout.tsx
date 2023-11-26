import styles from '../styles/Theme.module.css'
import { LinkedButton } from '@/components/LinkedButton'
import { ReactNode } from 'react'
import Navbar from './Navbar'

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={styles.page_container}>
            <Navbar />
            {children}
        </div>
    )
}

export default Layout
