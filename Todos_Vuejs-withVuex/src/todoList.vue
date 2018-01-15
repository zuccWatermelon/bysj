<template>
  <div id="app">
    <!-- <h2>Simply todolist - vuejs</h2>
    <input id="add-input" v-model="todoText" @keyup.enter="addTodo" placeholder="do what?"/>
    <ul>
      <todo v-for="(todoItem, index) in todoList" :todoItem="todoItem" :index="index"></todo>
    </ul> -->
    <prod-list :catalogId = '301' :banner = 'banner'></prod-list>
  </div>
</template>

<script>
// import Todo from './components/todo'
import prodList from './components/products/goodsList/productsFoot'
export default {
  name: 'todoList',
  components: {
    prodList
  },
  data () {
    return {
      todoText: '',
      banner:{"catalogId":161,"catalogType":"A01","catalogName":"云产品","catalogDesc":"中国电信依托发达的基础网络，通过“2+31+X”和数据中心互联网(DCI)等资源布局，实现云网融合和统一调度，已形成平台+应用的云计算和大数据产品体系，为全国用户提供天翼云产品服务。","remark":"云产品","statusCd":null,"createDate":"2017-11-11 10:04:25","createStaff":1,"parCatalogId":0,"updateDate":"2017-11-11 10:04:25","updateStaff":1}
    }
  },
  computed: {
    todoList () {
      return this.$store.getters.todos
    }
  },
  methods: {
    addTodo () {
      this.$store.commit('addTodo', this.todoText)
      this.todoText = ''
    },
    deleteTodo (index) {
      this.$store.commit('deleteTodo', index)
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
#app {
  width: 800px;
  margin: 30px auto;
}
#add-input {
  width: 750px;
  height: 35px;
  padding: 0 5px;
}
ul {
  list-style: none;
  padding: 0;
}
</style>
