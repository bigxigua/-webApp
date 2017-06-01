<template>
	<div class="find-main">
		<div class="find-search">
			<div class="icon icon-mic find-search_mic"></div>
			<div class="find-search_input">
				<span class="icon icon-search"></span>
				<input type="text" placeholder="搜索音乐、歌词、电台">
			</div>
			<router-link :to="{path: '/audio', query:{name: 111} }" class="icon icon-paragraph-left find-search_home"></router-link>
			<div ></div>
		</div>
		<div class="find-title clearfix">
			<ul>
				<li @click="tabToggle('v-recommentdation',$event)">个性推荐</li>
				<li @click="tabToggle('v-musiclist',$event)">歌单</li>
				<li @click="tabToggle('v-radiostation',$event)">主播电台</li>
				<li @click="tabToggle('v-rank',$event)">排行榜</li>
			</ul>
			<div ref="active_slider"></div>
		</div>
		<div class="find-content_box">
			<keep-alive>
				<component  :is="currentView" :bindScroll="noScroll"></component>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	import Recommentdation from '../../components/Recommendation.vue'
	import Musiclist from '../../components/MusicList.vue'
	import RadioStation from '../../components/RadioStation.vue'
	import Rank from '../../components/Rank.vue'
	export default {
		data: function(){
			return {
				currentView: 'v-recommentdation',
				noScroll: false,
			}
		},
		mounted: function(){
			
		},
		methods: {
			tabToggle: function(tabView,e){
				this.currentView = tabView;
				var target = e.currentTarget;
				var left = target.offsetLeft+ 'px';
				var $active = this.$refs.active_slider
				$active.style.width = target.offsetWidth+'px';
				$active.style.transform='translate3d('+left+',0,0)';
			},
			showAudioHandle: function() {
				this.$store.commit('showAudioHandle')
				this.noScroll = true;
				$("html,body").addClass('no_scroll')
			}
		},
		components:{
		    'v-recommentdation': Recommentdation,
		    'v-musiclist': Musiclist,
		    'v-radiostation': RadioStation,
		    'v-rank': Rank,
		}

	}
</script>

<style scoped>
	@import url('./find.css');
</style>