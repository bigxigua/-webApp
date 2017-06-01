<template>
	<div class="find-content_station find-content">
       <div class="swiper-container clearfix" ref="container_station">
          <div class="swiper-wrapper">
               <div class="swiper-slide">
                   <div class="find-station_icon">
                        <span class="icon icon-user"></span>
                        <p>明星做主播</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-headphones"></span>
                        <p>3D|电子</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-pencil2"></span>
                        <p>亲子宝贝</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-books"></span>
                        <p>校园|教育</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-hipster"></span>
                        <p>二次元</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-compass"></span>
                        <p>旅途|城市</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-video-camera"></span>
                        <p>娱乐|影视</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-dice"></span>
                        <p>广播剧</p>
                   </div>
               </div>
               <div class="swiper-slide">
                   <div class="find-station_icon">
                        <span class="icon icon-user"></span>
                        <p>创作|翻唱</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-headphones"></span>
                        <p>情感调频</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-pencil2"></span>
                        <p>脱口秀</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-books"></span>
                        <p>有神小说</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-hipster"></span>
                        <p>音乐故事</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-compass"></span>
                        <p>人文历史</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-video-camera"></span>
                        <p>美文读物</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-dice"></span>
                        <p>外语世界</p>
                   </div>
               </div>
               <div class="swiper-slide">
                   <div class="find-station_icon">
                        <span class="icon icon-user"></span>
                        <p>相声|曲艺</p>
                   </div>
                   <div class="find-station_icon">
                        <span class="icon icon-headphones"></span>
                        <p>我要做主播</p>
                   </div>
               </div>
          </div>
          <div class="swiper-pagination"></div>    
        </div>

        <div class="find-station_rank">
           <div class="find-rank_left">
              <p class="find-rank_left_p1">主播电台排行榜</p>
              <p class="find-rank_left_p2">
                <span style="color:#d43c33">最火的节目和电台，每天更新</span>
                <span>每天更新</span>
              </p>
           </div>
           <div class="find-rank_right"></div>
        </div>

        <div class="find-station_recommend clearfix">
           <div class="find-station_recommend_title">
             精彩节目推荐
           </div>
           <div class="find-station_recommend_list">
              <div class="find-station_recommend_list_l">
                  <img src="" alt="">
                  <span class="icon"></span>
              </div>
              <div class="find-station_recommend_list_r">
                  <p>王力宏首战专辑，情敌被客队敖德萨</p>
                  <p>优质偶像初长成</p>
              </div>
           </div>
        </div>

  </div>
</template>

<script>

import api from '../../static/js/util.js'

export default {
  data: function(){
  	 return {
  	 	   slider:[]
  	 }
  },
  mounted: function(){
     this.getDate()
     var swiper = new Swiper(this.$refs.container_station, {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          loop:true
     });
  },
  methods: {
  	 getDate: function(){
      api.get('find/station',{},function(data){
        //console.log(data)
      })
    }
  }
}
</script>


<style scoped>
    .find-station_rank{
      width: 98%;
      height: 15rem;
      border: 0.1rem solid gray;
      margin:auto;
    }
    .find-rank_left{
      float: left;
      margin-left: 2rem;
    }
    .find-rank_left_p1{
      font-size: 3rem;
      font-weight: bold;
      margin-top: 3.5rem;
    }
    .find-rank_left_p2{
      font-size: 2.5rem;
      margin-top: 1rem;
    }
    .find-station_recommend{
      width: 96%;
      margin:auto;
      margin-top: 2rem;
    }
    .find-station_recommend_title{
      width: 100%;
      height: 4rem;
      border-left: 0.6rem solid #d43c33;
      font-size: 3rem;
      font-weight: bold;
      line-height: 4rem;
      padding-left: 1rem;
    }
    .find-station_recommend_list{
      width: 100%;
      height: 13rem;
      border-top: 0.1rem solid gray;
      border-bottom: 0.1rem solid gray;
    }
</style>
