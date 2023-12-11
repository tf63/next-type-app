import Button from '@/components/Button'
import { signOut, useSession } from 'next-auth/react'
import FlexContainer from '@/components/FlexContainer'
import UserData from './UserData'

/**
 * ユーザー情報をまとめたボード
 * @param param0 data ユーザーのSession
 * @param param0 status ユーザーのstatus
 * @returns
 */
const ProfileBoard: React.FC = () => {
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

export default ProfileBoard
