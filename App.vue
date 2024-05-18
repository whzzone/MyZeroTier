<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.init()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			init() {
				var config = uni.getStorageSync("config")
				if (config) {
					this.$store.commit('setConfig', JSON.parse(config))
					
					// 获取最新的用户信息
					this.$api.login().then(loginRes => {
						if (loginRes.user == null) {
							throw new Error('无效的Token');
						}
					
						this.$store.commit('setUserinfo', loginRes.user)
					}).catch(err => {
						uni.showToast({
							title: err.message,
							icon: 'error'
						})
						this.$store.commit('logout')
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";

	uni-page-body,
	html,
	body {
		height: 100%;
	}
</style>