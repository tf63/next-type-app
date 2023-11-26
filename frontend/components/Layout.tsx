import { ReactNode } from 'react'
import Navbar from './Navbar'
import styles from '../styles/Theme.module.css'

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className={styles.page_container}>
            <Navbar />
            {children}
        </div>
    )
}

export default Layout
