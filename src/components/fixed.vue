<template>
  <div class="elevator-list">
    <div @click="OpenComputerFn" class="elevator-item">
      <el-icon><Grid /></el-icon>
      进制转换
    </div>
    <div @click="OpenSunnyFn" class="elevator-item">
      <el-icon><Sunny /></el-icon>
      天气
    </div>
    <div @click="OpenAiFn" class="elevator-item">
      <el-icon><ChromeFilled /></el-icon>
      AI助手
    </div>
    <div @click="OpenWordCloudFn" class="elevator-item">
      <el-icon><ChromeFilled /></el-icon>
      地图
    </div>
    <div>
      <el-backtop :right="5" :bottom="150" />
    </div>
  </div>

  <!-- 打开AI窗口 -->
  <el-dialog v-model="centerDialogVisible" title="AI助手" width="50%" align-center>
    <chat></chat>
  </el-dialog>
  <!-- 打开计算器窗口 -->
  <el-dialog v-model="centerComputerDialog" title="计算器" width="50%" align-center>
    <computer></computer>
  </el-dialog>
  <!-- 打开天气的窗口 -->
  <el-dialog v-model="centerSunnyDialog" title="天气预报" width="50%" align-center>
    <sunny></sunny>
  </el-dialog>
  <el-dialog v-model="centerWordCloudDialog" width="70%" align-center>
    <wordcloud></wordcloud>
  </el-dialog>
</template>

<script setup>
import {ref} from "vue";
import chat from './chat.vue'
import computer from './computer.vue'
import sunny from './Sunny.vue'
import wordcloud from './wordcloud.vue'
const centerDialogVisible = ref(false)
const centerComputerDialog = ref(false)
const centerSunnyDialog = ref(false)
const centerWordCloudDialog = ref(false)
const OpenAiFn = () => {
  centerDialogVisible.value = true
}
const OpenComputerFn = () => {
  centerComputerDialog.value = true
}
const OpenSunnyFn = () => {
  centerSunnyDialog.value = true
}
const OpenWordCloudFn = () => {
  centerWordCloudDialog.value = true
}
</script>

<style scoped>
.elevator-list {
  z-index: 999;
  overflow: hidden;
  border-radius: 12px;
  position: fixed;
  top: 300px;
  right: 15px;
}
.elevator-list .elevator-item {
  font-size: 12px;
  width: 44px;
  height: 60px;
  overflow: hidden;
  padding: 0 2px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #337ab7;
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  color: #fff;
  text-align: center;
}
.elevator-list .el-icon {
  padding-bottom: 14px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
