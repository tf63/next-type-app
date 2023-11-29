import Button from '@/components/Button'
import Card from '@/components/Card'
import { signOut } from 'next-auth/react'
import FlexContainer from '@/components/FlexContainer'
import Icon from '@/components/Icon'
import { Session } from 'next-auth'

type ProfileBoardProps = {
    data: Session | null
    status: 'authenticated' | 'loading' | 'unauthenticated'
}

const ProfileBoard: React.FC<ProfileBoardProps> = ({ data, status }) => {
    return (
        <Card>
            <FlexContainer position="left">
                <div style={{ width: '50%' }}>
                    <FlexContainer position="left" align="top">
                        <Icon width={100} url={data?.user?.image!} />
                        <div style={{ marginLeft: '40px' }}>
                            <p>Profile</p>
                            {data?.user?.name!}
                        </div>
                    </FlexContainer>
                </div>
                <div style={{ width: '50%' }}>
                    {status === 'authenticated' && <Button onClick={() => signOut()}>LogOut</Button>}
                </div>
            </FlexContainer>
        </Card>
    )
}

export default ProfileBoard
