<template>
   <div class="find-content_recommend find-content">
            <div class="swiper-container clearfix" ref="container_recommend">
                 <div class="swiper-wrapper">
                     <div class="swiper-slide" v-for="item in slider">
                        <img :data-src="item.images" class="swiper-lazy">
                     </div>
                 </div>
                  <div class="swiper-pagination"></div>    
            </div>
               <div class="find-middle clearfix">
                  <ul>
                     <li>
                        <div class="find-middle_scroll">
                        
                           <span class="icon icon-film"></span>
                           <p>私人FM</p>
                        </div>
                     </li>
                     <li>
                        <div class="find-middle_scroll">
                           <router-link to='/daily'>
                               <span>26</span>
                               <p>每日歌曲推荐</p>
                           </router-link>
                          
                        </div>
                     </li>
                     <li>
                        <div class="find-middle_scroll">
                           <span class="icon icon-stats-bars"></span>
                           <p>云音乐热歌榜</p>
                        </div>
                     </li>
                  </ul>
               </div>
               <div class="find-sole clearfix">
                  <div class="find-sole_title find_title">
                     <span class="icon icon-file-music"></span>
                     <span class="find-sole_give">独家放送</span>
                     <span class="find-sole_more">更多》</span>
                  </div>
                  <div class="find-sole_content">
                     <div v-for="(list, index) in sole" :class=" index == 2 ? 'find-sole_long' : ''">
                        <img :src="list.images" alt="">
                        <p>{{ list.title }}</p>
                     </div>
                  </div>
               </div>
               <div class="find-new clearfix">
                  <div class="find-new_title find_title">
                     <span class="icon icon-radio-checked"></span>
                     <span class="find-sole_give">最新音乐</span>
                     <span class="find-sole_more">更多》</span>
                  </div>
                  <div class="find-new_content">
                     <div v-for="(list, index) in newlist">
                        <img :src="list.images" alt="">
                        <p>{{ list.name }}</p>
                        <span>{{ list.author }}</span>
                     </div>
                  </div>
               </div>
               <div class="find-mv clearfix">
                  <div class="find-mv_title find_title">
                     <span class="icon icon-video-camera"></span>
                     <span class="find-sole_give">推荐MV</span>
                     <span class="find-sole_more">更多》</span>
                  </div>
                  <div class="find-sole_content">
                     <div v-for="(list, index) in mv">
                        <img :src="list.images" alt="">
                        <p>{{ list.name }}</p>
                        <p>{{ list.author }}</p>
                     </div>
                  </div>
               </div>
               <div class="find-radio clearfix">
                  <div class="find-new_title find_title">
                     <span class="icon icon-radio-checked"></span>
                     <span class="find-sole_give">主播电台</span>
                     <span class="find-sole_more">更多》</span>
                  </div>
                  <div class="find-new_content">
                     <div v-for="(list, index) in newlist">
                        <img :src="list.images" alt="">
                        <p>{{ list.name }}</p>
                        <span>{{ list.author }}</span>
                     </div>
                  </div>
               </div>
               <div class="find-list clearfix">
                  <div class="find-new_title find_title">
                     <span class="icon icon-radio-checked"></span>
                     <span class="find-sole_give">推荐歌单</span>
                     <span class="find-sole_more">更多》</span>
                  </div>
                  <div class="find-new_content">
                     <div v-for="(list, index) in newlist">
                        <img :src="list.images" alt="">
                        <p>{{ list.name }}</p>
                        <span>{{ list.author }}</span>
                     </div>
                  </div>
               </div>
               <div class="find-footer">
                  <p>现在可以根据个人爱好,自由调整首页栏目顺序啦~</p>
                  <div>调整栏目顺序</div>
               </div>
         </div>
</template>

<script>
 import api from '../../static/js/util.js'
   export default {
      data: function(){
         return {
            slider:[],
            sole:[],
            newlist:[],
            mv:[],
         }
      },
      mounted: function(){
         this.getSliderDate();
         var swiper = new Swiper(this.$refs.container_recommend, {
              pagination: '.swiper-pagination',
              paginationClickable: true,
              loop:true,
              autoplay: 2500,
              autoplayDisableOnInteraction: false,
              observer:true,
              observeParents:true,
              lazyLoading: true
         });
      },
      methods: {
         getSliderDate: function(){
            var that = this;
            api.get('find', {}, function(res){
                  that.slider = res.slide;
                  that.sole = res.sole;
                  that.newlist = res.newlist;
                  that.mv = res.mv;
            })
         }
      },
   }
</script>

