<script setup>

import Footer from "@/components/Footer.vue";
import LoginButton from "@/components/LoginButton.vue";
import {useRouter} from "vue-router";
import {computed, reactive, ref} from "vue";
import {useStore} from "vuex";
import Fixed from "@/components/fixed.vue";


const router = useRouter()
const store = useStore()
const isaction = ref(0)

const tapdata = reactive(
    [
      {
        id:0,
        title:'首页',
        adress:'/home',
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
//  页面跳转
const getData = (val,index=0) => {
  if (val === 'Login' && !store.state.userToken.userName) {
    router.push('/login')
    isaction.value = ''
  } else {
    isaction.value = index
    router.push(val)
  }
}

</script>

<template>
  <div style="height: 100%">
    <header>
      <nav>
        <img src="@/assets/logo.png" alt="" style="width: 60px;height: 50px;margin-top: 4px">
        <ul>
          <li v-for="(l,index) in tapdata" :key="index"
              @click="getData(l.adress,l.id)"
              :class="{slider:isaction===index}"
          >{{ l.title }}</li>
        </ul>
        <LoginButton @getData="getData"></LoginButton>

      </nav>
    </header>
    <main style="height: 70%">
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
    <fixed></fixed>
    <div style="height: 160px"></div>
    <footer class="footer1">
      <Footer></Footer>
    </footer>
  </div>
</template>

<style scoped>
.footer1{
  position: fixed;
  width: 100%;
  height: 160px;
  bottom: 0;
  z-index: 1000;
}

header {
  height: 60px;
  width: 100%;
  background-color: #999eff;
}

ul,
li {
  margin: 0;
  padding: 0;
  z-index: 999;
}

nav {
  display: flex;
  width: 1200px;
  margin: 0 auto;
}

ul {
  position: relative;
  display: flex;
  margin: auto;
}

ul li {
  /* 如果设置为inline-block，会有空隙 */
  /* https://stackoverflow.com/questions/19038799/why-is-there-an-unexplainable-gap-between-these-inline-block-div-elements */
  list-style: none;
  width: 120px;
  line-height: 60px;
  text-align: center;
}

ul li a {

  color: white;
}

.slider {
  width: 100px;
  height: 40px;
  padding-bottom: 20px;
  background-color: #5352ed;
  border-radius: 4px;
  display: inline-block;
  transition: all ease 0.4s;
  animation: 2s ease-in-out waves infinite;
}

li:hover {
  width: 100px;
  height: 40px;
  padding-bottom: 20px;
  background-color: #5352ed;
  border-radius: 4px;
  display: inline-block;
  transition: all ease 0.4s;
  animation: 2s ease-in-out waves infinite;
}

li:nth-child(1):hover ~ .slider {
  left: 10px;
}

li:nth-child(2):hover ~ .slider {
  left: 128px;
}

li:nth-child(3):hover ~ .slider {
  left: 248px;
}

li:nth-child(4):hover ~ .slider {
  left: 368px;
}

li:nth-child(5):hover ~ .slider {
  left: 488px;
}

@keyframes waves {
  from {
    clip-path: polygon(
        0% 17%,
        9% 10%,
        18% 4%,
        30% 0%,
        43% 1%,
        49% 4%,
        57% 7%,
        66% 10%,
        78% 11%,
        89% 11%,
        96% 9%,
        100% 7%,
        100% 100%,
        0% 100%
    );
  }
  50% {
    clip-path: polygon(
        0% 4%,
        6% 9%,
        13% 13%,
        23% 15%,
        31% 16%,
        42% 15%,
        49% 13%,
        61% 10%,
        71% 5%,
        81% 3%,
        90% 2%,
        100% 5%,
        100% 100%,
        0% 100%
    );
  }
  to {
    clip-path: polygon(
        0% 17%,
        9% 10%,
        18% 4%,
        30% 0%,
        43% 1%,
        49% 4%,
        57% 7%,
        66% 10%,
        78% 11%,
        89% 11%,
        96% 9%,
        100% 7%,
        100% 100%,
        0% 100%
    );
  }
}

.content {
  width: 1200px;
  height: 100%;
  margin: 30px auto;
  display: flex;
  justify-content: center;
}
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

</style>
