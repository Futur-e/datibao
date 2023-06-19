<template>
<div class="ldiv">
  <span v-if="!userName" @click="Tologin" style="color: #181818">登录/注册</span>

  <el-dropdown v-else>
    <div  style="display: flex" >
      <el-avatar  :src="store.state.userToken.avtar"></el-avatar>
      <span style="margin: 12px 5px;font-size: 16px;color: #181818">{{userName}}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <div>
          <router-link to="/user" ><el-dropdown-item>个人中心</el-dropdown-item></router-link>
          <el-dropdown-item  @click="outLogin">退出登录</el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</div>
</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter()

const userName = computed(()=>{
  return localStorage.getItem('username')
})



const emit = defineEmits(['getData']);
function Tologin() {
  emit("getData",'Login')
}

function outLogin(){
  store.dispatch('delUserToken')
  router.go(0)
}
</script>

<style scoped>
.ldiv{
  margin: auto;
}
</style>
