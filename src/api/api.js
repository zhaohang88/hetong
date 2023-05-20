/*
 * 公共部分
 */

import request from '@/utils/request'

export const classifications = (data) => {
  // 全部分类列表
  return request({
    method: 'POST',
    url: '/api/index/list'
  })
}

export const contracts = (data) => {
  // 首页合同
  return request({
    method: 'POST',
    url: '/api/index/pages'
  })
}

export const searchBelow = (data) => {
  // 首页合同
  return request({
    method: 'POST',
    url: '/api/index/search_below'
  })
}

export const search = (data) => {
  // search page api
  return request({
    method: 'POST',
    url: '/api/index/search',
    data
  })
}

export const search2search = (data) => {
  // classify page api
  return request({
    method: 'POST',
    url: '/api/index/searc_all',
    data
  })
}

export const detailInfo = (data) => {
  // 合同详情页 // TODO detail page use
  return request({
    method: 'POST',
    url: '/api/index/info',
    data
  })
}
