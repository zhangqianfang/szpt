// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Button, Select } from 'element-ui'
// import VueAreaLinkage from 'vue-area-linkage';
import echarts from 'echarts/lib/echarts'
import store from './vuex/store'

import App from './App'
import router from './router'
import '../static/reset.css' /*引入公共样式*/
import './commen/css/element.scss' /*引入公共样式*/
Vue.config.productionTip = false

import global from './utils/js/common/global'
import japUtils from './utils/js/common/japUtils'
import pageUtils from './utils/js/common/pageUtils'
Vue.prototype.global = global
Vue.prototype.japUtils = japUtils
Vue.prototype.pageUtils = pageUtils

Vue.use(VueResource)
Vue.use(Button)
Vue.use(Select)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.prototype.$store= store
// Vue.use(VueAreaLinkage)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
