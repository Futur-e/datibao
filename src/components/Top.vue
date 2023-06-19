<template>
  <el-table
      :data="sortObj"
      style="width: 100%">
    <el-table-column
        prop="num"
        label="排名"
        width="65"

    >
      <template v-slot="scope">
        <el-icon size="40px" color="yellow" v-if="scope.$index+1===1"><TrophyBase /></el-icon>
        <el-icon size="40px" color="gray" v-if="scope.$index+1===2"><TrophyBase /></el-icon>
        <el-icon size="40px" color="yellow" v-if="scope.$index+1===3"><TrophyBase /></el-icon>
        <span v-if="scope.$index+1>3" style="font-weight: bold;font-size: 20px" >{{scope.$index+1}}</span>
      </template>
    </el-table-column>
    <el-table-column
        prop="photo"
        label="头像"
        width="180">
      <template v-slot="scope">
        <img :src="scope.row.photo" alt="">
      </template>
    </el-table-column>
    <el-table-column
        prop="username"
        label="用户名">
    </el-table-column>
    <el-table-column
        prop="num"
        label="答题数"
        >
    </el-table-column>

  </el-table>
</template>

<script setup>
import {gettop} from "@/api/top.js";
import {ref} from "vue";
import {ElMessage} from "element-plus";

const toplist = ref([
  {
    username: 2,
    photo: "https://cdn.acwing.com/media/user/profile/photo/110280_md_dd1bec19f7.jpg",
    num: 24
  },{
    username: 2,
    photo: "https://cdn.acwing.com/media/user/profile/photo/110280_md_dd1bec19f7.jpg",
    num: 9
  },{
    username: 2,
    photo: "https://cdn.acwing.com/media/user/profile/photo/110280_md_dd1bec19f7.jpg",
    num: 20
  },{
    username: 2,
    photo: "https://cdn.acwing.com/media/user/profile/photo/110280_md_dd1bec19f7.jpg",
    num: 17
  },{
    username: 2,
    photo: "https://cdn.acwing.com/media/user/profile/photo/110280_md_dd1bec19f7.jpg",
    num: 40
  },
])
getTop()
async function getTop() {
  const result = await gettop()
  if (result.status===200){
    toplist.value = result.data
  }else {
    ElMessage.error("加载失败，请稍后重试")
  }
}
// 指定排序的比较函数
function compare(property){
  return function(obj1,obj2){
    var value1 = obj1[property];
    var value2 = obj2[property];
    return value2 - value1;     // 升序
  }
}
var sortObj = toplist.value.sort(compare("num"));
console.log(sortObj)
</script>

<style scoped>

</style>
