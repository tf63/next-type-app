import type { NextPage } from 'next'
import Card from '@/components/Card'
import { LinkedButton } from '@/components/LinkedButton'

const Result: NextPage = () => {
    return (
        <main>
            <Card>This is Result Page</Card>
            <LinkedButton href="/" text="Home" color="blue" />
        </main>
    )
}

export default Result
