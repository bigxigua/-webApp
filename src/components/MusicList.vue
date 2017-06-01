<template >
	<div class="find-content_lists find-content">
       <div class="find-list_all">
          <div class="find-list_all_left">
             全部歌单
          </div>
          <div class="find-list_all_right">
             <span class="icon icon-delicious"></span>
             选择分类
          </div>
       </div>
       <div class="find-list_boutique">
         <div class="find-list_boutique_left">
           <img src="http://p4.music.126.net/OPuZGK3SP6HTwRCB30wRCw==/18786255674057660.jpg?param=200y200" alt="">
         </div>
         <div class="find-list_boutique_right">
           <p class="p1">
           <span class="icon icon-trophy"></span>
           <span class="p1_span">精品歌单</span>
           </p>
           <p class="p2">拉丁世界风必听101首</p>
         </div>
         <span class="icon icon-circle-right"></span>
       </div> 
       <div class="find-lists clearfix">
         <div class="find-lists_item clearfix" v-for="(item, index) in lists">
            <img :src="item.images" alt="">
            <p>{{ item.text }}</p>
            <div class="find-lists-num clearfix">
                <span class="icon icon-headphones"></span>
                <span class="num">{{ item.num }}</span>
            </div>
            <div class="find-lists-name clearfix">
              <span class="icon icon-user"></span>
              <span class="name">{{ item.name }}</span>
              <span class="icon icon-star-empty"></span>
            </div>
         </div>
      </div>
      <div class="load_box" v-show="showloadIcon">
        <span class="icon icon-spinner2 load"></span>
        <span class="load_word">{{ load_title }}</span>
      </div>
  </div>
</template>

<script>
 import api from '../../static/js/util.js'
 var timer;
 export default {
      props: [
        'bindScroll'
      ],
      data: function(){
         return { 
            lists: [],
            data:[],
            showloadIcon:true,
            load_title: '正在加载...'
         }
      },
      mounted: function(){
        console.log( this.bindScroll )
         this.getSliderDate();
         this.scrollPage();
      },
      methods: {
        getSliderDate: function(){
           var that = this;
           api.get('find/lists',{}, function(res) {
                  that.data = res.lists;
                  that.lists = that.data.splice(0,4)
           })
         },
        scrollPage: function(){
          var that = this;
          console.log(111);
          $(window).on('scroll',function(){
            if(!that.bindScroll) {that.loadMore()} 
         })
        },
        loadMore: function(){
          var that = this,
              $s_height = $(window).scrollTop(),
              $d_height = $(document).height(),
              $w_height = $(window).height();
          clearTimeout(timer);
          if( $s_height + 10 >= $d_height - $w_height ){
             this.showloadIcon = true
             timer = setTimeout(function(){
                that.lists = that.lists.concat(that.data.splice(0,4));
                if( that.data.length === 0 ){
                  that.load_title = '已没有更多'
                }
                that.showloadIcon = false
             },2000)
          }
              
         }

       }
   }
</script>


<style scoped>
.load_box{
  text-align: center;
  margin-bottom: 10rem;
}
.load{
  font-size: 5rem;
  animation: loading 1.5s infinite linear;
  -webkit-animation: loading 1.5s infinite linear;
  color: gray;
  display: inline-block;
  line-height: 10rem;
}
.load_word{
  font-size: 3rem;
  position: relative;
  top: -1rem;
  left: 1rem;
  
}
@keyframes loading{
  from {transform: rotate(0);}
  to {transform: rotate(360deg);}
}
</style>
