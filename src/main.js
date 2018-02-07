/* eslint-disable */
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
import 'tachyons/css/tachyons.min.css'
import fb from 'firebase'

Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyBNiqf21f9wbn6Pnv2kKhhvFv6SM7Z5VpE",
  authDomain: "bbl-dev.firebaseapp.com",
  databaseURL: "https://bbl-dev.firebaseio.com",
  projectId: "bbl-dev",
  storageBucket: "bbl-dev.appspot.com",
  messagingSenderId: "713823656240"
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

var store = {
  debug: true,
  state: {
    baseUrl: 'Hello!'
  },
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  }
}

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data: {
    privateState: {},
    sharedState: store.state
  }
})

