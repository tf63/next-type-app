import { useSession } from 'next-auth/react'
import { CustomNextPage } from '@/types/custom-next-page'
import { Card, NavigateButton, FlexContainer, SmallHeight, TwoColumn } from '@/features/ui'
import { KeyBoard } from '@/features/keyboard'
import { UserData } from '@/features/users'
import { KEY_TO_IDX } from '@/lib/const'

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
