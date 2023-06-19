//home模块的小仓库
const state = {
    showHome:sessionStorage.getItem("show")
}
// mutations是唯一修改state的地方
const mutations = {
    CHANGESHOW(state){
        state.showHome = false
    }
}
// 用户处理派发action地方的，可以书写异步
const actions = {
    changeShow(content){
        content.commit('CHANGESHOW')
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}
