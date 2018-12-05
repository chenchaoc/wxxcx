/*
* @Author: chenchao
* @Date: 2018-05-24 14:52:04
* @Email: chenchao3@sh.superjia.com
 * @Last Modified by: chenchao
 * @Last Modified time: 2018-06-28 15:36:01
*/
import user from '../../utils/user'
import utils from '../../utils/utils'

Page({
  data: {
    userInfo: {}
  },
  onLoad() {

  },
  //用户授权后调用
  onGetUserInfo(e) {
    if (e.detail.errMsg.includes('deny')) {
      wx.redirectTo({
        url: '/pages/abc/abc'
      })
    } else if (e.detail.errMsg.includes('ok')) {
      user.loginByWeixin().then((res) => {
        //app.globalData.userInfo = res.data.userInfo
        wx.switchTab({
          url: '/pages/index/index'
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
})