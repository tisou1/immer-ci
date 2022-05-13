
import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'

function buyApples() {
  return axios('https://www.fastmock.site/mock/6f92f55a6b8b6a1bdf0a2f35dcbe01ec/data1/1')
}


it('axios', async () => {
  // toEqual returns a promise now, so you HAVE to await it
  const res = await buyApples()
  expect(res.data).toMatchSnapshot()
  // await expect(buyApples()).resolves.toMatchSnapshot() // jest API
  // await expect(buyApples()).resolves.to.equal({ id: 1 }) // chai API
})
