import request from '@/utils/request'

export function getProductGoodsList(param) {
  return request({
    url: '/api/product/getProductGoodsList',
    method: 'post',
    data: param
  })
}

export function createProductGoods(param) {
  return request({
    url: '/api/product/createProductGoods',
    method: 'post',
    data: param
  })
}

export function updateProductGoods(param) {
  return request({
    url: '/api/product/updateProductGoods',
    method: 'post',
    data: param
  })
}

export function deleteProductGoods(param) {
  return request({
    url: '/api/product/deleteProductGoods',
    method: 'post',
    data: param
  })
}
export function createProductGoodCost(param) {
  return request({
    url: '/api/product/createProductGoodCost',
    method: 'post',
    data: param
  })
}
export function getProductGoodCostList(param) {
  return request({
    url: '/api/product/getProductGoodCostList',
    method: 'post',
    data: param
  })
}
