// src/api/request.js
import axios from 'axios'
import { Message } from 'element-ui'

console.log('Gateway URL:', process.env.VUE_APP_GATEWAY_URL) // 添加这行

// 创建 axios 实例
const request = axios.create({
  baseURL: process.env.VUE_APP_GATEWAY_URL || '/api', // 从 .env 读取
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从 localStorage 获取 token 并添加到请求头
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 根据后端返回格式调整，假设你的后端返回 { code, data, message }
    const { code, data, message } = response.data
    
    if (code === 200) {
      return response.data // 直接返回业务数据
    } else {
      // Element UI 消息提示（你项目用了 ElementUI）
      Message.error(message || '请求失败')
      return Promise.reject(new Error(message))
    }
  },
  error => {
    if (error.response?.status === 401) {
      // token 过期或无效，跳转登录
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    Message.error(error.message || '网络错误')
    return Promise.reject(error)
  }
)

export default request