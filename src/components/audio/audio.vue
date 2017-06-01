<template>
	<div class="c-audio_main">
      <div class="fiter"></div>
		  <div class="c-audio_head">
            <span class="throw_wrap" @touchend="hideAudioHandle">
              <div class="throw" @touchend="back"></div>
            </span>
            
            <div class="audio_title">
               <p>{{ songName }}</p>
               <p>{{ songAuthor }}</p>
            </div>
            <div class="icon icon-exit audio_share"></div>
      </div>

      <div class="c-audio_song_main">
      <!-- cd界面 -->
         <div class="c-audio_cd" :class="showIrc ? 'showIrc' : ''" @touchend="showIrcHandle">
           <div class="cd_warp" 
                :class="pause ? 'cd_rotate_pause' : 'cd_warp_rotate'">
             <img src="./img/1.jpg" alt="">
           </div>
           <div class="cd_icon_warp">
             <span class="icon icon-heart"></span>
             <span class="icon icon-download3"></span>
             <span class="icon icon-bubble2"></span>
             <span class="icon icon-list2"></span>
           </div>
         </div>
         <!-- 歌词 -->
         <div class="c-audio_lrc" :class="showIrc ? 'show' : ''">
         <!-- icon-volume-mute2 -->
            <div class="volume_control_wrap">
                <div class="icon icon-volume-medium"></div>
                <div class="volume_line" ref="volumeline"></div>
                <div class="volume_dot"
                     @touchstart="dropDotStartHandle($event)"
                     @touchmove="dropDotMoveHandle($event)"
                     @touchend="dropDotEndHandle($event)"></div>
                <div class="icon icon-display"></div>
            </div>
            <div class="lrc_wrap">
                <div class="lyric_text" ref="lyricText">
                  <p></p>
                  <p v-for="item in lrcs" class="p">{{ item }}</p>  
                </div> 
            </div>
         </div>
      </div>

      <div class="c-audio_control">

          <div class="control_progress">
            <div class="time_start">{{ start }}</div>
            <div class="progress_line" ref="lineWidth"></div>
            <div class="progress_icon" 
                    ref="pos" 
                    @touchstart="dropStartHandle($event)"
                    @touchmove="dropMoveHandle($event)"
                    @touchend="dropEndHandle($event)">
                 <div class="icon_srocll"></div>
               </div>
            <div class="fix_delay_line"></div>
            <div class="time_total">{{ totalTime }}</div>
          </div>

          <div class="control_option">
              <span class="icon icon-shuffle"></span>
              <span class="icon icon-first" @touchend="nextMusicHandle"></span>
              <span class="icon" 
                    :class="pause ? 'icon-play2' : 'icon-pause' " 
                    @click="playOrpauseHandle"></span>
              <span class="icon icon-last"></span>
              <span class="icon icon-list2"></span>
          </div>
          <audio :src="songPath"
                 class="audio" ref="audio"
                 @ended="endedHandle"
                 @loadstart="loadstartHandle"
                 @durationchange="durationchangeHandle"
                 @loadedmetadata="loadedmetadataHandle"
                 @progress="progressHandle"
                 @canplay="canplayHandle"
                 @canplaythrough="canplaythroughHandle"
                 ></audio>
      </div>

	</div>
</template>

<script>
import api from '../../../static/js/util.js'
var $width = document.body.clientWidth;
var noGoCanplay = false;
var h = 0;
var step = 0;
export default {
  data: function(){
  	 return {
       songName:'',
  	 	 songAuthor:'',
       showIrc: false,
       pause: true,
       audio: null,
       startTime: 0,
       start:'',
       currentTime: '', //当前播放的位置
       duration: '', //当前资源长度
       totalTime:'',
       timer:null, //定时器
       start_time:null,
       d:0,
       volume: 0,
       lrcs:'',
       lrc:'',
       timeArr:[],
       name:'',
       songPath: '',
       lrcPath: '',
       songs: {},
       index: 0,
       dropParams: {
          currentX: 0,
          flag: false,
          dotflag: false
       }  //拖放参数

  	 }
  },
  created: function(){
    this.name = this.$route.query.name
    this.getDate();
  },
  methods: {
    back: function(){
       history.go(-1);
     },
    getDate: function(){
         var that = this;
         api.get('music',{}, function(res) {
             that.songs = res;
         }).then(function(res){
            that.findSongHandle(res);
         })
      },
    findSongHandle: function(arr){
        var that = this;
         arr.forEach(function(item, i) {
           if( that.name == item.songName ) {
             that.songPath = arr[i].songPath;
             that.lrc = arr[i].lrcPath;
             that.index = i;
           }
         })
      },
    nextMusicHandle: function(){
      this.index--;
      var len = this.songs.length;
      if( this.index < 0 ) {
        this.index = len-1;
      }
      console.log(this.index)
      console.log(this.songs)
      this.lrc = this.songs[this.index].lrcPath;
      this.songPath = this.songs[this.index].songPath;
    },
	  showIrcHandle: function(){
      this.showIrc = true;
    },

    hideAudioHandle: function(){
       //this.$store.commit('showAudioHandle')
    },

    playOrpauseHandle: function(){
      var that = this;
      if(this.pause) {
        this.pause = false;
        this.audio.play();
        this.timer = setInterval(function(){
            that.playIconMove()
        },500);
        this.start_time = setInterval(function(){
            that.reckonByTimeStart();
            that.reckonByTimeRemain();
            that.syncLyricsHandle();
        },1000)
      } else {
        this.pause = true;
        this.audio.pause();
        clearInterval(this.timer)
        clearInterval(this.start_time)
      }
     },
     dropDotStartHandle: function(e) {
        this.dropParams.dotflag = true;
        this.dropParams.currentX = e.changedTouches[0].clientX/$width*100;
     },
     dropDotMoveHandle: function(e) {
        var target = e.currentTarget;
        var nowX = (e.changedTouches[0].clientX/$width)*100;
        if(nowX < 12) {
          target.style.left = '12%';
          return;
        } else if (nowX > 84) {
          target.style.left = '84%';
          return;
        } else {
          target.style.left = nowX + '%';
        }
        
        this.audio.volume = nowX/100;
     },
     dropDotEndHandle: function(e) {
        var $volumeLine = this.$refs.lineWidth.getBoundingClientRect().width;
        var target = e.currentTarget;
        var left = parseInt(target.style.left);
        this.dropParams.dotflag = false;
        this.volume = (left-12)/100 * $width/$volumeLine;
        if( this.volume <= 0 ) {this.volume = 0}
        this.audio.volume = this.volume;
     },
     dropStartHandle: function(e){
        clearInterval(this.timer)
        this.dropParams.flag = true;
        this.dropParams.currentX = e.changedTouches[0].clientX/$width*100;
     },

     dropMoveHandle: function(e){
        var target = e.currentTarget;
        var $lineWidth = this.$refs.lineWidth.getBoundingClientRect().width;
        clearInterval(this.timer);
        clearInterval(this.start_time);

        var nowX = (e.changedTouches[0].clientX/$width)*100;
        this.dropUpdateTime(nowX);

        this.reckonByTimeRemain();
        this.reckonByTimeStart();
        if( this.dropParams.flag ) {
          if( nowX < 16 ) {
            target.style.left = '16%';
            return;
          } else if ( nowX > 81 ) {
            target.style.left = '81%';
            return;
          }
          target.style.left = nowX + '%';
        }
     },

     dropEndHandle: function(e){
        var target = e.currentTarget;
        var $lineWidth = this.$refs.lineWidth.getBoundingClientRect().width;
        var that = this;
        var left = parseInt(target.style.left);
        noGoCanplay = true;
        if( !this.pause ) {
          this.timer = setInterval(function(){
              that.playIconMove()
          },500);
          this.start_time = setInterval(function(){
              that.reckonByTimeStart();
              that.reckonByTimeRemain();
              that.syncLyricsHandle();      
          },1000)
        }
        this.dropParams.flag = false;
        this.currentTime = ((left-16)/100 * $width/$lineWidth)*this.duration;
        this.audio.currentTime = this.currentTime || 0;
     },

     playIconMove: function(){
        this.currentTime = this.audio.currentTime;
        var $lineWidth = this.$refs.lineWidth.getBoundingClientRect().width;
        var pos = this.$refs.pos;
        var percent = this.currentTime/this.duration;
        pos.style.left = percent*$lineWidth/$width*100 + 16 + '%';
        if( this.audio.ended ) {
          clearInterval( this.timer );
          clearInterval( this.start_time );
          this.pause = true;
        }
     },

     canplayHandle: function(){
        if(noGoCanplay) {return}
        this.audio = this.$refs.audio;
        this.audio.volume = 0.4;
        this.duration = this.audio.duration;
        this.d = Math.round(this.duration)+5;
        this.reckonByTimeRemain();
        this.reckonByTimeStart();
        this.parseLyric();
     },

     reckonByTimeStart: function(){
        var start_Minute = '0' + parseInt(parseInt(this.startTime/60));
        var start_second = this.startTime%60;
        if( start_second < 10 ) { start_second = '0' + start_second };
        this.start = start_Minute + ':' + start_second;
        this.startTime++;        
     },

     reckonByTimeRemain: function() {
        if( this.d < 0 ) { this.d = 0; return; }
        var minute = '0' + parseInt(this.d/60);
        var second = this.d%60;
        if( second < 10 ) { second = '0' + second };
        this.totalTime = minute + ':' + second;
        this.d--;
     },

     dropUpdateTime: function(t){
       var $lineWidth = this.$refs.lineWidth.getBoundingClientRect().width;
       var percent = (t-16)/100 * $width/$lineWidth;
       if(percent < 0){ percent = 0 };
       if(percent > 1){ percent = 1 };
       this.startTime =parseInt(percent * Math.round(this.duration)) 
       this.d = Math.round(this.duration) - this.startTime;
     },

     endedHandle: function(){
       this.d = Math.round(this.duration)
       this.startTime = 0;
     },

     parseLyric: function(){
        var textArr = this.lrc.split('[');
        textArr.shift();
        var pattern = /\d{2}:\d{2}.\d{2}/; 
        var lyricArr = [];
        var timeArr = [];
        var times = [];
        var songMsgArr = [];

        textArr.forEach(function(item, i) {
          var item = item.split(']');
          item[1].trim().length > 0 && lyricArr.push(item[1].trim());
          pattern.test(item[0]) &&  item[1].trim().length > 0 && times.push(item[0]);
          !pattern.test(item[0]) && item[0] &&
          songMsgArr.push(item[0].substring( item[0].indexOf(':') + 1 ));
        })

        times.forEach(function(item, i) {
          var time = item.split('.');
          time && timeArr.push(time[0])
        })  
        this.songName = songMsgArr[0];
        this.songAuthor = songMsgArr[1];
        this.lrcs = lyricArr;
        this.timeArr = timeArr;
     },
     syncLyricsHandle: function(){
        var that = this;
        var now = this.start;
        this.timeArr.forEach(function(item, i) {
          if ( now === item && now !== '00:00' ) {
            h = i * 5.5;
            var lyricText = that.$refs.lyricText;
            var p = Array.prototype.slice.call(lyricText.children);
            lyricText.style.transform = 'translate3d(0,-'+h+'rem,0)';
            p.forEach(function(item, i){
              p[i].classList.remove('white');
            })
            p[i+1].classList.add('white');
            return;
          }
          
        })
     },

     loadstartHandle: function(){
      
     },

     durationchangeHandle: function(){
      
     },
     loadedmetadataHandle: function(){
      
     },
     progressHandle: function(){
      
     },
     canplaythroughHandle: function(){
      
     }

  }
}
</script>


<style scoped>
 @import url('./audio.css');
</style>
