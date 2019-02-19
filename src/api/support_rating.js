import request from '@/utils/request'

export function getDailyRanking(param) {
  return request({
    url: '/api/support/getDailyRanking',
    method: 'post',
    data: param
  })
}

export function getMonthlyRanking(param) {
  return request({
    url: '/api/support/getMonthlyRanking',
    method: 'post',
    data: param
  })
}

export function getRealTimeRanking(param) {
  return request({
    url: '/api/support/getRealTimeRanking',
    method: 'post',
    data: param
  })
}

export function getSupportRealTimePerformance(param) {
  return request({
    url: '/api/support/getSupportRealTimePerformance',
    method: 'post',
    data: param
  })
}
