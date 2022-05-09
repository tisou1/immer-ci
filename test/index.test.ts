import { describe, it , expect } from 'vitest'
import { produce } from 'immer'


type Item = {
  title?: string,
  done?: boolean,
  id?: string
}


describe('immer', () => {
  it('base', () => {
    const baseState:Item[] = [
      {
          title: "Learn TypeScript",
          done: true
      },
      {
          title: "Try Immer",
          done: false
      }
    ]
    
    const nextState = produce(baseState, draftState => {
      draftState.push({title: "Tweet about it1"})
      draftState[1].done = true
    })

    expect(nextState).not.toEqual(baseState)
    expect(nextState).toMatchSnapshot()
    expect(baseState).toMatchSnapshot()
    expect(nextState[0]).toEqual(baseState[0])
    expect(nextState[1]).not.toEqual(baseState[1])
  })


  it.only('curried', () => {
    const baseState:Item[] = [
      {
          id: "JavaScript",
          title: "Learn TypeScript",
          done: true
      },
      {
          id: "Immer",
          title: "Try Immer",
          done: false
      }
  ]

  const toggleTodo = produce((draft: Item[], id: string) => {
    const todo = draft.find(todo => todo.id === id)
    todo.done = !todo.done
  })
  //使用科里化初始化
  const nextState = toggleTodo(baseState, 'Immer')


  expect(nextState).toMatchSnapshot()
  
  })
})