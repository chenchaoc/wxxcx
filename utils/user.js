/*
* @Author: chenchao
* @Date: 2018-05-24 11:12:29
* @Email: chenchao3@sh.superjia.com
* @Last Modified by: chenchao
* @Last Modified time: 2018-05-25 15:22:39
*/

import api from '../config/api.js'
import utils from './utils.js'

/**
 * [微信登录]
 * @return {[promise]} [description]
 */
function login() {
    return new Promise((resolve, reject) => {
        wx.login({
            success: (res) => {
                if (res.code) {
                    resolve(res)
                } else {
                    reject(res)
                }
            },
            fail: (error) => {
                reject(error)
            }
        })
    })
}

/**
 * [getUserInfo 获取用户信息]
 * @return {[promise]} [description]
 * 当 withCredentials 为 true 时，要求此前有调用过 wx.login 且登录态尚未过期，此时返回的数据会包含 encryptedData, iv 等敏感信息；当 withCredentials 为 false 时，不要求有登录态，返回的数据不包含 encryptedData, iv 等敏感信息
 */

function getUserInfo() {
    return utils.promisefy(wx.getUserInfo)({ withCredentials: true })
}

/**
 * [loginByWeixin 微信登录，存储userInfo，token在本地]
 * @return {[promise]} [description]
 */
function loginByWeixin() {
    let code = null
    return new Promise((resolve, reject) => {
        return login().then((res) => {
            code = res.code
            return getUserInfo()
        }).then((userInfo) => {
            api('AuthLoginByWeixin', { code, userInfo}).then((d) => {
                if (d.errorCode == 0) {
                    wx.setStorageSync('userInfo', d.data.userInfo)
                    wx.setStorageSync('token', d.data.token)
                    resolve(d)
                } else {
                    reject(d)
                }
            }).catch((error) => {
                reject(error)
            })
        }).catch((error) => {
            reject(error)
        })
    })
}

/**
 * [checkSession 校验用户当前session_key是否有效]
 * @return {[promise]} [description]
 */
function checkSession() {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success: () => {
                resolve(true)
            },
            fail: () => {
                reject(false)
            }
        })
    })
}
/**
 * [checkLogin 判断用户是否登录]
 * @return {[promise]} [description]
 * user.checkLogin().then(() => {已登录cb}).catch(() => {未登录cb})
 */
function checkLogin() {
    return new Promise((resolve, reject) => {
        if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
            return checkSession().then((d) => {
                resolve(d)
            }).catch((e) => {
                reject(e)
            })
        } else {
            reject(false)
        }
    })
}


export default {
    getUserInfo,
    checkSession,
    loginByWeixin,
    checkLogin
}