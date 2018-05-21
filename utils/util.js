function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/**
 * [微信接口promise化]
 * @param  {[Function]} func [description]
 * @return {[Promise]}      [description]
 */
function promisefy(func) {
  return function(obj = {}) {
    return new Promise((resolve, reject) => {
      func(Object.assign({}, obj, { success:resolve, fail: reject}))
    })
  }
}
/**
 * [setStorage 异步设置缓存promise化]
 * @param {[type]} key  [description]
 * @param {[type]} data [description]
 */
function setStorage(key, data) {
  return promisefy((data) => {
    wx.setStorage(data)
  })({key, data})
}
/**
 * [getStorage 异步获取缓存promise化]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function getStorage(key) {
  return promisefy((data) => {
    wx.getStorage(data)
  })({key})
}
/**
 * [removeStorage 异步移除缓存promise化]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function removeStorage(key) {
  return promisefy((data) => {
    wx.removeStorage(data)
  })({key})
}
/**
 * [Object to param string]
 * @param  {[Object]} data [description]
 * @return {[String]}      [description]
 */
function params(data) {
  return Object.keys(data).filter( d => data[d]).map(v => `${encodeURIComponent(v)}=${encodeURIComponent(data[v])}`).join('&')
}

export default {
  formatTime,
  promisefy,
  setStorage,
  getStorage,
  removeStorage,
  params
}

