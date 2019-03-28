import Cookies from 'js-cookie'

const userTokenKey = 'User-Token'
const accountTokenKey = 'Account-Token'

export function getUserToken() {
  return Cookies.get(userTokenKey, { domain: process.env.COOKIE_DOMAIN })
}

export function setUserToken(token) {
  let d = new Date();
  d.setTime(d.getTime() + ( 7 * 3600 * 1000));
  return Cookies.set(userTokenKey, token, { domain: process.env.COOKIE_DOMAIN, expires: d  })
}

export function removeUserToken() {
  return Cookies.remove(userTokenKey, { domain: process.env.COOKIE_DOMAIN })
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
