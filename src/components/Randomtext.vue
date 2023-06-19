<template>
  <div class="home-content">
    <div class="left">
      <div class="p_item"
           v-for="(item,index) in timu"
           :key="index">
        <div v-if="item.tid===1">
          <p class="problem">
            <el-tag class="ml-2" type="success">单选题</el-tag>
            <spna>{{tihao+1}}、</spna>
            {{ item.text }}
          </p>
          <div class="result">
            <!--                 单选框-->
            <el-radio-group v-model="checkList[tihao]" style="display: flex;flex-direction: column">
              <el-radio :label="'A'">{{ item.optionone }}</el-radio>
              <el-radio :label="'B'">{{ item.optiontwo }}</el-radio>
              <el-radio :label="'C'">{{ item.optionthree }}</el-radio>
              <el-radio :label="'D'">{{ item.optionfour }}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div v-if="item.tid===2">
          <p class="problem">
            <el-tag class="ml-2" type="success">多选题</el-tag>
            <spna>{{tihao+1}}、</spna>
            {{ item.text }}
          </p>
          <div class="result">
            <!--        多选框-->
            <el-checkbox-group v-model="checkList[tihao]" style="display: flex;flex-direction: column">
              <el-checkbox label="A">{{ item.optionone }}</el-checkbox>
              <el-checkbox label="B">{{ item.optiontwo }}</el-checkbox>
              <el-checkbox label="C">{{ item.optionthree }}</el-checkbox>
              <el-checkbox label="D">{{ item.optionfour }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div v-if="item.tid===3">
          <p class="problem">
            <el-tag class="ml-2" type="success">填空题</el-tag>
            <spna>{{tihao+1}}、</spna>
            {{ item.text }}
          </p>
          <div class="result">
            <!--        填空题-->
            <el-input placeholder="请填入你的答案" v-model="checkList[tihao]"></el-input>
          </div>
        </div>
        <div v-if="item.tid===4">
          <p class="problem">
            <el-tag class="ml-2" type="success">简答题</el-tag>
            <spna>{{tihao+1}}、</spna>
            {{ item.text }}
          </p>
          <div class="result">
            <!--        简答题-->
            <el-input placeholder="请填入你的答案" v-model="value"></el-input>
          </div>
        </div>
      </div>
      <div class="btn" style="display: flex;justify-content: space-between">
        <el-button type="primary" @click="baocun" >保存答案</el-button>
<!--        <el-button type="primary" >已保存</el-button>-->
        <div style="display: flex;align-items: center">
          <span>题目数：100&nbsp;&nbsp;&nbsp;</span>
          <el-button type="primary" @click="shang()" :disabled="tihao===0?true:false">上一题</el-button>
          <el-button type="primary" @click="xia()" :disabled="tihao===99?true:false">下一题</el-button>
        </div>
      </div>
      <div class="answer" v-if="show">
          <span style="color: red">
            <h4>正确答案：{{ timujiexi[0].answer }}</h4>
          </span>
        <br>
        <span><h4>答案解析：</h4>{{ timujiexi[0].explanation !== '' ? '略' : timujiexi[0].explanation }}</span>
      </div>
    </div>
    <div style="width: 40px"></div>
    <div class="right">
      <div class="ritem">
        <div class="top">
          <h4>答题卡</h4>
          <span>清空答题记录</span>
        </div>
        <el-divider></el-divider>
        <h5>填空题</h5>
        <div class="timu-sel">
          <el-tag
              style="margin: 5px 0"
              v-for="(item,index) in questionLists"
              :key="index"
              :type="checkList[index]?'success':'info'"
              class="mx-1"
              effect="dark"
              @click="jumpTi(index)"
              size="large"
          >
            <span style="display: block;width: 22px;text-align: center">{{ index+1 }}</span>
          </el-tag>
        </div>

        <el-divider></el-divider>
        <div class="res">
          <div>
            <span>答对：</span>
            <span style="color: darkgreen">{{zhengque}}题</span>
          </div>
          <div>
            <span>答错：</span>
            <span style="color: red">{{cuowu}}题</span>
          </div>
          <div>
            <span>正确率：</span>
            <span>{{zhengquelv}}%</span>
          </div>
        </div>
      </div>
      <div class="ritem">
        <div class="top">
          <h4>设置</h4>
        </div>
        <el-divider></el-divider>
        <el-switch v-model="value" inactive-text="答题后自动跳转下一题"/>
        <el-switch v-model="value" inactive-text="显示答案解析"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import axios from "axios";
import {useStore} from "vuex";
import {getre} from "@/api/login.js";
import {useRouter} from "vue-router";

const checkList = ref([])
const value = ref(false)
const a = localStorage.getItem("userToken")

const store = useStore()
const router = useRouter()
const sid = Math.floor(Math.random() * 3) + 1
const questionList = ref([])
const questionLists = ref([])
const zhengque = ref(0)
const cuowu = ref(0)

sendCode()
const zhengquelv = computed(()=>{
  return zhengque.value/100
})
console.log(Math.floor(zhengque.value/100))
function random() {
  for (let i = 0; i < 100; i++) {
    let num = Math.floor((Math.random() * (100 - 0)) + 0);
    if (questionLists.value.indexOf(num) === -1) { //不存在推入
      questionLists.value.push(questionList.value[num]);
    } else {
      i--; //存在了使i-1增加一次循环次数
    }
  }
  console.log(questionLists.value)
  chuti()
}

//出题
const tihao = ref(0)
const timu = ref([])
const timujiexi = ref([])
const show = ref(false)

function chuti() {
  timu.value = []
  timu.value.push(questionLists.value[tihao.value])
  console.log(timu.value)
}

function baocun() {
  timujiexi.value = []
  timujiexi.value = timu.value
  show.value = true
  if (checkList.value[tihao.value]===timu.value[0].answer){
    zhengque.value +=1
  }else {
    cuowu.value +=1
  }
}
// 右边边框点击题目跳转
function jumpTi(index){
  timu.value = []
  tihao.value=index
  chuti()
  baocun()
}
// 切换下一题
function xia() {
  show.value = false
  tihao.value += 1
  console.log(tihao.value)
  chuti()
}

// 上一题
function shang() {
  show.value = false
  tihao.value = tihao.value - 1
  console.log(tihao.value)
  chuti()
}

function sendCode() {
  axios({
    type: 'get',
    url: `http://112.126.68.59/api/appone/test?sid=${sid}`,
    headers: {
      'Authorization': "Bearer " + a
    }
  }).then((req) => {
    if (req.status === 200) {
      console.log(req.data)
      questionList.value = req.data
      random()
    }
  }).catch((err) => {
    console.log("ad", err)
    console.log("刷新了")
    torefresh()
  })
}

const refresh = localStorage.getItem("refresh")

const torefresh = async () => {
  const result = await getre(refresh)
  localStorage.setItem("userToken", result.data.access)
  router.go(0)
}

</script>

<style scoped>
.home-content {
  min-height: 600px;
  display: flex;
  justify-content: space-between;
}

.left {
  min-width: 800px;
  flex: 3;
  background-color: white;
  padding: 20px;
}

.right {
  width: 310px;
}

.ritem {
  background-color: white;
  padding: 20px;

}

.ritem:nth-child(2) {
  margin-top: 20px;
}

.problem {
  line-height: normal;
  font-size: 20px;
  letter-spacing: 2px;
}

.result {
  margin-top: 20px;
}

.top {
  display: flex;
  justify-content: space-between;
}

.top span {
  color: #3838cb;
}

.timu-sel {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 250px;
  overflow: auto;

}
.timu-sel::-webkit-scrollbar{
  display: none;
}

.selitem {
  margin: 4px;
  width: 45px;
  height: 30px;
  border-radius: 5px;
  background-color: rgb(64, 158, 255);
  display: flex;
  justify-content: center;
  justify-items: center;
  color: white;
}

.res {
  display: flex;
  justify-content: space-between;
}

.answer {
  margin-top: 20px;
  background-color: #e0e0e0;
  padding: 14px;

}

/deep/ .el-radio-group {
  align-items: flex-start;
}
</style>
