//home模块的小仓库

import {delToken, getToken, saveToken} from "@/utils/saveToken.js";

const state = {
    access:getToken,
    isLogin:false,
    userName:'',
    avtar:'https://cdn.acwing.com/media/user/profile/photo/110280_md_dd1bec19f7.jpg'
}
// mutations是唯一修改state的地方
const mutations = {
    GETUSERTOKEN(state,token){
        state.access = token
        state.isLogin = true
        //存储token到本地
        saveToken(token)
    },
    DELUSERTOKEN(state){
        delToken()
        state.userName=''
        state.isLogin=false
        state.access=''
    },
    changeAvtar(state,img){
        state.avtar = img
    }
}
// 用户处理派发action地方的，可以书写异步
const actions = {
    getUsertoken(context,token){
        context.commit("GETUSERTOKEN",token)
    },
    delUserToken(context){
        context.commit("DELUSERTOKEN")
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}
