/*
* @Author: chenchao
* @Date: 2018-05-16 18:24:17
* @Email: chenchao3@sh.superjia.com
 * @Last Modified by: chenchao
 * @Last Modified time: 2018-05-28 11:07:22
*/
import api from '../../config/api.js'
import utils from '../../utils/utils.js'
import user from '../../utils/user.js'

const app = getApp()

Page({
    data:{
        list: [],
        userInfo: {}
    },
    onLoad() {
        api('list', {a:1}).then((d) => {
            if(d.errorCode == 0) {
                console.log(d)
                this.setData({
                    list: d.data.list
                })
            }
        })
        //this.getUserInfo()
/*        user.loginByWeixin().then((d) => {
            console.log(d)
        }).catch((e) => {
            console.log(e)
        })*/
    },
    getUserInfo() {
        if (!app.globalData.userInfo) {
            this.setData({
                userInfo:  app.globalData.userInfo
            })
        } else {
            utils.promisefy(wx.getSystemInfo)().then((res) => {
                if (res.errMsg.includes('ok')) {
                    console.log(res)
                }
            })
        }
    }
})