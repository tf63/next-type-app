import React from 'react'
import NavigateButton from '@/components/NavigateButton'
import UserIcon, { Icon } from '@/components/UserIcon'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.space} />
            <NavigateButton href="/" color="none">
                Type App
            </NavigateButton>
            <div className={`${styles.space}`}>
                <UserIcon url="https://avatars.githubusercontent.com/u/108603238?v=4" userName="fuku" />
                {/* <Icon url={'https://avatars.githubusercontent.com/u/108603238?v=4'}></Icon> */}
            </div>
        </div>
    )
}

export default Navbar
