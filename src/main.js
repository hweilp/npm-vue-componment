/**
 * name : Application
 * desc :
 * at : Created by HW with WebStorm on 2018/7/13 14:03.
 * uri :
 */

import Vue from 'vue'
import App from './App.vue'
import Index from './index.js'
Vue.use(Index)

new Vue({
  el: '#app',
  render: h => h(App)
})
