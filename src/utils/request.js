/**
 * 基于axios 封装的请求模块
 */

import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'

// 创建一个 axios 实例
const request = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API
  // baseURL: 'https://thinkphp.web-framework-b4ub.1442726287021831.cn-hangzhou.fc.devsapp.net/'
  // baseURL: 'https://thinkphp-web-frawork-bub-onmukzwrmy.cn-hangzhou.fcapp.run/'
  baseURL: 'http://www.97284.com/'

  // transformResponse: [function (data) {
  //   try {
  //     return JSONbig.parse(data)
  //   } catch (err) {
  //     return data
  //   }
  // }]
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { status } = error.response
    if (status === 401) {
      window.localStorage.removeItem('user')
      router.push('/login')
      Message.error('登录状态无效，请重新登录')
    } else if (status === 403) {
      Message('没有操作权限')
    } else if (status === 400) {
      Message('请求参数错误，请检查请求参数')
    } else if (status >= 500) {
      Message.error('服务端内部异常，请稍后重试')
    }
    return Promise.reject(error)
  }
)
export default request
