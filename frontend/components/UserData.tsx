import FlexContainer from '@/components/FlexContainer'
import Icon from '@/components/Icon'
import { Session } from 'next-auth'

type ProfileBoardProps = {
    data: Session | null
}

const UserData: React.FC<ProfileBoardProps> = ({ data }) => {
    return (
        <FlexContainer position="left" align="top">
            <Icon width={100} url={data?.user?.image!} />
            <div style={{ marginLeft: '40px' }}>
                <p>Profile</p>
                {data?.user?.name!}
            </div>
        </FlexContainer>
    )
}

export default UserData
