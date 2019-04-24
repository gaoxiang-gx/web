import request from '@/utils/request'

// 获取商品基础信息列表
export function getProductGoodsCommonBaseList(param) {
  return request({
    url: '/api/goods/getProductGoodsCommonBaseList',
    method: 'post',
    data: param
  })
}
// 获取公共商品详情
export function getProductGoodsCommonInfo(param) {
  return request({
    url: '/api/goods/getProductGoodsCommonInfo',
    method: 'post',
    data: param
  })
}
// 获取商品基础信息列表
export function getBrandList(param) {
  return request({
    url: '/api/goods/getBrandList',
    method: 'post',
    data: param
  })
}
// 创建商品基础信息
export function createProductGoodsCommonBase(param) {
  return request({
    url: '/api/goods/createProductGoodsCommonBase',
    method: 'post',
    data: param
  })
}
// 修改商品基础信息
export function updateProductGoodsCommonBase(param) {
  return request({
    url: '/api/logistics_warehouse/updateProductGoodsCommonBase',
    method: 'post',
    data: param
  })
}
// 修改(与创建)产品与公共商品
export function updateProductRProductGoodsCommon(param) {
  return request({
    url: '/api/logistics_warehouse/updateProductRProductGoodsCommon',
    method: 'post',
    data: param
  })
}
export function getProductGoodsListImportStorage(param) {
  return request({
    url: '/api/goods/getProductGoodsListImportStorage',
    method: 'post',
    data: param
  })
}
export function getProductCategoryTreeList(param) {
  return request({
    url: '/api/goods/getProductCategoryTreeList',
    method: 'post',
    data: param
  })
}
export function createProductCategory(param) {
  return request({
    url: '/api/goods/createProductCategory',
    method: 'post',
    data: param
  })
}
export function updateProductCategory(param) {
  return request({
    url: '/api/goods/updateProductCategory',
    method: 'post',
    data: param
  })
}
export function changeProductCategoryStatus(param) {
  return request({
    url: '/api/goods/changeProductCategoryStatus',
    method: 'post',
    data: param
  })
}

