<template>
  <div class="container">
    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div v-for="(obj, index) in list" :key="index">
        <!-- 左侧是机器人小思 -->
        <div class="chat-item left" v-if="obj.name !== 'me'">
          <el-image fit="cover" class="avatar" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="chat-pao">{{ obj.msg }}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-else>
          <div class="chat-pao">{{ obj.msg }}</div>
          <el-image
            fit="cover"
            class="avatar"
            round
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.bq233.com%2Fkanqq%2Fpic%2Fupload%2F2018%2F0807%2F1533622762937587.jpg&refer=http%3A%2F%2Fimg.bq233.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641525704&t=153cb0981835604e6e59e4009251aedd"
          />
        </div>
      </div>
      <!-- 对话区域 -->
      <div class="reply-container van-hairline--top">
        <el-input @keyup.enter="sendFn" v-model="word" placeholder="说点什么...">
          <template #append>
            <button style="font-size: 16px; background-color: #f5f7fa; color: #409eff" @click="sendFn">提问</button>
          </template>
        </el-input>
      </div>

    </div>


  </div>
</template>

<script>
// 1. 下包, 引入io
import { io } from 'socket.io-client'
export default {
  name: 'Chat',
  data() {
    return {
      word: '', // 输入框的内容
      list: [
        // 所有的聊天消息
        // 只根据 name 属性，即可判断出这个消息应该渲染到左侧还是右侧
        { name: 'xs', msg: 'hi，你好！我是小思' }
      ],
      socket: null // 客户端和服务器端建立链接的socket对象
    }
  },
  created() {
    // 注意: io是建立socket链接, 和axios一毛钱关系也没有  ws和http协议都行
    this.socket = io('http://geek.itheima.net', {
      query: {
        token: 'a0b7549c-023f-4515-b46d-96ab9c382966'
      },
      transports: ['websocket']
    })

    // 测试下是否建立链接成功
    this.socket.on('connect', () => {
      console.log('链接建立成功')
    })

    // 接收后端传回来的消息
    this.socket.on('message', obj => {
      // 立刻组织相同字段对象放到数组里 -> v-for更新
      this.list.push({
        name: 'xs',
        msg: obj.msg
      })

      // 最后一条聊天消息滚动到屏幕范围
      // 数据变化->DOM是异更新步的, 所以获取到的是上一条div
      this.$nextTick(() => {
        const theDiv = document.querySelector('.chat-list>div:last-child')
        theDiv.scrollIntoView({
          behavior: 'smooth'
        })
      })
    })
  },
  methods: {
    // 发送span->点击事件
    sendFn() {
      if (this.word.trim().length === 0) return
      // 用socket链接对象.emit('后端接收消息的事件名', 值)
      this.socket.emit('message', {
        msg: this.word,
        timestamp: new Date()
      })

      // 把消息显示到页面上
      this.list.push({
        msg: this.word,
        name: 'me'
      })
      //最后一条聊天消息滚动到屏幕范围
      //数据变化->DOM更新是异步的，所以获取到的是上一条div
      this.$nextTick(() => {
        const theDiv = document.querySelector('.chat-list>div:last-child')
        theDiv.scrollIntoView({
          behavior: 'smooth'
        })
      })

      // 清空输入框
      this.word = ''
    }
  },
  destroyed() {
    this.socket.close()
    this.socket = null
  }
}
</script>

<style scoped lang="less">
.container {
  height: fit-content;
  box-sizing: border-box;
  background: #ffffff;
  padding: 10px 0 10px 0;
  .chat-list {
    height: 100%;
    .chat-item {
      width: 47vw;
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 100%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  width: 100%;
  .chat-pao {
    margin-right: 0;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  width: 100%;
  .chat-pao {
    margin-left: 15px;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.el-image {
  margin-left: 5px;
  margin-top: 5px;
  vertical-align: top;
  width: 40px;
  height: 40px;
}
.reply-container {
  height: 30px;
  width:47vw;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
