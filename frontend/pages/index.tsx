import { useSession } from 'next-auth/react'
import { CustomNextPage } from '@/types/custom-next-page'
import Card from '@/components/Card'
import NavigateButton from '@/components/NavigateButton'
import FlexContainer from '@/components/FlexContainer'
import SmallHeight from '@/components/SmallHeight'
import KeyBoard from '@/components/KeyBoard'
import UserData from '@/components/UserData'
import { KEY_TO_IDX } from '@/lib/const'
import TwoColumn from '@/components/TwoColumn'

const Home: CustomNextPage = () => {
    const { status } = useSession()

    return (
        <main style={{ minHeight: '800px' }}>
            {/* Selectページへ */}
            <FlexContainer>
                <p>A Type App using program code as prompts</p>
            </FlexContainer>
            <SmallHeight />

            <KeyBoard list={Array.from({ length: KEY_TO_IDX.size }, () => 100)} />

            <FlexContainer>
                <NavigateButton href="/select" flex={true}>
                    Game
                </NavigateButton>
            </FlexContainer>
            <SmallHeight height="80px" />

            {/* Profileページへ */}
            <Card>
                {status === 'authenticated' && (
                    <TwoColumn>
                        <UserData />
                        <NavigateButton href="/profile" flex={true}>
                            Profile
                        </NavigateButton>
                    </TwoColumn>
                )}
                {status !== 'authenticated' && (
                    <TwoColumn>
                        <FlexContainer position="left">
                            <p style={{ marginLeft: '40px' }}>you are not authenticated</p>
                        </FlexContainer>
                        <NavigateButton href="/login" flex={true}>
                            Login
                        </NavigateButton>
                    </TwoColumn>
                )}
            </Card>
        </main>
    )
}

export default Home
