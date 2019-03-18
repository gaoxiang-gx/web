import Cookies from 'js-cookie'

const userTokenKey = 'User-Token'
const accountTokenKey = 'Account-Token'

export function getUserToken() {
  return Cookies.get(userTokenKey, { domain: '7055.net' })
}

export function setUserToken(token) {
  return Cookies.set(userTokenKey, token, { domain: '7055.net' })
}

export function removeUserToken() {
  return Cookies.remove(userTokenKey, { domain: '7055.net' })
}

export function getAccountToken() {
  return Cookies.get(accountTokenKey)
}

export function setAccountToken(token) {
  return Cookies.set(accountTokenKey, token)
}

export function removeAccountToken() {
  return Cookies.remove(accountTokenKey)
}
