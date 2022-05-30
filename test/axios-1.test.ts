
import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'


function buyApples() {
  return axios('https://www.fastmock.site/mock/6f92f55a6b8b6a1bdf0a2f35dcbe01ec/data1/1')
}

//为测试该方法而不实际调用 API (
//因为测试的话,有很大概率会因为缓慢,而导致测试失败
// describe('axios --- ',() => {
//   it('axios', async () => {
//     const res = await buyApples()
//     expect(res.data).toMatchInlineSnapshot()
//   })
// })

describe('axios --- ',() => {
  it('axios', () => {
    const p = new Promise((resolve => {
      buyApples().then((res) => {
        resolve(res)
      })
    }))
    return p.then((res) => {
      expect(res.data).toMatchInlineSnapshot()
    })
  })
})