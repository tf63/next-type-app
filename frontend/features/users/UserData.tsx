import { useSession } from 'next-auth/react'
import { FlexContainer, Icon } from '@/features/ui'

/**
 * ユーザーのアイコンをまとめたボード
 * @returns
 */
export const UserData: React.FC = () => {
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
                        <p>You are not authenticated</p>
                    </div>
                </FlexContainer>
            )}
        </>
    )
}
