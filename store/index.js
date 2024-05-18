import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userinfo: null,
		config: {
			token: '',
			server: '',
		}
	},

	getters: {
		getToken(state) {
		    return state.config.token
		}
	},

	mutations: {
		setUserinfo(state, userinfo) {
			state.userinfo = userinfo
			uni.setStorageSync('userinfo', JSON.stringify(userinfo))
		},

		setDisplayName(state, displayName) {
			state.userinfo.displayName = displayName
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},

		setConfig(state, config) {
			state.config = config
			uni.setStorageSync('config', JSON.stringify(config))
		},

		logout(state) {
			state.userinfo = null
			state.config = {
				token: '',
				server: '',
			}
			uni.clearStorage()
		}
	}
})

export default store