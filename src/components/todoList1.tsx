import produce from 'immer'
import React, { memo, useCallback, useState } from 'react'
import { useImmer } from 'use-immer'
import type { Item, TodoProps} from './types'



function Index() {

  const [todos, setTodos] = useState([
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
    setTodos(
      produce((draft: Item[]) => {
        const todo = draft.find(todo => todo.id === id)
        if (todo)
          todo.done = !todo.done
      })
    )
  }, [])

  const handleAdd = useCallback(() => {
    //使用原生的写法,会取不到最新的state
    // setTodos([...todos,{
    //   id: "todo_" + Math.random(),
    //   title: "A new todo",
    //   done: false
    // }])

    //使用函数式更新
    // setTodos(todos => [...todos,{
    //   id: "todo_" + Math.random(),
    //   title: "A new todo",
    //   done: false
    // }])


    //进阶版本的immer科里化版本
    setTodos(
      produce(draft => {
        draft.push({
          id: "todo_" + Math.random(),
          title: "A new todo",
          done: false
        })
      })
    )

  }, [])


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