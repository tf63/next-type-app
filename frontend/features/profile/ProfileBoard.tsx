import { signOut, useSession } from 'next-auth/react'
import { Button, FlexContainer } from '@/features/ui'
import { UserData } from '@/features/users'

/**
 * ユーザー情報をまとめたボード
 * @param param0 data ユーザーのSession
 * @param param0 status ユーザーのstatus
 * @returns
 */
export const ProfileBoard: React.FC = () => {
    const { status } = useSession()
    return (
        <FlexContainer position="left">
            <div style={{ width: '50%' }}>
                <UserData />
            </div>
            <div style={{ width: '50%' }}>
                {status === 'authenticated' && <Button onClick={() => signOut()}>LogOut</Button>}
            </div>
        </FlexContainer>
    )
}
