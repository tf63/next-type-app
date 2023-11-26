import Button from '@/components/Button'
import Card from '@/components/Card'
import { CustomNextPage } from '@/types/custom-next-page'
import { signOut, useSession } from 'next-auth/react'

const Profile: CustomNextPage = () => {
    const { data, status } = useSession()
    return (
        <main>
            <Card>This is Profile Page</Card>
            {status === 'authenticated' && <Button onClick={() => signOut()}>LogOut</Button>}
        </main>
    )
}

export default Profile
Profile.requireAuth = true
