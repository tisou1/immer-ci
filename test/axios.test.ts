
import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'

vi.mock('axios');

function buyApples() {
  return axios('https://www.fastmock.site/mock/6f92f55a6b8b6a1bdf0a2f35dcbe01ec/data1/1')
}


it('axios', async () => {
  const res = await buyApples()
})
