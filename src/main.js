import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'

import 'amfe-flexible/index.min.js'

import '@/assets/css/global.less' // 引入全局的自定义样式  因为要覆盖vant的样式

import '@/utils/validate.js' // 验证相关

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
