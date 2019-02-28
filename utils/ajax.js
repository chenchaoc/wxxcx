/*
* @Author: chenchao
* @Date: 2018-05-18 10:35:02
* @Email: chenchao3@sh.superjia.com
 * @Last Modified by: chenchao
 * @Last Modified time: 2018-05-25 11:41:42
*/

/**
 * [ajax请求Promise化]
 * @param  {[String]} url     [description]
 * @param  {Object} data    [description]
 * @param  {Object} options [description]
 * @return {[Promise]}         [description]
 */

function ajax(url, data = {}, options = {}) {
    const defaultConfig = {
        url: '', //String 开发者服务器接口地址
        method: 'POST', //请求方式：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        data: {}, //请求的参数
        header: { //Object 设置请求的 header，header 中不能设置 Referer
            'content-type': 'application/json', //默认值
            'MYYCY-TOKEN': wx.getStorageSync('token') || '' //token值   首页没登录不应该有
        },
        dataType: 'json', //String如果设为json，会尝试对返回的数据做一次 JSON.parse
        // success: () => {}, //Function 收到开发者服务成功返回的回调函数
        // fail: () => {}, //Function 接口调用失败的回调函数  
        // complete: () => {}, //Function 接口调用结束的回调函数（调用成功、失败都会执行）
    }
    return new Promise((resolve, reject) => {
        wx.request(Object.assign({}, defaultConfig, {
            url,
            data: Object.assign({}, data, { _t: new Date().getTime() }),
            success: resolve,
            fail: reject,
            ...options
        }))
    }).then((res) => res.data)
}

export default ajax
