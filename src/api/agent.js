import request from '@/utils/request'
// 获取所有列表
export function getAgentGoodsList (param) {
  return request({
    url: 'api/agent/getAgentGoodsList',
    method: 'post',
    data: param
  })
}

export function createAgentGoodsItem (param) {
  return request({
    url: 'api/agent/createAgentGoodsItem',
    method: 'post',
    data: param
  })
}
export function zipPackage (param) {
  return request({
    url: 'api/agent/zipPackage',
    method: 'post',
    data: param
  })
}
export function zipDownload  (param) {
  return request({
    url: 'api/agent/zipDownload ',
    method: 'post',
    data: param
  })
}


