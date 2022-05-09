import produce from 'immer'
import React, { memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDark } from '../hooks'
import { useImmer } from 'use-immer'

type Item = {
  title: string,
  done: boolean,
  id: string
}



function Index() {
  const { isDark, toggleDark } = useDark()

  const [todos, setTodos] = useImmer([
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
  ])


  const unfinishedTodoCount = todos.filter((todo) => todo.done === false).length;

  const handleToggle = useCallback((id: string) => {
    setTodos((draft: Item[]) => {
        const todo = draft.find(todo => todo.id === id)
        if (todo)
          todo.done = !todo.done
      }
    )
  }, [])

  const handleAdd = useCallback(() => {
    setTodos(draft => {
        draft.push({
          id: "todo_" + Math.random(),
          title: "A new todo",
          done: false
        })
      }
    )

  }, [])


  return (
    <div className='text-center'>

      <div>
        <button onClick={handleAdd}>Add Todo</button>
        <ul>
          {todos.map((todo) => (
            <Todo todo={todo} key={todo.id} onToggle={handleToggle} />
          ))}
        </ul>
        Tasks left: {unfinishedTodoCount}
      </div>

      <div className='text-center py-6 flex justify-center'>
        <div onClick={toggleDark}>
          {
            isDark
              ? <span className='i-carbon-moon text-gray-200' ></span>
              : <span className='i-carbon-sun' ></span>
          }
        </div>
        <a href='https://github.com/tisou1/react-lite' target='_blank'>
          <span className='i-carbon-logo-github ml-3'></span>
        </a>
      </div>
    </div>
  )
}
interface TodoProps {
  todo: Item,
  onToggle: (arg: string) => void
}

const Todo = memo(({ todo, onToggle}:TodoProps) =>{
  console.log('TODO组件');
  return(
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