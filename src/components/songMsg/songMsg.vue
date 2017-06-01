<template>
	<div>
   <div class="mask_wrap" :class="prop.show ? 'show' : '' " @touchend="showSongMsg"></div>
    <div class="song_msg_wrap" :class="prop.show  ? 'show_msg_wrap' : '' ">
        <div class="song_msg_wrap_title">歌曲: {{ prop.name  }}</div>
        <div class="msg_list">
          <span class="icon icon-coin-yen"></span>
          赞赏该曲(50次)
        </div>
        <div class="msg_list">
          <span class="icon icon-music"></span>
          下一首播放
        </div>
        <div class="msg_list">
          <span class="icon icon-folder-plus"></span>
          收藏到歌单
        </div>
        <div class="msg_list">
          <span class="icon icon-download3"></span>
          下载
        </div>
        <div class="msg_list">
          <span class="icon icon-bubble2"></span>
          评论
        </div>
        <div class="msg_list">
          <span class="icon icon-redo2"></span>
           分享
        </div>
        <div class="msg_list">
          <span class="icon icon-user-tie"></span>
          歌手：{{ prop.author }}
        </div>
        <div class="msg_list">
          <span class="icon icon-folder-open"></span>
          专辑 {{ prop.album }}
        </div>
        <div class="msg_list">
          <span class="icon icon-bin"></span>
          不感兴趣
        </div>
    </div> 
  </div>
</template>

<script>
export default {
  props: ['prop'],
  data: function(){
  	 return {
  	   shows: false
  	 }
  },
  created: function(){
  	
  },
  methods: {
  	 showSongMsg: function(){
       this.prop.show = false
     }
  }
}
</script>


<style scoped>
 @import url('./songMsg.css');
</style>
