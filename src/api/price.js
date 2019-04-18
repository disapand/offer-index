import request from '../plugins/axios'

export function getPrices () {
  return request({
    url: '/prices',
    method: 'get'
  })
}

export function getPricesByName (name) {
  return request({
    url: '/price/' + name,
    method: 'get'
  })
}

export function getPricesPagination (pageNo) {
  return request({
    url: '/prices?page=' + pageNo,
    method: 'get'
  })
}

export function getPrice (id) {
  return request({
    url: '/price/' + id,
    method: 'get'
  })
}

export function deletePrice (id) {
  return request({
    url: '/price/' + id,
    method: 'delete'
  })
}

export function addPrice (name, level, range, price, notice) {
  return request({
    url: '/price',
    method: 'post',
    data: {
      name,
      level,
      range,
      price,
      notice
    }
  })
}

export function editPrice (id, name, level, range, price, notice) {
  return request({
    url: '/price/' + id,
    method: 'post',
    data: {
      name,
      level,
      range,
      price,
      notice
    }
  })
}
