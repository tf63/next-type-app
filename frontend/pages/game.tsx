import type { NextPage } from 'next'
import Card from '@/components/Card'
import { LinkedButton } from '@/components/LinkedButton'

const Game: NextPage = () => {
    return (
        <main>
            <Card>This is Game Page</Card>
            <LinkedButton href="/result" text="Result" color="blue" />
        </main>
    )
}

export default Game
