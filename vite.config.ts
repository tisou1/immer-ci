/// <reference types="vitest" />

import * as path from 'path'
import { defineConfig } from 'vite'
//热更新模块插件
import react from '@vitejs/plugin-react'
//文件路由
import Pages from 'vite-plugin-pages'
import Unocss from 'unocss/vite'


export default defineConfig({
  resolve:{
    alias: {
      '~/': `${path.resolve(__dirname,'src')}/`,
    }
  },
  plugins: [
    react(),
    Unocss(),
    Pages(),
  ],
  test: {
    globals: true,  //不需要手动引入一些函数. 比如vi
    environment: 'jsdom',
    include: ['test/**/*.test.{ts,js}'],
    allowOnly: true, //允许标记为only的测试套件和测试用例
  }
})