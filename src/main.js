// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import VueLoading from './plus/loading/loading'
import Toast from './plus/toast/index'
Vue.use(Toast);
Vue.use(VueLoading, { container: '' })
Vue.use(ViewUI);

Vue.prototype.root = new Vue()

Vue.config.productionTip = false

Vue.prototype.$axios = axios
axios.interceptors.request.use((config) => {
    if (sessionStorage.getItem('isLoadingPay') == 'loading') {} else {
        Vue.loading();
    }
    return config;
});
axios.interceptors.response.use((config) => {
    Vue.loading.end();
    if (config.data.status === 'TOKEN_ERROR') {
        // console.log('token失效了');
        router.push('/login');
    }
    return config;
}, (e) => {
    Vue.loading.end();
});

Vue.prototype.HOST = process.env.NODE_ENV === 'development' ? '/test' : '/';
// Vue.prototype.HOST = 'http://284961lj75.zicp.vip/' //http://www.100yu.com/
Vue.prototype.HOST = 'https://www.100yu.com/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
