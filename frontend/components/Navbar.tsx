import React from 'react'
import NavigateButton from '@/components/NavigateButton'
import UserIcon, { Icon } from '@/components/UserIcon'
import theme from '../styles/Theme.module.css'
import styles from '../styles/Navbar.module.css'
import { useSession } from 'next-auth/react'
import GithubIcon from './GithubIcon'
import Navigate from './Navigate'

const Navbar = () => {
    const { data, status } = useSession()

    return (
        <div className={styles.container}>
            <div className={styles.space} />
            <NavigateButton href="/" color="none">
                Type App
            </NavigateButton>
            <div className={styles.space}>
                <div className={`${styles.user_status} ${theme.center_container}`}>
                    {status === 'authenticated' && (
                        // <UserIcon url={data?.user?.image || ''} userName={data?.user?.name || ''} />
                        <Navigate href="/profile">
                            <Icon url={data?.user?.image || ''}></Icon>
                        </Navigate>
                    )}
                    {status !== 'authenticated' && (
                        <NavigateButton href="login" color="none">
                            Login
                        </NavigateButton>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
