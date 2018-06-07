import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import VueResource from 'vue-resource';
import requester from './mixins/requester'
import VueRouter from 'vue-router';
import Punch from './components/Punch.vue';
import Summary from './components/Summary.vue';

Vue.config.productionTip = false
Vue.use(ElementUI, { locale });
Vue.use(VueResource);
Vue.use(VueRouter);
const routes = [
  { path: '/', component: Punch },
  { path: '/summary', component: Summary },
]
const router = new VueRouter({
  routes // short for `routes: routes`
})
new Vue({
  render: h => h(App),
  mixins: [requester],
  router: router
}).$mount('#app')
