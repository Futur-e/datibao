<script setup>

import Footer from "@/components/Footer.vue";
import LoginButton from "@/components/LoginButton.vue";
import {useRouter} from "vue-router";
import {computed, reactive, ref} from "vue";
import {useStore} from "vuex";
import Fixed from "@/components/fixed.vue";
import Home from "@/components/Home.vue";


const router = useRouter()
const store = useStore()
const isaction = ref(0)

const tapdata = reactive(
    [
      {
        id:0,
        title:'首页',
        adress:'/',
      },
      {
        id:1,
        title:'随机题库',
        adress:'/randomtext',
      },
      {
        id:2,
        title:'章节训练',
        adress:'/test',
      },
      {
        id:3,
        title:'讨论区',
        adress:'/comment',
      },
      {
        id:4,
        title:'答题排行榜',
        adress:'/top',
      },
      {
        id:5,
        title:'个人主页',
        adress:'/user',
      }
    ]
)

</script>

<template>
  <div class="big-box" >
    <router-view></router-view>
  </div>
</template>

<style scoped>

.big-box{
  width: 100%;
  height: 100%;
}
</style>
