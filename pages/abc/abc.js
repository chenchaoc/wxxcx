/*
* @Author: chenchao
* @Date: 2018-05-16 18:24:17
* @Email: chenchao3@sh.superjia.com
* @Last Modified by: chenchao
* @Last Modified time: 2018-05-18 18:49:36
*/
import api from './api.js'

Page({
    data:{
        list: []
    },
    onLoad() {
        api('list', {a:1},{header:{b:2}}).then((d) => {
            if(d.errorCode == 0) {
                console.log(d)
                this.setData({
                    list: d.data.list
                })
            }
        })
    }
})