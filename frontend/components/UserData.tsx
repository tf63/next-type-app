import FlexContainer from '@/components/FlexContainer'
import Icon from '@/components/Icon'
import { useSession } from 'next-auth/react'

/**
 * ユーザーのアイコンをまとめたボード
 * @returns
 */
const UserData: React.FC = () => {
    const { data, status } = useSession()
    return (
        <>
            {status === 'authenticated' && (
                <FlexContainer position="left" align="top">
                    <Icon width={100} url={data?.user?.image!} />
                    <div style={{ marginLeft: '40px' }}>
                        <p>Profile</p>
                        {data?.user?.name!}
                    </div>
                </FlexContainer>
            )}

            {status === 'unauthenticated' && (
                <FlexContainer position="left" align="top">
                    <div style={{ paddingLeft: '100px' }} />
                    <div style={{ marginLeft: '40px' }}>
                        <p>Profile</p>
                        <p>you're not login</p>
                    </div>
                </FlexContainer>
            )}
        </>
    )
}

export default UserData
