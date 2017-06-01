<template>
  <div class="hello">
    <h1>This is Hellow page</h1>
    <!-- <h1>{{ msg | filterA | fliterB }}</h1> -->
    <!-- <h1>{{ now }}</h1> -->
    <router-link to="/about">go About</router-link>
    <router-link :to="{ path: '/about', query: { plan:'private',uid:111 } }">Home</router-link>
    <!-- <input type="text" v-model="question"> -->
    <br>
    <!-- <div v-for="(item, index) in getAnswer(lists)" :key="index" >{{ item }}</div > -->
    <!-- <a @click.prevent="click($event)" href="http://www.baidu.com">点击</a>
    <input type="radio" value="Jack" v-model="check">
    <input type="radio" value="Mike" v-model="check">
    <input type="radio" value="SSOn" v-model="check">
    <p>{{ total }}</p> -->
    <!-- <v-about my-message="msg" v-on:increment="incrementTotal"></v-about> -->
    <!-- <v-about  v-on:increment="incrementTotal"></v-about> -->
    <v-test v-model="price" v-on:updatevalue="incrementTotal"></v-test>
    <h1>{{ price }}</h1>

  </div>
</template>

<script>
import About from './About.vue'
import Test from './Test.vue'
export default {
  name: 'hello',
  data: function(){
    return {
      msg: 'TesT',
      childMsg:'我要创给子组件',
      question:'',
      lists:[1,1,1,1,1,1,1,1],
      check:[],
      answer:'please wait ,i am thinking...',
      total: 0,
      price:0
    }
  },
  // 自定义过滤器
  filters: {
    filterA: function(value){
      return value.toUpperCase()
    },
    fliterB: function(value){
      return value.split('').push('aaaa')
    }
  },
  computed: {
    now: function(){
      return new Date().getTime()
    }
  },
  methods: {
    getAnswer: function(arr){
      return arr.map(function(item,index,list){
        return item+1
      })
    },
    click: function(e){
        console.log( e.target )
    },
    incrementTotal: function(){
      alert(0)
    }
  },
  watch: {
      question: function ( newQuestion ) {
          this.answer = 'please Wait',
          this.getAnswer();
      }
  },
  components:{
    'v-about': About,
    'v-test': Test
  }
}
</script>

<style scoped>

</style>
