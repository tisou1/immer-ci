import produce from 'immer'
import React, { memo, useCallback, useReducer, useState } from 'react'
import { useImmerReducer } from 'use-immer'
import type { Item, TodoProps, Action } from './types'




function Index() {

  const [todos, dispatch] = useImmerReducer(
    (draft: Item[], action: Action) => {
      switch (action.type) {
        case 'toggle':
          const todo = draft.find(todo => todo.id === action.id)!
          todo.done = !todo.done
          break
        case 'add':
          draft.push({
            id: action.id,
            title: 'a New todo',
            done: false
          })
          break
        default:
          break
      }
    },
    [
      {
        id: "React",
        title: "Learn React",
        done: true
      },
      {
        id: "Immer",
        title: "Try immer",
        done: false
      }
    ]
  )


  const handleToggle = useCallback((id: string) => {
    dispatch({
      type: "toggle",
      id
    })
  }, [])

  const handleAdd = useCallback(() => {
    dispatch({
      type: "add",
      id: "todo_" + Math.random()
    })
  }, [])

  const unfinishedTodoCount = todos.filter((todo) => todo.done === false).length;

  return (
    <div>
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} onToggle={handleToggle} />
        ))}
      </ul>
      Tasks left: {unfinishedTodoCount}
    </div>
  )
}


const Todo = memo(({ todo, onToggle }: TodoProps) => {
  console.log('TODO组件');
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onClick={() => onToggle(todo.id)}
      />
      {todo.title}
    </li>
  )
})



export default Index