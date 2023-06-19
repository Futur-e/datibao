<template>
  <div style="width: 1200px">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">显示章节</el-radio-button>
      <el-radio-button :label="true">隐藏章节</el-radio-button>
    </el-radio-group>
    <el-row :gutter="24">
      <!--    章节选择-->
      <el-col :span="5">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            :unique-opened=true
            :width="300"
            @open="handleOpen"
            @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span @click="getTest(1)">计算机网络</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                  <router-link :to="{name:'problem',query:{id:'one'}}"><strong>第一章&nbsp;&nbsp;&nbsp;</strong><span>计算机网络概述</span></router-link>
              </el-menu-item>
              <el-menu-item index="1-2"><span><router-link :to="{name:'problem',query:{id:'two'}}"><strong>第二章&nbsp;&nbsp;&nbsp;</strong><span>物理层</span></router-link></span></el-menu-item>
              <el-menu-item index="1-3"><router-link :to="{name:'problem',query:{id:'three'}}"><strong>第三章&nbsp;&nbsp;&nbsp;</strong><span>数据链路层</span></router-link></el-menu-item>
              <el-menu-item index="1-4"><router-link :to="{name:'problem',query:{id:'four'}}"><strong>第四章&nbsp;&nbsp;&nbsp;</strong><span>网络层</span></router-link></el-menu-item>
              <el-menu-item index="1-5"><router-link :to="{name:'problem',query:{id:'five'}}"><strong>第五章&nbsp;&nbsp;&nbsp;</strong><span>传输层</span></router-link></el-menu-item>
              <el-menu-item index="1-6"><router-link :to="{name:'problem',query:{id:'six'}}"><strong>第六章&nbsp;&nbsp;&nbsp;</strong><span>应用层</span></router-link></el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span @click="getTest(3)">数据结构与算法</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1"><router-link :to="{name:'problem',query:{id:'one'}}"><strong>第一章&nbsp;&nbsp;&nbsp;</strong><span>算法基础</span></router-link></el-menu-item>
              <el-menu-item index="2-2"><router-link :to="{name:'problem',query:{id:'two'}}"><strong>第二章&nbsp;&nbsp;&nbsp;</strong><span>数据结构基础</span></router-link></el-menu-item>
              <el-menu-item index="2-3"><router-link :to="{name:'problem',query:{id:'three'}}"><strong>第三章&nbsp;&nbsp;&nbsp;</strong><span>树和二叉树</span></router-link></el-menu-item>
              <el-menu-item index="2-4"><router-link :to="{name:'problem',query:{id:'four'}}"><strong>第四章&nbsp;&nbsp;&nbsp;</strong><span>图和图算法</span></router-link></el-menu-item>
              <el-menu-item index="2-5"><router-link :to="{name:'problem',query:{id:'five'}}"><strong>第五章&nbsp;&nbsp;&nbsp;</strong><span>排序和查找算法</span></router-link></el-menu-item>
              <el-menu-item index="2-6"><router-link :to="{name:'problem',query:{id:'six'}}"><strong>第六章&nbsp;&nbsp;&nbsp;</strong><span>动态规划和贪心算法</span></router-link></el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>
              <span @click="getTest(2)">操作系统</span>
            </template>
            <el-menu-item index="3-1"><router-link :to="{name:'problem1',query:{id:'one'}}"><strong>第一章&nbsp;&nbsp;&nbsp;</strong><span>操作系统概述</span></router-link></el-menu-item>
            <el-menu-item index="3-2"><router-link :to="{name:'problem1',query:{id:'two'}}"><strong>第二章&nbsp;&nbsp;&nbsp;</strong><span>进程管理</span></router-link></el-menu-item>
            <el-menu-item index="3-3"><router-link :to="{name:'problem1',query:{id:'three'}}"><strong>第三章&nbsp;&nbsp;&nbsp;</strong><span>存储管理</span></router-link></el-menu-item>
            <el-menu-item index="3-4"><router-link :to="{name:'problem1',query:{id:'four'}}"><strong>第四章&nbsp;&nbsp;&nbsp;</strong><span>设备管理</span></router-link></el-menu-item>
            <el-menu-item index="3-5"><router-link :to="{name:'problem1',query:{id:'five'}}"><strong>第五章&nbsp;&nbsp;&nbsp;</strong><span>进程间通信</span></router-link></el-menu-item>
            <el-menu-item index="3-6"><router-link :to="{name:'problem1',query:{id:'six'}}"><strong>第六章&nbsp;&nbsp;&nbsp;</strong><span>网络编程</span></router-link></el-menu-item>
            <el-menu-item index="3-7"><router-link :to="{name:'problem1',query:{id:'seven'}}"><strong>第七章&nbsp;&nbsp;&nbsp;</strong><span>安全和保护</span></router-link></el-menu-item>
            <el-menu-item index="3-8"><router-link :to="{name:'problem1',query:{id:'engit'}}"><strong>第八章&nbsp;&nbsp;&nbsp;</strong><span>分布式操作系统</span></router-link></el-menu-item>
            <el-menu-item index="3-9"><router-link :to="{name:'problem1',query:{id:'neven'}}"><strong>第九章&nbsp;&nbsp;&nbsp;</strong><span>云计算</span></router-link></el-menu-item>
            <el-menu-item index="3-10"><router-link :to="{name:'problem1',query:{id:'ten'}}"><strong>第十章&nbsp;&nbsp;&nbsp;</strong><span>操作系统实现和调试</span></router-link></el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-col>
      <!--    题目部分-->
      <el-col :span="17">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script  setup>
import {computed, ref, watch} from 'vue'
import axios from "axios";
import {getre} from "@/api/login.js";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {useStore} from "vuex";
import router from "@/router/route.js";

const isCollapse = ref(false)
const store = useStore()
const handleOpen = (key,keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const o1 = ref([])
const sid = ref(1)

const access = localStorage.getItem("userToken")
const refresh = localStorage.getItem("refresh")

const torefresh = async () => {
 const result = await getre(refresh)
  localStorage.setItem("userToken",result.data.access)
  router.go(0)
}

function getTest(sid){
  router.currentRoute.value.query = 0
  axios({
    type: 'get',
    url: `http://112.126.68.59/api/appone/test?sid=${sid}`,
    headers:{
      'Authorization':"Bearer " + access
    }
  }).then((req)=>{
    if (req.status === 200){
      o1.value = req.data
      console.log(o1.value)
      store.commit("getquestions",o1.value)
    }
  }).catch((err)=>{
    console.log("ad",err)
    console.log("刷新了")
    torefresh()
  })
}

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 517px;
}
</style>
