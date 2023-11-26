import Card from '@/components/Card'
import { LinkedButton } from '@/components/LinkedButton'
import { CustomNextPage } from '@/types/custom-next-page'

const Profile: CustomNextPage = () => {
    return (
        <main>
            <Card>This is Profile Page</Card>
            <LinkedButton href="/" text="Home" color="blue" />
        </main>
    )
}

export default Profile
Profile.requireAuth = true
