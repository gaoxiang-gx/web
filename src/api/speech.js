import request from '@/utils/request'

export function getSpeechList(param) {
  return request({
    url: '/api/speech/getSpeechList',
    method: 'post',
    data: param
  })
}
export function editSpeechTag(param) {
  return request({
    url: '/api/speech/editSpeechTag',
    method: 'post',
    data: param
  })
}
export function updateSpeech(param) {
  return request({
    url: '/api/speech/updateSpeech',
    method: 'post',
    data: param
  })
}
export function createSpeech(param) {
  return request({
    url: '/api/speech/createSpeech',
    method: 'post',
    data: param
  })
}
export function switchPerfectSpeech(param) {
  return request({
    url: '/api/speech/switchPerfectSpeech',
    method: 'post',
    data: param
  })
}
export function deleteSpeech(param) {
  return request({
    url: '/api/speech/deleteSpeech',
    method: 'post',
    data: param
  })
}
export function getSpeechCommentBySpeech(param) {
  return request({
    url: 'api/speech/getSpeechCommentBySpeech',
    method: 'post',
    data: param
  })
}
export function createSpeechComment(param) {
  return request({
    url: 'api/speech/createSpeechComment',
    method: 'post',
    data: param
  })
}
export function deleteSpeechComment(param) {
  return request({
    url: 'api/speech/deleteSpeechComment',
    method: 'post',
    data: param
  })
}

export function createSpeechPrise(param) {
  return request({
    url: 'api/speech/createSpeechPrise',
    method: 'post',
    data: param
  })
}

export function deleteSpeechPrise(param) {
  return request({
    url: 'api/speech/deleteSpeechPrise',
    method: 'post',
    data: param
  })
}

export function checkSpeech(param) {
  return request({
    url: '/api/speech/checkSpeech',
    method: 'post',
    data: param
  })
}

