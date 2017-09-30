// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Vue2Dragula } from 'vue2-dragula'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import fb from 'firebase'

Vue.config.productionTip = false
var config = {
  apiKey: 'AIzaSyC7WU7RjrbeWwQdFEw_lBpVSxQHVkL8FSU',
  authDomain: 'vidads-ca5ce.firebaseapp.com',
  databaseURL: 'https://vidads-ca5ce.firebaseio.com',
  projectId: 'vidads-ca5ce',
  storageBucket: 'vidads-ca5ce.appspot.com',
  messagingSenderId: '585999877989'
}
fb.initializeApp(config)

Vue.use(fb)
Vue.use(Croppa)
Vue.use(VueTabs)
Vue.use(Vue2Dragula, {
  logging: {
    service: false
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

