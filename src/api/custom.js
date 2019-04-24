import request from '../plugins/axios'

export function getCustoms () {
  return request({
    url: '/customs',
    method: 'get'
  })
}

export function getCustomsByNameOrCompany (nameOrCompany, currentPage = 1) {
  return request({
    url: '/customQuery/' + nameOrCompany + '?page=' + currentPage,
    method: 'get'
  })
}

export function getCustomsPagination (pageNo) {
  return request({
    url: '/customs?page=' + pageNo,
    method: 'get'
  })
}

export function getCustom (id) {
  return request({
    url: '/custom/' + id,
    method: 'get'
  })
}

export function newCustom (custom) {
  return request({
    url: '/custom',
    method: 'post',
    data: custom
  })
}

export function deleteCustom (id) {
  return request({
    url: '/custom/' + id,
    method: 'delete'
  })
}

export function updateCustom (id, custom) {
  return request({
    url: '/custom/' + id,
    method: 'post',
    data: custom
  })
}
