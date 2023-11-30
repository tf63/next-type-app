import { useSession } from 'next-auth/react'
import { CustomNextPage } from '@/types/custom-next-page'
import Card from '@/components/Card'
import NavigateButton from '@/components/NavigateButton'
import FlexContainer from '@/components/FlexContainer'
import SmallHeight from '@/components/SmallHeight'
import KeyBoard from '@/components/KeyBoard'
import ProfileBoard from '@/components/ProfileBoard'
import UserData from '@/components/UserData'
import Button from '@/components/Button'

const Home: CustomNextPage = () => {
    const { data, status } = useSession()
    return (
        <main>
            <FlexContainer>
                <p>A Type App using program code as prompts</p>
            </FlexContainer>
            <SmallHeight />
            <KeyBoard list={Array.from({ length: 96 }, () => 0)} />
            <FlexContainer>
                <NavigateButton href="/select" flex={true}>
                    Game
                </NavigateButton>
            </FlexContainer>
            <SmallHeight />
            <Card>
                {status === 'authenticated' && (
                    <FlexContainer position="left">
                        <div style={{ width: '50%' }}>
                            <UserData data={data} />
                        </div>
                        <div style={{ width: '50%' }}>
                            <NavigateButton href="/profile" flex={true}>
                                Profile
                            </NavigateButton>
                        </div>
                    </FlexContainer>
                )}
                {status !== 'authenticated' && (
                    <FlexContainer position="left">
                        <div style={{ width: '50%' }}>
                            <FlexContainer position="left" align="top">
                                <div style={{ marginLeft: '40px' }}>
                                    <p>You're not Logged in</p>
                                </div>
                            </FlexContainer>
                        </div>
                        <div style={{ width: '50%' }}>
                            <NavigateButton href="/login" flex={true}>
                                Login
                            </NavigateButton>
                        </div>
                    </FlexContainer>
                )}
            </Card>
            <SmallHeight />
        </main>
    )
}

export default Home
