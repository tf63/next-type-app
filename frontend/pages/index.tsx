import { useSession } from 'next-auth/react'
import { CustomNextPage } from '@/types/custom-next-page'
import Card from '@/components/Card'
import NavigateButton from '@/components/NavigateButton'
import FlexContainer from '@/components/FlexContainer'
import SmallHeight from '@/components/SmallHeight'

const Home: CustomNextPage = () => {
    const { status } = useSession()
    return (
        <main>
            <Card>This is Home Page</Card>
            <SmallHeight />
            <FlexContainer>
                <NavigateButton href="/select" flex={true}>
                    Select
                </NavigateButton>
            </FlexContainer>
            <FlexContainer>
                {status === 'authenticated' && (
                    <NavigateButton href="/profile" flex={true}>
                        Profile
                    </NavigateButton>
                )}
                {status !== 'authenticated' && (
                    <NavigateButton href="/login" flex={true}>
                        Login
                    </NavigateButton>
                )}
            </FlexContainer>
        </main>
    )
}

export default Home
