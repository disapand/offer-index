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

export function getPricesPagination (pageNo) {
  return request({
    url: '/papers?page=' + pageNo,
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

export function deletePaper (id) {
  return request({
    url: '/paper/' + id,
    method: 'delete'
  })
}

export function paperSearch (company) {
  return request({
    url: '/paperSearch/' + company,
    method: 'get'
  })
}
