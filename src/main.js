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
import Settings from './components/Settings.vue';
Vue.config.productionTip = false
Vue.use(ElementUI, { locale });
Vue.use(VueResource);

//#region vue router
Vue.use(VueRouter);
const routes = [
  { path: '/', component: Punch },
  { path: '/summary', component: Summary },
  { path: '/settings', component: Settings },
];
const router = new VueRouter({
  routes // short for `routes: routes`
});
//#endregion

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../sw.js')
    .then(() => console.log('service worker registered'));
}


new Vue({
  render: h => h(App),
  mixins: [requester],
  router: router
}).$mount('#app');
