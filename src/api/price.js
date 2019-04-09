import request from '../plugins/axios'

export function getPrices () {
  return request({
    url: '/prices',
    method: 'get'
  })
}
