//home模块的小仓库
const state = {
    caoquestions: {
        one: [],
        two: [],
        three: [],
        four: [],
        five: [],
        six: [],
        seven: [],
        engit: [],
        neven: [],
        ten: [],
    },
    jiquestions: {
        one: [],
        two: [],
        three: [],
        four: [],
        five: [],
        six: [],
    },
}
// mutations是唯一修改state的地方
const mutations = {
    getquestions(state, questions) {
        state.caoquestions = {
            one: [],
            two: [],
            three: [],
            four: [],
            five: [],
            six: [],
            seven: [],
            engit: [],
            neven: [],
            ten: [],
        }
        state.jiquestions = {
            one: [],
            two: [],
            three: [],
            four: [],
            five: [],
            six: [],
        }
        questions.forEach((item) => {
            if (item.sid === "数据结构与算法" || item.sid === "计算机网络") {
                if (item.cid === 1) {
                    state.jiquestions.one.push(item)
                } else if (item.cid === 2) {
                    state.jiquestions.two.push(item)
                } else if (item.cid === 3) {
                    state.jiquestions.three.push(item)
                } else if (item.cid === 4) {
                    state.jiquestions.four.push(item)
                } else if (item.cid === 5) {
                    state.jiquestions.five.push(item)
                } else if (item.cid === 6) {
                    state.jiquestions.six.push(item)
                }
            } else {
                if (item.cid === 1) {
                    state.caoquestions.one.push(item)
                } else if (item.cid === 2) {
                    state.caoquestions.two.push(item)
                } else if (item.cid === 3) {
                    state.caoquestions.three.push(item)
                } else if (item.cid === 4) {
                    state.caoquestions.four.push(item)
                } else if (item.cid === 5) {
                    state.caoquestions.five.push(item)
                } else if (item.cid === 6) {
                    state.caoquestions.six.push(item)
                } else if (item.cid === 7) {
                    state.caoquestions.seven.push(item)
                } else if (item.cid === 8) {
                    state.caoquestions.engit.push(item)
                } else if (item.cid === 9) {
                    state.caoquestions.neven.push(item)
                } else if (item.cid === 10) {
                    state.caoquestions.ten.push(item)
                }
            }
        })
    }
}
// 用户处理派发action地方的，可以书写异步
const actions = {}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}
