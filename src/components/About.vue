<template>
	<div>
		<h1>这是About页面</h1>
	  	<h2>{{ myMessage }}</h2>
	</div>
</template>

<script>
export default {
  // props:{
  // 	childMsg:String
  // },
  props:['myMessage'],
  data: function(){
  	 return {
  	 	sum: 0,
  	 }
  },
  created: function(){
  	this.increment();
  },
  methods: {
  	 increment: function(){
  	 	// alert('increment')
  	 	this.$emit('increment')
  	 }
  }
}
</script>


<style scoped>

</style>
