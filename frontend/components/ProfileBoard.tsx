import Button from '@/components/Button'
import { signOut } from 'next-auth/react'
import FlexContainer from '@/components/FlexContainer'
import { Session } from 'next-auth'
import UserData from './UserData'

type ProfileBoardProps = {
    data: Session | null
    status: 'authenticated' | 'loading' | 'unauthenticated'
}

/**
 * ユーザー情報をまとめたボード
 * @param param0 data ユーザーのSession
 * @param param0 status ユーザーのstatus
 * @returns
 */
const ProfileBoard: React.FC<ProfileBoardProps> = ({ data, status }) => {
    return (
        <FlexContainer position="left">
            <div style={{ width: '50%' }}>
                <UserData data={data} />
            </div>
            <div style={{ width: '50%' }}>
                {status === 'authenticated' && <Button onClick={() => signOut()}>LogOut</Button>}
            </div>
        </FlexContainer>
    )
}

export default ProfileBoard
