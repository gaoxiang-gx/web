import request from '@/utils/request'

export function getTagTree(param) {
  return request({
    url: '/api/tag/getTagTree',
    method: 'post',
    data: param
  })
}
export function getTagTypeList(param) {
  return request({
    url: 'api/tag/getTagTypeList',
    method: 'post',
    data: param
  })
}
export function createTag(param) {
  return request({
    url: 'api/tag/createTag',
    method: 'post',
    data: param
  })
}
export function updateTag(param) {
  return request({
    url: 'api/tag/updateTag',
    method: 'post',
    data: param
  })
}
export function createTagType(param) {
  return request({
    url: 'api/tag/createTagType',
    method: 'post',
    data: param
  })
}

export function updateTagType(param) {
  return request({
    url: 'api/tag/updateTagType',
    method: 'post',
    data: param
  })
}

export function deleteTag(param) {
  return request({
    url: 'api/tag/deleteTag',
    method: 'post',
    data: param
  })
}

