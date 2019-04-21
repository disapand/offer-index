import request from '../plugins/axios'

export function paper (data) {
  return request({
    url: '/paper',
    method: 'post',
    data: data
  })
}
