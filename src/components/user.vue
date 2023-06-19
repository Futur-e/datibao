<template>
  <div class="container">
    <!-- 左侧栏目 -->
    <div class="sidebar">
      <div class="profile">
        <img :src="userInfo.avatar" alt="avatar" class="avatar" @click="editUser"/>
        <h2>{{ userInfo.name }}</h2>
      </div>
      <div class="navigation">
        <ul>
          <li>
            <router-link to="/notes">
              <i class="iconfont icon-note"></i>
              <span>个人笔记</span>
            </router-link>
          </li>
          <li>
            <router-link to="/favorites">
              <i class="iconfont icon-star"></i>
              <span>收藏夹</span>
            </router-link>
          </li>
          <li>
            <router-link to="/solutions">
              <i class="iconfont icon-solution"></i>
              <span>我的题解</span>
            </router-link>
          </li>
          <li>
            <router-link to="/analysis">
              <i class="iconfont icon-analysis"></i>
              <span>做题分析</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!--弹出框-->
    <el-dialog v-model="dialogFormVisible" title="修改用户信息">
      <el-form :model="userInfo1">
        <el-form-item label="头像" :label-width="formLabelWidth">
          <img :src="userInfo.avatar" alt="" style="width: 100px;height: 100px;border-radius: 5px">
          <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :on-change="changeFile"
          >
            <el-button type="info" style="margin-left: 20px">更换头像</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="userInfo1.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="userInfo1.gender" placeholder="请选择你的性别">
            <el-option label="男" value="1"/>
            <el-option label="女" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="userInfo1.age"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="toUpdata">
          Confirm
        </el-button>
      </span>
      </template>
    </el-dialog>

    <!--     右侧内容区-->
    <div class="main-content">
      <!-- 展示用户刷题正确率 -->
      <div class="chart">
        <div class="title">
          <h3>刷题正确率</h3>
          <div ref="chartRef" class="echarts-chart"></div>
        </div>
        <div class="right">
          <el-input v-model="input3" placeholder="请输入" class="input-with-select">
            <template #prepend>
              <el-cascader v-model="select" placeholder="请选择科目查询" style="width: 115px" :options="options"
                           @change="handleChange"></el-cascader>
            </template>
            <template #append>
              <el-button icon="Search"/>
            </template>
          </el-input>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="题目" width="180" align="first"/>
            <el-table-column prop="name" label="题目难度" width="180" align="center"/>
          </el-table>
          <el-pagination v-model:current-page="currentPage1" :page-size="10" :small="small" :disabled="disabled"
                         :background="background" layout="total, prev, pager, next" :total="100"
                         @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import {getre} from "@/api/login.js";
import {useStore} from "vuex";

const userInfo = ref({
  name: '张红亮',
  avatar: 'https://avatars.githubusercontent.com/u/60138743?v=4', // 头像图片地址
  age: 0,
  gender: '',
  folloeweCount: 0,
  user_id: ''
})
const userInfo1 = ref({})

// 用户正确率数据
const accuracyData = ref([80, 90, 85, 95, 75, 80, 70])
const xAxisData = ref(['数据结构', '计算机网络', '计算机组成原理', '操作系统'])
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const fileList = ref([])
const store = useStore()
const changeFile = (uploadFile, uploadFilzes) => {
  console.log(uploadFile.name)
  if (uploadFile.name === "1.jpg"){
    userInfo.value.avatar="https://img.wxcha.com/m00/f1/fe/59374629082ae70b96e4d2365d1bd05e.jpg"
    store.commit("changeAvtar",userInfo.value.avatar)
  }else if(uploadFile.name === "2.jpg"){
    userInfo.value.avatar="https://img.wxcha.com/m00/41/f5/223b0737fb0f37dad5eec8a2887e03fb.jpg"
    store.commit("changeAvtar",userInfo.value.avatar)
  }else if (uploadFile.name === "3.jpg"){
    userInfo.value.avatar="https://img.wxcha.com/m00/5a/6e/83a236144820656596427616d3db1c40.jpg?down"
    store.commit("changeAvtar",userInfo.value.avatar)
  }
}

function editUser() {
  dialogFormVisible.value = true
  userInfo1.value = Object.assign({}, userInfo.value)
}

const tableData = ref([
  {
    date: '在传输介质中光缆的抗电磁干扰最好',
    name: '困难'
  },
  {
    date: '算法的时间复杂度取决于',
    name: '简单'
  },
  {
    date: '数据的逻辑结构是指数据的各数据项之间的逻辑关系',
    name: '困难'
  },
  {
    date: '完成在双循环链表结点p之后插入s的操作是',
    name: '困难'
  },
  {
    date: '进程控制块是描述进程状态和特性的数据结构，一个进程',
    name: '困难'
  },
  {
    date: '允许多个用户以交互使用计算机的操作系统是',
    name: '困难'
  },
])
const input3 = ref('')
const select = ref('')
const currentPage1 = ref(1)
const small = ref(false)
const disabled = ref(false)
const background = ref(false)
const options = ref([
  {
    value: 'guide',
    label: '数据结构',
    children: [
      {
        value: 'disciplines',
        label: '已通过题目'
      },
      {
        value: 'navigation',
        label: '提交未通过题目'
      },
      {
        value: 'navigation',
        label: '未开始题目'
      }
    ]
  },
  {
    value: 'component',
    label: '计算机网络',
    children: [
      {
        value: 'disciplines',
        label: '已通过题目'
      },
      {
        value: 'navigation',
        label: '提交未通过题目'
      },
      {
        value: 'navigation',
        label: '未开始题目'
      }
    ]
  },
  {
    value: 'resource',
    label: '计算机组成原理',
    children: [
      {
        value: 'disciplines',
        label: '已通过题目'
      },
      {
        value: 'navigation',
        label: '提交未通过题目'
      },
      {
        value: 'navigation',
        label: '未开始题目'
      }
    ]
  },
  {
    value: 'resource',
    label: '操作系统',
    children: [
      {
        value: 'disciplines',
        label: '已通过题目'
      },
      {
        value: 'navigation',
        label: '提交未通过题目'
      },
      {
        value: 'navigation',
        label: '未开始题目'
      }
    ]
  }
])

const handleSizeChange = val => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = val => {
  console.log(`current page: ${val}`)
}
const handleChange = value => {
  console.log(value)
}
const chartRef = ref(null)
onMounted(() => {
  const xAxisData = ref(['数据结构', '计算机网络', '计算机组成原理', '操作系统'])
  // 初始化echarts图表
  const chart = echarts.init(chartRef.value)
  chart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: xAxisData
    },
    series: [
      {
        name: '正确率',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          {value: 80, name: '数据结构'},
          {value: 90, name: '计算机网络'},
          {value: 85, name: '计算机组成原理'},
          {value: 95, name: '操作系统'}
        ]
      }
    ]
  })
})


const a = localStorage.getItem("userToken")
const refresh = localStorage.getItem("refresh")
const router = useRouter()
sendCode()

function sendCode() {
  axios({
    type: 'get',
    url: "http://112.126.68.59/api/appone/userdata/",
    params: {
      username: 'zhaozhao'
    },
    headers: {
      'Authorization': "Bearer " + a
    }
  }).then((req) => {
    if (req.status === 200) {
      const {username, photo, age, gender, folloeweCount, user_id} = req.data
      userInfo.value.name = username
      userInfo.value.avatar = photo
      userInfo.value.age = age
      userInfo.value.gender = gender
      userInfo.value.folloeweCount = folloeweCount
      userInfo.value.user_id = user_id
    }
  }).catch((err) => {
    console.log("ad", err)
    console.log("刷新了")
    torefresh()
  })
}

function toUpdata() {
  axios({
    type: 'put',
    url: 'http://112.126.68.59/api/appone/userdata/',
    headers: {
      'Authorization': "Bearer " + a
    },
    data: {
      user_id: 2,
      photo: 'asdfghjk',
      age: 23,
      gender: 1
    }
  }).then((req) => {
    if (req.status === 200) {
      console.log(req)
    }
  }).catch((err) => {
    console.log("ad", err)
    console.log("刷新了")
    torefresh()
  })
}

const torefresh = async () => {
  const result = await getre(refresh)
  localStorage.setItem("userToken", result.data.access)
  router.go(0)
}

</script>
<style>
.container {
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
}

.sidebar {
  /*position: absolute;*/
  padding: 20px;
  border-right: 1px solid #ddd;
  left: 35px;
}

.profile {
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 20px auto;
}

.profile h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.profile p {
  margin: 10px 0 0 0;
  font-size: 16px;
  color: #666;
}

.navigation ul {
  list-style: none;
  margin: 20px 0 0 0;
  padding: 0;
}

.navigation li {
  margin: 0;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.navigation li:hover {
  background-color: #ddd;
}

.navigation li a {
  color: #333;
  text-decoration: none;
}

.iconfont {
  margin-right: 10px;
}

.main-content {
  padding: 20px;
  /*position: absolute;*/
  left: 20%;
}

.chart {
  text-align: center;
  display: flex;
  justify-content: space-between;
}

.title {
  width: 500px;
  margin: 20px;
}

.echarts-chart {
  height: 370px;
  width: 370px;
}

.right {
  width: 50%;
  height: fit-content;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
