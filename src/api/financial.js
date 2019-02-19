import request from '@/utils/request'

export function getOrdersPaymentItemList(param) {
  return request({
    url: '/api/orders/getOrdersPaymentItemList',
    method: 'post',
    data: param
  })
}

export function createPayProof(param) {
  return request({
    url: '/api/orders/createPayProof',
    method: 'post',
    data: param
  })
}

export function updatePayProof(param) {
  return request({
    url: '/api/orders/updatePayProof',
    method: 'post',
    data: param
  })
}

export function deletePayProof(param) {
  return request({
    url: '/api/orders/deletePayProof',
    method: 'post',
    data: param
  })
}

export function getFinanceAccountTypeList(param) {
  return request({
    url: '/api/finance/getFinanceAccountTypeList',
    method: 'post',
    data: param
  })
}

export function updateCashOnDeliveryStatusMassively(param) {
  return request({
    url: '/api/finance/updateCashOnDeliveryStatusMassively',
    method: 'post',
    data: param
  })
}
