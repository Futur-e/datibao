import {createRouter, createWebHistory} from "vue-router";
import Home from "@/components/Home.vue";
import Test from "@/components/Test.vue";
import Problem from "@/components/Problem.vue";
import Login from "@/components/Login.vue";
import Top from "@/components/Top.vue";
import User from "@/components/user.vue";
import comment from "@/components/comment.vue";
import {useStore} from "vuex";
import Randomtext from "@/components/Randomtext.vue";
import {ElMessage} from "element-plus";
import Problem1 from "@/components/Problem1.vue";
import Notes from "@/components/notes.vue";
import Home1 from "@/components/Home1.vue";
import Page from "@/components/Page.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path:'/page',
            name:'page',
            component:Page,
            children:[
        {
            path: '/home',
            name: 'home1',
            component: Home1
        },
        {
            path: '/randomtext',
            name: 'randomtext',
            component: Randomtext
        },
        {
            path: '/test',
            name: 'test',
            component: Test,
            redirect:'/test/problem?id=',
            children:[
                {
                    path:'/test/problem',
                    name:'problem',
                    component:Problem
                },
                {
                    path:'/test/problem1',
                    name:'problem1',
                    component:Problem1
                }
            ]
        },
        {
            path: '/comment',
            name: 'comment',
            component: comment
        },
        {
            path: '/user',
            name: 'user',
            component: User
        },
        {
            path:'/login',
            name:'login',
            component:Login
        },
        {
            path:'/top',
            name:'top',
            component:Top
        },
        {
            path:'/notes',
            name:'notes',
            component:Notes
        },
            ]
        }
    ]
})
const store = useStore()
const token = localStorage.getItem("userToken")
router.beforeEach(async (to, from, next) => {
    if (token) {
        if (to.name === 'login') {
            next({name:'home'})
        }else {
            next()
        }
    } else {
        if (to.name === 'user' || to.name === 'comment' ||to.name === 'top'){
            ElMessage.error('请先登录')
            next({name:'login'})
        }else {
            next()
        }
    }

})
export default router
