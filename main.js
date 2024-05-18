import App from './App'
import api from "api/index";
import store from "store/index"

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import uView from '@/uni_modules/uview-ui'
Vue.config.productionTip = false
// 挂载到全局使用
Vue.prototype.$api = api
Vue.use(uView)
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
