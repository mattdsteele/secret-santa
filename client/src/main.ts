import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueMarkdown from 'vue-markdown';
import App from './App.vue';
import router from './router';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/black-green-light.css'; // This line here
import 'firebaseui/dist/firebaseui.css';

import '@/store/firestore';
import store from './store';
console.log('stored...');

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.component('vue-markdown', VueMarkdown);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
