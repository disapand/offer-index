import request from '../plugins/axios'

export function login (account, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function profile () {
  return request({
    url: '/profile',
    method: 'get'
  })
}
