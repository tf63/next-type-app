import type { NextPage } from 'next'
import Card from '@/components/Card'
import { LinkedButton } from '@/components/LinkedButton'

const Profile: NextPage = () => {
    return (
        <main>
            <Card>This is Profile Page</Card>
            <LinkedButton href="/" text="Home" color="blue" />
        </main>
    )
}

export default Profile
