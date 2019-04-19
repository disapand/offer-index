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

export function profileDelete (id) {
  return request({
    url: '/profile/' + id,
    method: 'delete'
  })
}

export function getProfile (id) {
  return request({
    url: '/profile/' + id,
    method: 'get'
  })
}

export function profileUpdate (id, account, password, username, sign, number, tel) {
  return request({
    url: '/profile/' + id,
    method: 'put',
    data: {
      account,
      password,
      username,
      sign,
      number,
      tel
    }
  })
}

export function register (account, password, username, sign, number, tel) {
  return request({
    url: 'profile',
    method: 'post',
    data: {
      account,
      password,
      username,
      sign,
      number,
      tel
    }
  })
}
