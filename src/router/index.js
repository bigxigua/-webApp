import Vue from 'vue'
import Router from 'vue-router'
import Find from '@/pages/find/find.vue'
import Audio from '@/components/audio/audio.vue'
import Daily from '@/pages/dailySongRecommendation/dailySongRecommendation.vue'
// import About from '@/components/About.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Find',
      component: Find
    },
    {
      path: '/audio',
      name: 'Audio',
      component: Audio
    },
    {
      path: '/daily',
      name: 'Daily',
      component: Daily
    }
  ]
})
