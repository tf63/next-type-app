import type { NextPage } from 'next'
import TypeSystem from '@/components/TypeSystem'
import { LinkedButton } from '@/components/LinkedButton'

const Game: NextPage = () => {
    return (
        <main>
            <TypeSystem typeList={['aaaa', 'bbbb']} prefixList={['', '']} />
            <LinkedButton href="/result" text="Result" color="blue" />
        </main>
    )
}

export default Game
