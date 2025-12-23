// src/api/auth.js
import request from '@/api/request'



/**
 * 添加到待下载列表
 * @param {Object} novel - 包含书名、作者、链接等信息
 * @returns {Promise} - 返回 token 等信息
 */
export function joinToDownload(novel) {
  return request({
    url: '/downloadServer/waitDownLoad/joinToDownload',
    method: 'post',
    data: {     
      novel: [{
        bookName: novel.novelName,
        bookUrl: novel.url,
        bookAuthor: novel.auther  
      }]}  
  })
}


/**
 * 开始下载
 * @param {Object} novel - 包含书名、作者、链接等信息
 * @returns {Promise} - 返回 token 等信息
 */
export function toDownLoad(book) {
  return request({
    url: '/downloadServer/download/downloadByTask',
    method: 'post',
    data: {     
        novel:[
          {
            id: book.id,
            bookName: book.novelName,
            bookUrl: book.url,
            bookAuthor:book.auther
          }
        ]
    }  
  })
}

/**
 * 从待下载列表中查询
 * @param {Object} bookName - 书名
 * @returns {Promise} - 返回 token 等信息
 */
export function queryFromWaitDownLoad(bookName) {
  return request({
    url: '/downloadServer/waitDownLoad/queryWaitDownLoad',
    method: 'get',
    params: {
      bookName: bookName  
    }
  })
}


