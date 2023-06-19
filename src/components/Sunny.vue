<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="weather">
    <h1>查看{{ curCity }}最近天气</h1>
    <form>
      <input
          type="text"
          v-model="city"
          placeholder="请输入您要查询的城市" />
      <button
          type="submit"
          @click.prevent="getWeather">
        查询
      </button>
      <button
          type="submit"
          @click.prevent="getCurrentCity">
        一键定位查询
      </button>
    </form>
    <div
        ref="chart"
        style="width: 500px; height: 400px; border: 1px solid #ccc"></div>
     <div
      class="result"
      v-for="(item, index) in fulWeather"
      :key="index">
      <p>时间：{{ item.date }} - 星期{{ item.week == 7 ? '天' : item.week }}</p>
      <p>白天天气：{{ item.dayweather }}</p>
      <p>晚上天气：{{ item.nightweather }}</p>
      <p>白天温度：{{ item.daytemp }}℃</p>
      <p>晚上温度：{{ item.nighttemp }}℃</p>
      <p>白天风向：向{{ item.daywind }}</p>
      <p>晚上风向：向{{ item.nightwind }}</p>
      <p>白天风力：{{ item.daypower }}级</p>
      <p>晚上风力：{{ item.nightpower }}级</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      city: '',
      fulWeather: null,
      curCity: '',
      chart: null,
      dayweather: [],
      weeks: [],
      wind: [],
      tem: []
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      let myChart = echarts.init(this.$refs.chart)
      const options = {
        tooltip: {
          trigger: 'item', // 触发方式
          backgroundColor: 'orange',
          borderColor: 'orange',
          borderWidth: 2,
          textStyle: {
            color: 'black'
          },
          formatter: '{b} : {c}' // 显示提示信息
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: this.weeks
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: this.dayweather
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '风力',
            min: 0,
            max: 10,
            position: 'right',
            axisLabel: {
              formatter: '{value} 级'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 50,
            position: 'left',
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: '风力',
            type: 'bar',
            yAxisIndex: 0,
            data: this.wind
          },
          {
            name: '温度',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: this.tem,
            label: {
              show: true,
              position: 'top',
              color: 'black',
              formatter: '{c}°C', //显示柱形图数据
              fontSize: 13
            }
          }
        ]
      }
      myChart.setOption(options)
    },
    getWeather() {
      this.weeks = []
      this.tem = []
      this.dayweather = []
      this.wind = []
      const fulUrl = `https://restapi.amap.com/v3/weather/weatherInfo?key=407cd13370e3e36bcb96759e9b08d958&city=${this.city}&output=json&extensions=all`
      //未来天气
      axios
          .get(fulUrl)
          .then(response => {
            const data = response.data
            if (data.status === '1') {
              const weatherData = data.forecasts[0]
              console.log(weatherData)
              this.curCity = weatherData.city
              this.fulWeather = weatherData.casts
              this.$nextTick(() => {
                this.format()
                this.initCharts()
                // this.chart = echarts.init(document.getElementById('chart'))
                // this.chart.setOption(this.option)
              })
            } else if (!this.city) {
              ElMessage.error('请输入地点再查询')
            } else {
              ElMessage.error('获取天气信息失败')
            }
          })
          .catch(error => {
            ElMessage.error('请输入正确的城市名称', error)
          })
    },
    // 根据用户ip地址获取城市编码
    async getCurrentCity() {
      const result = await axios.get(`https://restapi.amap.com/v3/ip?key=407cd13370e3e36bcb96759e9b08d958`)
      const adcode = result.data.city
      this.city = adcode
      this.getWeather()
    },
    //格式化数据
    format() {
      //格式化日期
      this.fulWeather.map(item => {
        const curWeek = item.week
        this.weeks.push('星期' + curWeek.toString())
      })
      //格式化风力
      this.fulWeather.map(item => {
        const curWind = item.daypower
        this.wind.push(parseInt(curWind.split('≤').slice(-1)))
      })
      this.wind = this.wind.flat(Infinity)
      //格式化温度
      this.fulWeather.map(item => {
        const curDaytemp = item.daytemp
        this.tem.push(parseInt(curDaytemp))
      })
      this.tem = this.tem.flat(Infinity)
      //格式化天气
      this.fulWeather.map(item => {
        const curDayweather = item.dayweather
        this.dayweather.push(curDayweather.toString())
      })
    }
  }
}
</script>

<style scoped>
.weather {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}
.weather h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
.weather form {
  display: flex;
  margin-bottom: 20px;
}
.weather input {
  padding: 10px;
  margin-right: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.weather button {
  padding: 10px 20px;
  margin: 10px;
  background-color: #2196f3;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.weather button:hover {
  background-color: #1976d2;
}
.weather .result {
  margin-top: 20px;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.weather p {
  font-size: 16px;
  margin: 5px 0;
  text-align: left;
  padding-left: 0;
}
</style>
