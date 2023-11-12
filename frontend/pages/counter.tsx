import { NextPage } from 'next'
import React, { useState } from 'react'

const Counter: NextPage = () => {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        setCount(count - 1)
    }

    return (
        <main>
            <h1>Counter: {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </main>
    )
}

export default Counter
