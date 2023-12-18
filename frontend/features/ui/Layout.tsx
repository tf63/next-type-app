import { ReactNode } from 'react'
import { Navbar } from '@/features/ui'
import styles from '@/styles/Layout.module.css'

/**
 * 全ページ共通のレイアウト
 * Navbarを全ページで入れている
 * @param param0 children
 * @returns Layout
 */
export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div style={{ marginTop: '0px', marginBottom: '20px' }} className={styles.page_container}>
            <Navbar />
            {children}
        </div>
    )
}
