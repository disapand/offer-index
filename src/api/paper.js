import request from '../plugins/axios'

export function papers () {
  return request({
    url: '/papers',
    method: 'get'
  })
}

export function getPaper (id) {
  return request({
    url: '/paper/' + id,
    method: 'get'
  })
}

export function paper (data) {
  return request({
    url: '/paper',
    method: 'post',
    data: data
  })
}
