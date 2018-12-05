//index.js
//获取应用实例
//import user from '../../utils/user.js';
import ajax from '../../utils/ajax.js'
import utils from '../../utils/utils.js'
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
  },
  //事件处理函数
  bindAbc(){
    wx.navigateTo({
      url: '/pages/abc/abc'
    })
  },
  bindLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  bindDetail() {
    wx.navigateTo({
      url: '/pages/detail/detail'
    })
  },
  onLoad() {
/*    user.getUserInfo().then((d) => {
      console.log(d)
    })
    user.login().then((res) => {
      console.log(res)
    })
    user.checkSession().then((d) => {
      console.log(d)
    }).catch((e) => {
      
    })*/

  },
  onShareAppMessage(options) {
    console.log(options)
    return {
      title: '转发标题',
      path: '/pages/index/index'

    }
  }
})
