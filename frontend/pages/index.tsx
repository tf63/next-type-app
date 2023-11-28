import { useSession, signOut } from 'next-auth/react'
import { CustomNextPage } from '@/types/custom-next-page'
import Card from '@/components/Card'
import NavigateButton from '@/components/NavigateButton'
import Button from '@/components/Button'

const Home: CustomNextPage = () => {
    return (
        <main>
            <Card>This is Home Page</Card>
            <NavigateButton href="/select">Select</NavigateButton>
            <NavigateButton href="/profile">Profile</NavigateButton>
        </main>
    )
}

export default Home
