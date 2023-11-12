import type { NextPage } from 'next'
import Card from '@/components/Card'
import { LinkedButton } from '@/components/LinkedButton'

const Home: NextPage = () => {
    return (
        <main>
            <Card>This is Home Page</Card>
            <LinkedButton href="/select" text="Select" color="blue" />
            <LinkedButton href="/profile" text="Profile" color="blue" />
        </main>
    )
}

export default Home
