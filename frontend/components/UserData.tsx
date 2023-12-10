import FlexContainer from '@/components/FlexContainer'
import Icon from '@/components/Icon'
import { Session } from 'next-auth'

type UserDataProps = {
    data: Session | null
}

/**
 * ユーザーのアイコンをまとめたボード
 * @param param0 data ユーザーのSession
 * @returns
 */
const UserData: React.FC<UserDataProps> = ({ data }) => {
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
