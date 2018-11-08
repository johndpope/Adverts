// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import 'vuetify/dist/vuetify.min.css'
import * as fb from 'firebase'

Vue.use(Vuetify)
Vue.use(Vuelidate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyBarG3nPofyz5ERVSTp-XG6Q7tQ87WbXJg',
      authDomain: 'ad-project-ee26f.firebaseapp.com',
      databaseURL: 'https://ad-project-ee26f.firebaseio.com',
      projectId: 'ad-project-ee26f',
      storageBucket: 'ad-project-ee26f.appspot.com',
      messagingSenderId: '264884110446'
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLogin', user)
      }
    })
  }
})
