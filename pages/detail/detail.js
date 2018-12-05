/*
* @Author: chenchao
* @Date: 2018-05-25 11:04:33
* @Email: chenchao3@sh.superjia.com
* @Last Modified by: chenchao
* @Last Modified time: 2018-05-28 10:57:44
*/
import user from '../../utils/user'
import utils from '../../utils/utils'

Page({
    data: {
        userInfo: wx.getStorageSync('userInfo') || {}
    },
    onLoad() {
        user.checkSession().then((d) => {
            console.log(d)
        }).catch((e) => {
            console.log(e)
        })
        //console.log(getCurrentPages())
        console.log(this.data.userInfo)
    },
    buyNow() {
        user.checkLogin().then((d) => {
            console.log('已登陆，买买买')
            //买买买
        }).catch(() => {
            console.log('未登陆，去登录')
            utils.promisefy(wx.showModal)({
              title: '当前未登录',
              content: '确认去登录吗？'
            }).then((res) => {
                if (res.confirm) {
                    wx.navigateTo({
                        url: '/pages/login/login'
                    })
                } else {
                    console.log('用户点取消了,不登录，那就再看看')
                }
            })
        })
    },
    onShow() {
        !this.data.userInfo.avatarUrl && this.setData({
            userInfo: wx.getStorageSync('userInfo')
        })
    }
})