<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-header">
        <input type="text" v-model="newItem" placeholder="按回车添加" @keyup.enter="addItem"/>

      </div>
      <ul class="todo-main">
        <li class="lii"
            v-for="(item, index) in items" :key="index"
        >

          <div>
            <input type="checkbox" v-model="item.done"/>
            <span :class="{ done: item.done }">{{ item.text }}</span>
          </div>
          <button class="btn btn-danger" @click="removeItem(index)">Remove</button>
        </li>
      </ul>
    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";

const newItem = ref('')
const items = ref([

])
const a = localStorage.getItem("todolist")
gettodolist()
function gettodolist(){
  items.value=localStorage.getItem("todolist")
}
function addItem() {
  if (newItem.value.trim() !== '') {
    const c = a.push( JSON.stringify({text: newItem.value, done: false}))
    localStorage.setItem("todolist",c)
    items.value.push({text: newItem.value, done: false})
    newItem.value = ''
  }
}

function removeItem(index) {
  items.value.splice(index, 1)
}
</script>

<style>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}

/*list*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
  margin-top: 20px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}

.btn {
  height: 30px;
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 578px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

ul {
  list-style-type: none;
}

.lii {
  margin: 3px 0;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lii:hover {
  background: #4b70e2;
}
</style>
