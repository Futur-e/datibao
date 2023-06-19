<template>
  <div class="bg-box">
    <div class="header">
      <div class="l">
        <img src="@/assets/logo.png" alt="" class="log" style="width: 50px;height: 45px;padding-right: 20px">
        <span style="color: white;font-family: 黑体;font-size: 20px">智题星——考研408刷题平台</span>
      </div>
      <div>
        <span style="color: white;font-family: 黑体;font-size: 20px">{{new Date() }}</span>
      </div>
    </div>
     <div style="display: flex;width: 100%;height: 70%; justify-content: center;align-items: center">
       <img src="@/assets/zhi.png" alt=""  style="width: 200px;height: 250px" >
       <img src="@/assets/ti.png" alt="" style="width: 100px;height: 170px" >
       <img src="@/assets/xing.png" alt=""  style="width: 200px;height: 250px" >
     </div>
    <div style="display: flex;justify-content: center;">
      <el-button type="primary" style="width: 150px" @click="toHome">进&nbsp;&nbsp;&nbsp;&nbsp;入</el-button>
    </div>
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";
import {useStore} from "vuex";
const router = useRouter()
const store = useStore()

function toHome() {
  store.state.show.showHome=false
  router.push('/home')
  sessionStorage.setItem("show","false")
}
</script>

<style scoped>
.bg-box{
  width: 100%;
  height: 100%;
  background: url("@/image/banner.jpg") no-repeat;
  background-position: center;
  background-size: 100% 100% ;
}
.header{
  width: 1350px;
  height: 10%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.l{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
