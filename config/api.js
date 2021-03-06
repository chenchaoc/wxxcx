/*
* @Author: chenchao
* @Date: 2018-05-18 18:03:43
* @Email: chenchao3@sh.superjia.com
 * @Last Modified by: chenchao
 * @Last Modified time: 2018-05-24 14:15:50
*/
const baseUrl = 'https://www.easy-mock.com/mock/5afe9b8a6ba6060f61c23124/service/'
import ajax from '../utils/ajax.js'

const apiMap = {
    list: 'list.action', //列表
    AuthLoginByWeixin: 'loginByWeixin.action'
}

export default function(name, ...arg) {
    return ajax(`${baseUrl}${apiMap[name]}`, ...arg)
}