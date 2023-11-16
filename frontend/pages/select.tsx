import type { NextPage } from 'next'
import Card from '@/components/Card'
import { LinkedButton } from '@/components/LinkedButton'
import SelectBoard from '@/components/SelectBoard'

const Select: NextPage = () => {
    return (
        <main>
            <LinkedButton href="/game" text="Game" color="blue" />
            <SelectBoard />
        </main>
    )
}

export default Select
