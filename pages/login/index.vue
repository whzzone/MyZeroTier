<template>
	<view class="page">
		<view class="title">MyZeroTier</view>
		<view style="margin-bottom: 30px;">
			<u--form labelPosition="left" :model="form" :rules="rules" ref="form">
				<u-form-item prop="token">
					<u--input inputAlign="center" :customStyle="{height:'40px'}" v-model="form.token"
						placeholder="请输入Token" border="surround" shape="circle" clearable></u--input>
				</u-form-item>
				<u-form-item prop="server">
					<u--input inputAlign="center" :customStyle="{height:'40px'}" v-model="form.server"
						placeholder="请输入服务器地址" border="surround" shape="circle" clearable></u--input>
				</u-form-item>
			</u--form>
		</view>

		<u-button size="large" shape="circle" type="warning" @click="handleLogin">登 录</u-button>
	</view>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				form: {
					token: '',
					server: 'https://api.zerotier.com/api/v1'
				},
				rules: {
					'token': {
						validator: (rule, value, callback) => {
							var pattern = /^[A-Za-z0-9]+$/
							return pattern.test(value);
						},
						message: '请输入正确的Token',
						trigger: ['blur', 'change']
					},
					'server': {
						validator: (rule, value, callback) => {
							var pattern =
								/^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/
							return pattern.test(value);
						},
						message: '请输入正确的服务地址',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		methods: {

			handleLogin() {
				this.$refs.form.validate().then(res => {
					if (this.form.server.endsWith('/')) {
						this.form.server = this.form.server.substring(0, this.form.server.length - 1)
					}
					this.$store.commit('setConfig', this.form)

					this.$api.login().then(loginRes => {
						if (loginRes.user == null) {
							throw new Error('无效的Token');
						}

						this.$store.commit('setUserinfo', loginRes.user)
						uni.navigateBack()
					}).catch(err => {
						uni.showToast({
							title: err.message,
							icon: 'error'
						})
						this.$store.commit('logout')
					})
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.page {
		height: 80%;
		display: flex;
		flex-direction: column;
		padding: 0 30px;
		justify-content: center;
		background-color: #FFFFFF;

		.title {
			text-align: center;
			margin-bottom: 20px;
			font-size: 40px;
		}
	}
</style>