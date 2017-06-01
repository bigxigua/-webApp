<template>
  <div id="app">
    <router-view></router-view>
    <div class="app-tab">
    	<ul>
    		<li>
	    		<span class="icon icon-home"></span>
	    		<p>发现音乐</p>
    		</li>
    		<li>
    			<span class="icon icon-music"></span>
	    		<p>我的音乐</p>
    		</li>
    		<li>
    			<span class="icon icon-users"></span>
	    		<p>朋友</p>
    		</li>
    		<li>
    			<span class="icon icon-user"></span>
	    		<p>账号</p>
    		</li>
    	</ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
	@import url('./app.css');
</style>
