import type { NextPage } from 'next'
import Card from '@/components/Card'
import { LinkedButton } from '@/components/LinkedButton'
import SelectBoard from '@/components/SelectBoard'

const Select: NextPage = () => {
    return (
        <main>
            <SelectBoard />
            <LinkedButton href="/game" text="Game" color="blue" />
        </main>
    )
}

export default Select
