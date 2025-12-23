// src/api/auth.js
import request from '@/api/request'

/**
 * 当前最热门查询
 * @param {String} key - 书名
 * @returns {Promise} - 返回热门查询列表
 */
export function searchHotList() {
  return request({
    url: '/searchServer/store/searchHotList',
    method: 'get'
  })
}


/**
 * 在线查询
 * @param {String} key - 书名
 * @returns {Promise} - 返回查询结果
 */
export function onlineSearch(keyword) {
  return request({
    url: '/searchServer/store/searchByOnlie',
    method: 'get',
    params: {
      keyword: keyword  // ? 正确：使用 params 对象
    }
  })
}

