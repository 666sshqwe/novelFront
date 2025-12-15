// src/api/auth.js
import request from '@/api/request'

/**
 * 用户登录
 * @param {Object} loginData - { username, password }
 * @returns {Promise} - 返回 token 等信息
 */
export function addToWaitDownLoad(params) {
  return request({
    url: '/downloadServer/waitDownLoad/joinToDownload',
    method: 'post',
    data: params
  })
}

