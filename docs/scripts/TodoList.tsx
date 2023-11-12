import React from 'react'
import { useState, useEffect } from 'react'
import { useAddTodo } from '@/hooks/useAddTodo'

export const TodoList: React.FC = () => {
    const { todos } = useAddTodo()

    return (
        <>
            <div>todoリスト</div>
            {todos.map((todo) => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </>
    )
}
