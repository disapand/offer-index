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

export function profiles () {
  return request({
    url: '/profiles',
    method: 'get'
  })
}

export function register (account, password, username, sign) {
  return request({
    url: 'profile',
    method: 'post',
    data: {
      account,
      password,
      username,
      sign
    }
  })
}
