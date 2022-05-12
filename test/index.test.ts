import { describe, it, expect, vi } from 'vitest'
import { produce, enableMapSet, original, current } from 'immer'
import axios from 'axios'

enableMapSet() //支持map,set

export type Item = {
  title?: string,
  done?: boolean,
  id?: string
}

function buyApples() {
  return fetch('https://www.fastmock.site/mock/6f92f55a6b8b6a1bdf0a2f35dcbe01ec/data1/1').then(r => r.json())
}



describe('immer', () => {

  it('base', () => {
    const baseState: Item[] = [
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
      draftState.push({ title: "Tweet about it1" })
      draftState[1].done = true
    })

    expect(nextState).not.toEqual(baseState)
    expect(nextState).toMatchSnapshot()
    expect(baseState).toMatchSnapshot()
    expect(nextState[0]).toEqual(baseState[0])
    expect(nextState[1]).not.toEqual(baseState[1])
  })


  it('curried', () => {
    const baseState: Item[] = [
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


  it('nooperator', () => {
    const baseState: Item[] = [
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
    //不对draft做任何操作的话,返回原来的对象
    // const newState = produce(baseState, draft => {})

    const handle = produce((draft) => { }) //返回函数

    const newState = handle(baseState)

    expect(baseState).toEqual(newState)
  })


  it('map and set', () => {
    const usersById = new Map()

    const usersById2 = produce(usersById, draft => {
      draft.set('michel', {
        name: 'Michel Weststrate',
        countryu: 'NL'
      })
    })

    const usersById3 = produce(usersById2, draft => {
      // 在 map 深处进行修改，同样会生成一个新的 map!
      draft.get("michel").country = "UK"
    })

    expect(usersById).not.toBe(usersById2)//toBe浅比较,可判断基本类型,和复杂类型的引用是否相等, 但是对象内的属性值不能判断
    expect(usersById3).not.toBe(usersById2)

  })


  it('current original', async () => {
    const base = {
      x: 0
    }

    const next = produce(base, draft => {
      draft.x++
      //创建原对象的副本
      const orig = original(draft)
      //创建draft对象当前状态的一个副本
      const copy = current(draft)// current返回当前draft的快照
      expect(orig).not.toBe(copy)
      console.log(orig.x) // 0
      console.log(copy.x) // 1

    vi.useFakeTimers()  //开启模拟计时器
      //在produce之后执行
      setTimeout(() => {
        console.log(orig.x)// 0 
        console.log(copy.x)// 1
      },100)
    
    vi.runAllTimers()  //加速, 让所有的定时器都执行完毕

      draft.x++
      console.log(draft.x) //2
    })

    console.log(next.x) //2
  })

})


describe.skip('axios setTimeout', () => {
  it('async func',  async () => { 
    vi.useFakeTimers()  //开启模拟计时器
    setTimeout(() => {
      console.log('ssssssssssssssssss')
    },1000)
    vi.runAllTimers()  //加速, 让所有的定时器都执行完毕
  })


  it('fetch', async () => {
      // toEqual returns a promise now, so you HAVE to await it
      const res = await buyApples()
      expect(res.data).toMatchSnapshot()
      // await expect(buyApples()).resolves.toMatchSnapshot() // jest API
      // await expect(buyApples()).resolves.to.equal({ id: 1 }) // chai API
  })
})
