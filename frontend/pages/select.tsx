import type { NextPage } from 'next'
import Card from '@/components/Card'
import { LinkedButton } from '@/components/LinkedButton'

const Select: NextPage = () => {
    return (
        <main>
            <Card>This is Select Page</Card>
            <LinkedButton href="/game" text="Game" color="blue" />
        </main>
    )
}

export default Select
