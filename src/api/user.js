/*
 * 登录
 */

import request from '@/utils/request'

export const sendVerificationCode = (data) => {
  // 发送验证码
  return request({
    method: 'POST',
    url: '/api//login/send',
    data
  })
}

export const registered = (data) => {
  // 用户登录注册接口
  return request({
    method: 'POST',
    url: '/api//login/registered',
    data
  })
}

export const userinfoEdit = (data) => {
  // 用户信息编辑
  return request({
    method: 'POST',
    url: '/api//login/userinfo_edit',
    data
  })
}
