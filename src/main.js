import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import api from '@/config/interface'
import axiox from './axios/http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false

Vue.prototype.$api = api

Vue.prototype.$axiox = axiox

Vue.use(ElementUI)

Vue.use(VueCookies)

new Vue({
    el: '#app',
    render: h => h(App),
    components: {App},
    template: '<App/>',
    router,
    store
})
