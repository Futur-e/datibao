<template>
  <div class="main-box">
    <div :class="['container', 'container-register', { 'is-txl': isLogin }]">

      <el-form
          ref="ruleFormRef"
          :model="registerForm"
          :rules="registerrules"
          class="demo-ruleForm"
          status-icon
      >
        <h4 class="title">注册用户</h4>
        <el-form-item prop="email">
          <el-input placeholder="邮箱号" class="form__input1" v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div style=" width:370px; display: flex;justify-content: space-between;align-items: center">
            <el-input placeholder="填写验证码" v-model="registerForm.code"></el-input>
            <el-button type="primary" @click="sendCode" v-show="!isSend">{{ codeMessage }}</el-button>
            <el-button type="primary" @click="sendCode" v-show="isSend">{{ starttime }} <span
                v-show="typeof(starttime)==='number'">s</span></el-button>
          </div>
        </el-form-item>
        <el-form-item prop="address">
          <el-select style="padding-right: 200px" v-model="registerForm.region" class="m-2" placeholder="请选择城市">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="username">
          <el-input placeholder="用户名" class="form__input1" v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" class="form__input1" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="password_confirm">
          <el-input placeholder="确认密码" class="form__input1" v-model="registerForm.password_confirm"></el-input>
        </el-form-item>
        <div class="primary-btn" @click="submitForm2">立即注册</div>
      </el-form>
    </div>
    <div
        :class="['container', 'container-login', { 'is-txl is-z200': isLogin }]"
    >

      <el-form
          ref="ruleFormRef"
          :model="loginForm"
          :rules="loginrules"
          class="demo-ruleForm"
          status-icon
      >
        <h2 class="title">登录</h2>
        <el-form-item prop="username">
          <el-input placeholder="用户名" class="form__input1" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" class="form__input1" v-model="loginForm.password"></el-input>
        </el-form-item>
        <div class="primary-btn" @click="submitForm">立即登录</div>
      </el-form>
    </div>
    <div :class="['switch', { login: isLogin }]">
      <div class="switch__circle"></div>
      <div class="switch__circle switch__circle_top"></div>
      <div class="switch__container">
        <h2>{{ isLogin ? 'Hello Friend !' : 'Welcome Back !' }}</h2>
        <p>
          {{
            isLogin
                ? 'Enter your personal details and start journey with us'
                : 'To keep connected with us please login with your personal info'
          }}
        </p>
        <div class="primary-btn" @click="isLogin = !isLogin">
          {{ isLogin ? '立即注册' : '立即登录' }}
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

import {reactive, ref, watch} from "vue";
import {toLogin, toRegister} from "@/api/login.js";
import axios from "axios";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";


const isLogin = ref(true)
const isSend = ref(false)
const starttime = ref(60)
const codeMessage = ref("发送验证码")
const store = useStore()
const router = useRouter()
const options=[
  {
    label: '未选择',
    value: 0,
  },
  {
    label: '北京市',
    value: 1,
  },
  {
    label: '天津市',
    value: 2,
  },
  {
    label: '上海市',
    value: 3,
  },
  {
    label: '重庆市',
    value: 4,
  },
  {
    label: '河北省',
    value: 5,
  },
  {
    label: '山西省',
    value: 6,
  },
  {
    label: '辽宁省',
    value: 7,
  },
  {
    label: '吉林省',
    value: 8,
  },
  {
    label: '黑龙江省',
    value: 9,
  },
  {
    label: '江苏省',
    value: 10,
  },
  {
    label: '浙江省',
    value: 11,
  },
  {
    label: '安徽省',
    value: 12,
  },
  {
    label: '福建省',
    value: 13,
  },
  {
    label: '江西省',
    value: 14,
  },
  {
    label: '山东省',
    value: 15,
  },
  {
    label: '河南省',
    value: 16,
  },
  {
    label: '湖北省',
    value: 17,
  },
  {
    label: '湖南省',
    value: 18,
  },
  {
    label: '广东省',
    value: 19,
  },
  {
    label: '海南省',
    value: 20,
  },
  {
    label: '四川省',
    value: 21,
  },
  {
    label: '贵州省',
    value: 22,
  },
  {
    label: '云南省',
    value: 23,
  },
  {
    label: '陕西省',
    value: 24,
  },
  {
    label: '甘肃蒜傲省',
    value: 25,
  },
  {
    label: '青海省',
    value: 26,
  },
  {
    label: '台湾省',
    value: 27,
  },
  {
    label: '内蒙古自治区',
    value: 28,
  },
  {
    label: '广西壮族自治区',
    value: 29,
  },
  {
    label: '西藏自治区',
    value: 30,
  },
  {
    label: '宁夏回族自治区',
    value: 31,
  },
  {
    label: '新疆维吾尔自治区',
    value: 32,
  },
  {
    label: '香港特别行政区',
    value: 33,
  },
  {
    label: '澳门特别行政区',
    value: 34,
  },

]
const loginForm = reactive({
  username: '',
  password: '',
})
const registerForm = reactive({
  email: '',
  code: '',
  region:'',
  username: '',
  password: '',
  password_confirm: '',
})
var validatePass2 = (rule, value, callback) => {
  value === '' ? callback(new Error('请再次输入密码')) : value === registerForm.password ? '' : callback(new Error('两次密码不一致'))
}
const registerrules = reactive({
  email: [
    {required: true, message: '请填写邮箱', trigger: 'blur'},
    {pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '输入正确的邮箱格式', trigger: 'blur'},
  ],
  username: [
    {required: true, message: '请填写用户名', trigger: 'blur'},
    {min: 1, max: 10, message: '用户名不正确', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请填写密码', trigger: 'blur'},
    {min: 8, message: '请输入八位以上的密码', trigger: 'blur'},
  ],
  password_confirm: [
    {required: true, validator: validatePass2, trigger: 'blur'}
  ]
})
const loginrules = reactive({
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {message: '请输入六位以上的密码', trigger: 'blur'},
  ],
})


const submitForm = async () => {
  const result = await toLogin(loginForm)
  if (result.status === 200){
    localStorage.setItem("refresh",result.data.refresh)
    localStorage.setItem("username",loginForm.username)
    await store.dispatch("getUsertoken", result.data.access)
    router.go(0)
  }
}

// 注册回调函数
const submitForm2 = async () => {
  let param = new URLSearchParams()
  const {username, password, password_confirm, email, code,region} = registerForm
  param.append('username', username)
  param.append('password', password)
  param.append('password_confirm', password_confirm)
  param.append('email', email)
  param.append('region', region)
  param.append('code', code)
  axios({
    method: 'post',
    url: 'http://112.126.68.59/api/appone/user/',
    data: param
  }).then((req) => {
    if (req.status===200){
      ElMessage.error("注册成功")
    }
  }).catch((err) => {
    ElMessage.error("注册失败")
  })
}

//发送验证码
function sendCode() {
  starttime.value = 60
  let param = new URLSearchParams()
  param.append('email', registerForm.email)
  axios({
    method: 'post',
    url: 'http://112.126.68.59/api/appone/code/',
    data: param
  }).then((req) => {
    console.log(req)
  }).catch((err) => {
    console.log(err)
  })
  isSend.value = true
  const timeer = setInterval(() => {
    starttime.value = starttime.value - 1
    if (starttime.value === 0) {
      starttime.value = "重新发送"
      isSend.value = true
      clearInterval(timeer)

    }
  }, 1000)
}


</script>

<style lang="scss" scoped>

.form__input1 {
  width: 370px;
}

::v-deep .el-input__wrapper {
  margin: 4px 0;
  width: 150px;
  height: 40px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  // font-family: 'Montserrat', sans-serif;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.main-box {
  position: relative;
  width: 1000px;
  min-width: 1000px;
  min-height: 620px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 90%;
    padding-left: 25px;
    background-color: #ecf0f3;
    transition: all 1.25s;

    form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      color: #a0a5a8;

      .title {
        font-size: 34px;
        font-weight: 700;
        color: #181818;
        text-align: center;
      }

      .text {
        margin-top: 10px;
      }

      .form__input {
        width: 350px;
        height: 40px;
        margin: 4px 0;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        // font-family: 'Montserrat', sans-serif;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;

        &::placeholder {
          color: #a0a5a8;
        }
      }
    }
  }

  .container-register {
    z-index: 100;
    left: calc(100% - 600px);
  }

  .container-login {
    left: calc(100% - 600px);
    z-index: 0;
  }

  .is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
  }

  .is-z200 {
    z-index: 200;
    transition: 1.25s;
  }

  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 400px;
    padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background-color: #ecf0f3;
    overflow: hidden;
    box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
    color: #a0a5a8;

    .switch__circle {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background-color: #ecf0f3;
      box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
      bottom: -60%;
      left: -60%;
      transition: 1.25s;
    }

    .switch__circle_top {
      top: -30%;
      left: 60%;
      width: 300px;
      height: 300px;
    }

    .switch__container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
      width: 400px;
      padding: 50px 55px;
      transition: 1.25s;

      h2 {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }

      p {
        font-size: 14px;
        letter-spacing: 0.25px;
        text-align: center;
        line-height: 1.6;
      }
    }
  }

  .login {
    left: calc(91% - 400px);

    .switch__circle {
      left: 0;
    }
  }

  .primary-btn {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    letter-spacing: 2px;
    background-color: #4b70e2;
    color: #f9f9f9;
    cursor: pointer;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;

    &:hover {
      box-shadow: 4px 4px 6px 0 rgb(255 255 255 / 50%),
      -4px -4px 6px 0 rgb(116 125 136 / 50%),
      inset -4px -4px 6px 0 rgb(255 255 255 / 20%),
      inset 4px 4px 6px 0 rgb(0 0 0 / 40%);
    }
  }
}
</style>

