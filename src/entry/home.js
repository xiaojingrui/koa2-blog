
import Vue from 'vue'
import App from '@/components/front/home'
import Vuex from 'vuex';
// import store from './store';
Vue.config.productionTip = false;
/* eslint-disable no-new */+
new Vue({
  el: '#app',
  // render: h => h(App)
  template: `<App></App>`,
  components: {
    App
  },
  // store
});
