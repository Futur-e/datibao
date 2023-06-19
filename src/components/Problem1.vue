<template>
  <div style="background-color: white;padding: 20px">
    <div>
      <div class="p_item"
           v-for="(item,index) in text"
           :key="index">
        <div v-if="item.tid===1">
          <p class="problem">
            <el-tag class="ml-2" type="success">选择题</el-tag>
            {{ item.text }}
          </p>
          <div class="result">
            <!--                 单选框-->
            <el-radio-group v-model="checkList[index]" style="display: flex;flex-direction: column">
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
            {{ item.text }}
          </p>
          <div class="result">
            <!--        多选框-->
            <el-checkbox-group v-model="checkList[index]" style="display: flex;flex-direction: column">
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
            {{ item.text }}
          </p>
          <div class="result">
            <!--        填空题-->
            <el-input placeholder="请填入你的答案" v-model="value"></el-input>
          </div>
        </div>
        <div v-if="item.tid===4">
          <p class="problem">
            <el-tag class="ml-2" type="success">简答题</el-tag>
            {{ item.text }}
          </p>
          <div class="result">
            <!--        简答题-->
            <el-input placeholder="请填入你的答案" v-model="value"></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import {useStore} from "vuex";
import {useRouter} from "vue-router";


const checkList = ref([])
const value = ref('')
const store = useStore()
const router = useRouter()

const sid = computed(() => {
  return router.currentRoute.value.query
})
const caoquestions = computed(() => {
  return store.state.question.caoquestions
})
console.log("1123123",caoquestions.value)
const text = ref([])
watch(sid, () => {
  if (sid.value.id === "one") {
    text.value = caoquestions.value.one
  } else if (sid.value.id === "two") {
    text.value = caoquestions.value.two
  } else if (sid.value.id === "three") {
    text.value = caoquestions.value.three
  } else if (sid.value.id === "four") {
    text.value = caoquestions.value.four
  } else if (sid.value.id === "five") {
    text.value = caoquestions.value.five
  } else if (sid.value.id === "six") {
    text.value = caoquestions.value.six
  }else if (sid.value.id === "seven") {
    text.value = caoquestions.value.seven
  }else if (sid.value.id === "engit") {
    text.value = caoquestions.value.engit
  }else if (sid.value.id === "neven") {
    text.value = caoquestions.value.neven
  }else if (sid.value.id === "ten") {
    text.value = caoquestions.value.ten
  }
})
console.log("adasdasdas", text)
</script>

<style scoped>


.problem {
  line-height: normal;
  font-size: 20px;
  letter-spacing: 2px;
}

.result {
  margin-top: 20px;
}

.top span {
  color: #3838cb;
}

.p_item {
  margin-top: 20px;
}

/deep/ .el-radio-group {
  align-items: flex-start;
}
</style>

