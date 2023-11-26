import styles from '../styles/Theme.module.css'
import navbarStyles from '../styles/Navbar.module.css'
import { LinkedButton } from '@/components/LinkedButton'
import React, { useEffect } from 'react'
import { Button } from './Button'
import UserIcon from './UserIcon'

const Navbar = () => {
    return (
        <div className={`${navbarStyles.container} `}>
            <div className={navbarStyles.space}>&nbsp;</div>
            {/* <div className={navbarStyles.title}>TypeApp</div> */}
            <LinkedButton href="/" text="Type App" color="none" />
            <div className={`${navbarStyles.space}`}>
                <UserIcon url="https://avatars.githubusercontent.com/u/74246282?v=4" userName="fuku" />
            </div>
            {/* <Button text={'aa'} color={'blue'} /> */}
        </div>
    )
}

export default Navbar
