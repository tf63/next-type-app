import { ReactNode } from 'react'
import Navbar from './Navbar'
import styles from '../styles/Layout.module.css'

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div style={{ marginTop: '0px', marginBottom: '20px' }} className={styles.page_container}>
            <Navbar />
            {children}
        </div>
    )
}

export default Layout
