import Card from '@/components/Card'
import { CustomNextPage } from '@/types/custom-next-page'

const Profile: CustomNextPage = () => {
    return (
        <main>
            <Card>This is Profile Page</Card>
        </main>
    )
}

export default Profile
Profile.requireAuth = true
