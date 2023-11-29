import React from 'react'
import NavigateButton from '@/components/NavigateButton'
import UserIcon from '@/components/UserIcon'
import styles from '../styles/Navbar.module.css'
import { useSession } from 'next-auth/react'
import Navigate from './Navigate'
import { useRouter } from 'next/router'
import { ICON_EXCLUDE_URL } from '@/lib/const'
import FlexContainer from './FlexContainer'
import Icon from './Icon'

const Navbar = () => {
    const { data, status } = useSession()
    const router = useRouter()

    return (
        <FlexContainer position="center">
            <div className={styles.space} />
            <NavigateButton href="/" color="none">
                Type App
            </NavigateButton>
            <div className={styles.space}>
                {!ICON_EXCLUDE_URL.includes(router.pathname) && (
                    <FlexContainer position="right">
                        {status === 'authenticated' && (
                            // <UserIcon url={data?.user?.image!} userName={data?.user?.name!} />
                            <Navigate href="/profile">
                                <Icon url={data?.user?.image!}></Icon>
                            </Navigate>
                        )}
                        {status !== 'authenticated' && (
                            <NavigateButton href="login" color="none">
                                Login
                            </NavigateButton>
                        )}
                    </FlexContainer>
                )}
            </div>
        </FlexContainer>
    )
}

export default Navbar
