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
    url: '/api/goods/updateProductGoodsCommonBase',
    method: 'post',
    data: param
  })
}
// 修改(与创建)产品与公共商品
export function updateProductRProductGoodsCommon(param) {
  return request({
    url: '/api/goods/updateProductRProductGoodsCommon',
    method: 'post',
    data: param
  })
}
// 规格设置
export function getProductGoodsList(param) {
  return request({
    url: '/api/goods/getProductGoodsList',
    method: 'post',
    data: param
  })
}
// 规格设置创建
export function createProductGoods(param) {
  return request({
    url: '/api/goods/createProductGoods',
    method: 'post',
    data: param
  })
}
// 规格设置编辑
export function updateProductGoods(param) {
  return request({
    url: '/api/goods/updateProductGoods',
    method: 'post',
    data: param
  })
}
// 所属产品
export function getProductList(param) {
  return request({
    url: '/api/goods/getProductList',
    method: 'post',
    data: param
  })
}
export function changeProductGoodsStatus(param) {
  return request({
    url: '/api/goods/changeProductGoodsStatus',
    method: 'post',
    data: param
  })
}
// 获取商品分类树
export function getProductCategoryTreeList(param) {
  return request({
    url: '/api/goods/getProductCategoryTreeList',
    method: 'post',
    data: param
  })
}
export function getProductGoodsSkuList(param) {
  return request({
    url: '/api/goods/getProductGoodsSkuList',
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
