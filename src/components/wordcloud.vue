<template>
  <div class="geo" ref="geo"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const geo = ref(null)

const map = async () => {
  const myChart = echarts.init(geo.value)
  myChart.showLoading() //初始化，获得echarts实例
  const resp = await fetch('../../JSON/map.json').then(resp => resp.json()) //获取中国GEOJSON数据
  const users = await fetch('../../JSON/user.json').then(resp => resp.json()) //获取用户数据
  //注册地图
  echarts.registerMap('China', resp)
  myChart.setOption({
    title: {
      text: '注册用户分布图'
    },
    //配置了该项，鼠标指上去有提示
    tooltip: {
      formatter: '{b}注册用户{c}人'
    },
    visualMap: {
      //地图条
      //可视地图，一般用户设置不同颜色来展示数据差异
      left: 'left', //可视地图显示的位置
      top: 'center', //可视地图显示的位置
      min: 0, //区间的最小值
      max: 10000, //区间数据的最大值
      text: ['高', '低'],
      calculable: true //是否允许控制区间
    },
    series: [
      {
        type: 'map', //图标类型：地图
        map: 'China', //使用注册的地图
        roam: false, //是否开启鼠标缩放和平移
        scaleLimit: {
          min: 0.7, //最小缩放0.7倍
          max: 3 //最大放大3倍
        },
        data: users
      }
    ]
  })
  myChart.hideLoading()
}

onMounted(()=>{
  map()
})
</script>

<style>
.geo {
  width: 1000px;
  height: 1000px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
