<template>
  <div class="bg-box">
    <div style=" margin: 20px;border:1px solid gainsboro;width: 96%;height: 240px;display: flex;flex-direction: column;justify-content: space-around;align-items: center">
      <div style="width: 600px;display:flex;justify-content: space-between;">
        <span class="pan" :class="dianjiIndex===index?'panaction':''" v-for="(item,index) in searchName" :key="index" @click="chuangname(index)">{{item}}</span>
      </div>
      <div style="margin-top: 12px ">
        <input type="text" class="inp" v-model="context" placeholder="请输入要收缩的内容">
        <el-button type="primary" @click="searchName"><a :href="tourl" target="_blank">搜索</a></el-button>
      </div>
      <div style="display: flex;justify-content: space-around;flex-wrap: wrap;">
        <div class="item_box1" v-for="(item,index) in bottomurl">
          <a href="###" class="item_a" target="_blank">
            <img :src="item.photourl" alt="">
            <span style="margin-left: 10px">{{item.name}}</span>
          </a>
        </div>
      </div>
    </div>
    <h4 style="padding: 7px">编辑工具</h4>
    <div style="display: flex;justify-content: space-around;flex-wrap: wrap;">
      <div class="item_box" v-for="(item,index) in aa">
        <a :href="item.url" class="item_a" target="_blank">
          <img :src="item.img" alt="">
          <span style="margin-left: 10px">{{item.text}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, ref, watch} from "vue";
const router = useRouter()
const store = useStore()
const aa = ref([
  {
    url:"https://c.runoob.com/compile/1/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/php.png",
    text:"PHP在线工具"
  } ,
  {
    url:"https://c.runoob.com/compile/6/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/python.png",
    text:"Python2 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/9/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/python.png",
    text:"Python3 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/10/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/java.png",
    text:"Java 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/11/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/c.png",
    text:"C 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/12/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/cpp.png",
    text:"C++ 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/13/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/ruby.png",
    text:"Ruby 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/14/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/csharp.png",
    text:"C# 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/15/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/scala.png",
    text:"Scala 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/16/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/iconfinder_115_Erlang_logo_logos_4373173.png",
    text:"Erlang 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/17/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/perl.png",
    text:"Perl 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/18/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/bash.png",
    text:"Bash 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/19/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/iconfinder_rust_4691305.png",
    text:"RUST 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/20/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/swift.png",
    text:"Swift 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/21/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/go.png",
    text:"Go 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/22/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/node.png",
    text:"Nodeis 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/66/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/lua.png",
    text:"Lua 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/73/",
    img:"https://c.runoob.com/wp-content/uploads/2016/01/pascal.png",
    text:"Pascal 在线工且"
  },
  {
    url:"https://c.runoob.com/compile/2960/",
    img:"https://c.runoob.com/wp-content/uploads/2017/06/kotlin.png",
    text:"Kotin 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/5577/",
    img:"https://c.runoob.com/wp-content/uploads/2019/05/typescript.png",
    text:"TypeScript 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/5648/",
    img:"https://c.runoob.com/wp-content/uploads/2020/05/iconfinder_Vb_program_programming_file_extension_3044873.png",
    text:"VB.NET 在线T具"
  },
  {
    url:"https://c.runoob.com/compile/5649/",
    img:"https://c.runoob.com/wp-content/uploads/2020/05/iconfinder_285_R_Project_4518765.png",
    text:"R 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/6206/",
    img:"https://c.runoob.com/wp-content/uploads/2021/08/general-assembly-logo.png",
    text:"Assembly 在线工具"
  },
  {
    url:"https://c.runoob.com/compile/6208/",
    img:"https://c.runoob.com/wp-content/uploads/2021/08/Groovy.png",
    text:"Groovy 在线工具"
  }])
const searchName = [
  "Google",
  "Bing",
  "Github",
  "Ttack Overflow",
  "Baidu",
  "Runoob",
]
const context = ref('')
watch(context,(value)=>{
  console.log(value)
    return tourl.value ===searchurl.value[dianjiIndex.value].url + value
})
const tourl = computed(()=>{
  return searchurl.value[dianjiIndex.value].url + context.value
})
const searchurl = ref([
  {
    name:'谷歌',
    url:"https://www.google.com/search?q="
  },
  {
    name:'bing',
    url:'https://www2.bing.com/search?q='
  },
  {
    name:'github',
    url:'https://github.com/search?q='
  },
  {
    name:'stack',
    url:'https://stackoverflow.com/nocaptcha?s='
  },
  {
    name:'stack',
    url:'https://www.runoob.com/?s='
  },
])
const bottomurl = [
  {
    name:'Google',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/03/googe.png'
  },
  {
    name:'Baidu',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/03/baidu.jpg'
  },
  {
    name:'Duck',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/03/duck.jpg'
  },
  {
    name:'Gitlogs',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/03/gitlog-log.png'
  },
  {
    name:'Stack',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/03/14-e1647306997102.png'
  },
  {
    name:'Github',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/03/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20220315103508.png'
  },
  {
    name:'Iconfinder',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/03/iconfinder.png'
  },
  {
    name:'必应搜索',
    photourl:'https://static.runoob.com/images/svg/bing.svg'
  },
  {
    name:'头条搜索',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/04/toutiao.png'
  },
  {
    name:'Similars',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/05/Similarsitesearch.png'
  },
  {
    name:'CC Search',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/03/CC.jpg'
  },
  {
    name:'Pexels',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/03/pexels.png'
  },
  {
    name:'Unsplash',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/03/unsplash.png'
  },
  {
    name:'知乎搜索',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/04/zhihu.png'
  },
  {
    name:'SimilarWeb',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/05/Similarweb.jpg'
  },
  {
    name:'Goobe',
    photourl:'https://c.runoob.com/wp-content/uploads/2022/03/goobe.png'
  },
]
const dianjiIndex = ref(0)
function chuangname(idnex) {
  dianjiIndex.value=idnex
}
function search() {

}
</script>

<style scoped>
.bg-box{
  width: 100%;
  height: 100%;
  background: white;
}
.item_box{
  width: 180px;
  height: 50px;
  margin: 6px 0;
  padding-left: 4px;
  border-radius: 5px;
  background: #f1f1f1;
  overflow: hidden;
}
.item_box1{
  display: flex;
  align-items: center;
  width: 130px;
  height: 50px;
  margin: 6px 0;
  padding-left: 4px;
  border-radius: 5px;
  background: #f9f9f9;
  overflow: hidden;
}
.item_box1 img{
  width: 30px;
  height: 30px;
}
.item_a{
  line-height: 50px;
  display: flex;
  align-items: center;
}
img{
  width: 40px;
  height: 40px;
}
span{
  font-size: 14px;
}
.pan {
  font-size: 20px;
   color: #b1b0b0;
   text-decoration: none;
   background: linear-gradient(to right,#ec695c,#61c454) no-repeat right bottom;
   background-size: 0px 3px;
   transition: background-size 1300ms;
}
.pan:hover {
   background-position-x: left;
   color: #23527c;
   background-size: 100% 3px;
}
.panaction{
  background-position-x: left;
  color: #23527c;
  background-size: 100% 3px;
}
.inp{
  width: 500px;
  height: 20px;
  border: 1px solid black;
  /* 设置动画的名称、持续时间、时间函数和循环次数 */
  padding: 10px;
  margin-right: 20px;
}
@keyframes border-color {
  0% {
    border-image: linear-gradient(to right, red, orange);
  }
  25% {
    border-image: linear-gradient(to right, orange, yellow);
  }
  50% {
    border-image: linear-gradient(to right, yellow, green);
  }
  75% {
    border-image: linear-gradient(to right, green, blue);
  }
  100% {
    border-image: linear-gradient(to right, blue, indigo, violet);
  }
}
</style>
