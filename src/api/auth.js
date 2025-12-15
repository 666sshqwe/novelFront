// src/api/auth.js
import request from '@/api/request'

/**
 * 用户登录
 * @param {Object} loginData - { username, password }
 * @returns {Promise} - 返回 token 等信息
 */
export function loginAPI(loginData) {
  return request({
    url: '/auther/login',
    method: 'post',
    data: loginData 
  })
}

/**
 * 获取用户信息（可选）
 */
export function getUserInfoAPI() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

/**
 * 用户登出
 */
export function logoutAPI() {
  return request({
    url: '/auther/logout',
    method: 'post'
  })
}