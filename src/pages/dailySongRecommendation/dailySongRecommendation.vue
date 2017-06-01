<template>
	 <div class="daily-main clearfix">

      <div class="daily_head">
        <div class="throw" @touchend="back"></div>
        <span>每日歌曲推荐</span>
        <router-link :to="{path: '/audio', query:{name: 111} }" class="icon icon-paragraph-left find-search_home"></router-link>
      </div>

      <div class="daily_day">
        <div class="today">{{ today }}</div>
        <div class="word">根据你的音乐口味生成，每天都不会更新</div>
      </div>

      <div class="daily_song-lists">
        <span class="icon icon-play2"></span>
        <span class="word">播放全部</span>
        <span class="icon icon-list2"></span>
        <router-link 
          class="daily_song-list" v-for="item in lists"
          :to="{path: '/audio', query:{name: item.songName} }" key="$index">
          <div class="list-left">
             <p>{{ item.songName }}</p>
             <p>
             <span>{{ item.songAuthor }}</span>-
             <span>{{ item.album }}</span>
             </p>
          </div>
          <div class="daily_mv" :class="item.mvPath ? 'show' : '' ">
            <span class="icon icon-play"></span>
          </div>
          <div class="daily_list" 
               @touchend="showSongMsg(item.songName,item.songAuthor,item.album)">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </router-link>
      </div>
    <v-songMsg :prop="prop"></v-songMsg>
    

  
   </div>
</template>

<script>
import api from '../../../static/js/util.js'
import SongMsg from '../../components/songMsg/songMsg.vue'
export default {

  data: function(){
  	 return {
  	   today: new Date().getDate(),
       lists: [1,2],

       prop: {
        show: false,
        name: '',
        author: '',
        album: '',
       }
  	 }
  },
  created: function(){
  	this.getDate();
  },
  methods: {
  	  back: function() {
         history.go(-1)
      },
      getDate: function(){
         var that = this;
         api.get('music',{}, function(res) {
          console.log(res)
             that.lists = res;
         })
      },
      showSongMsg: function(name, author, album){
        this.prop.show == true ? this.prop.show = false : this.prop.show = true ;
        this.prop.name = name;
        this.prop.author = author;
        this.prop.album = album;
      },
  },
  components:{
        'v-songMsg': SongMsg,
    }
}
</script>


<style scoped>
 @import url('./dailySongRecommendation.css');
</style>
