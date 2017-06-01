// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Vuex from 'vuex'

// import $ from 'jquery'

// Vue.use(Vuex)

Vue.config.productionTip = false

// var store = new Vuex.Store({
// 	state: {
// 		showAudio: false, //是否显示播放器
// 	},
// 	mutations: {
// 		showAudioHandle: function(state) {
// 			state.showAudio ? state.showAudio = false : state.showAudio = true;
// 		}
// 	}
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
