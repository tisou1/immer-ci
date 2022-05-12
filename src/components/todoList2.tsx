import React, { memo, useCallback } from "react";
import { render } from "react-dom";
import { useImmer } from "use-immer";
import type { Item, TodoProps} from './types'



const TodoList = () => {
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
  ]);
  const unfinishedTodoCount = todos.filter((todo) => todo.done === false)
    .length;

  const handleToggle = useCallback((id: string) => {
    setTodos((draft: Item[]) => {
      const todo = draft.find((todo) => todo.id === id);
      if(todo)
        todo.done = !todo.done;
    });
  }, []);

  const handleAdd = useCallback(() => {
    setTodos((draft) => {
      draft.push({
        id: "todo_" + Math.random(),
        title: "A new todo",
        done: false
      });
    });
  }, []);

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
  );
};


const Todo = memo(({ todo, onToggle}:TodoProps) => (
  <li>
    <input
      type="checkbox"
      checked={todo.done}
      onClick={() => onToggle(todo.id)}
    />
    {todo.title}
  </li>
));

render(<TodoList />, document.getElementById("root"));
