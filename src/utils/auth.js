import Cookies from 'js-cookie'

const userTokenKey = 'User-Token'
const accountTokenKey = 'Account-Token'

export function getUserToken() {
  return Cookies.get(userTokenKey, { path: '' })
}

export function setUserToken(token) {
  return Cookies.set(userTokenKey, token, { path: '' })
}

export function removeUserToken() {
  return Cookies.remove(userTokenKey, { path: '' })
}

export function getAccountToken() {
  return Cookies.get(accountTokenKey, { path: '' })
}

export function setAccountToken(token) {
  return Cookies.set(accountTokenKey, token, { path: '' })
}

export function removeAccountToken() {
  return Cookies.remove(accountTokenKey, { path: '' })
}
