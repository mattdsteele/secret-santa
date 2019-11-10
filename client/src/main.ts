import '@/store/firestore';
import 'firebaseui/dist/firebaseui.css';
import Vue from 'vue';
import vueAnalyticsInstall from 'vue-analytics';
import VueMarkdown from 'vue-markdown';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css'; // This line here
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(
  { install: vueAnalyticsInstall },
  {
    id: 'UA-30572618-3',
    router
  }
);
Vue.component('vue-markdown', VueMarkdown);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
