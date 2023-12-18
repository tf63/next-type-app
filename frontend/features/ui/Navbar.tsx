import React from 'react'
import styles from '@/styles/Navbar.module.css'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ICON_EXCLUDE_URL } from '@/lib/const'
import { Icon, FlexContainer, NavigateButton } from '@/features/ui'
import { Navigate } from '@/features/logic'
/**
 * ナビゲーションバー
 * ユーザーのログイン状態によってアイコンが切り替わる
 * @returns Navbar
 */
export const Navbar = () => {
    const { data, status } = useSession()
    const router = useRouter()

    return (
        // 3つの要素を並べる
        <FlexContainer position="center">
            {/* 左のブロック */}
            <div className={styles.space} />
            {/* 中央のブロック (タイトル) */}
            <NavigateButton href="/" color="none">
                Type App
            </NavigateButton>
            {/* 右のブロック */}
            <div className={styles.space}>
                {!ICON_EXCLUDE_URL.includes(router.pathname) && (
                    <FlexContainer position="right">
                        {status === 'authenticated' && (
                            <Navigate href="/profile">
                                <Icon url={data?.user?.image!}></Icon>
                            </Navigate>
                        )}
                        {status !== 'authenticated' && (
                            <NavigateButton href="/login" color="none">
                                Login
                            </NavigateButton>
                        )}
                    </FlexContainer>
                )}
            </div>
        </FlexContainer>
    )
}
