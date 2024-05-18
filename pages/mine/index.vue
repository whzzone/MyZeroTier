<template>
	<view>
		<view class="layout-user" v-if="userinfo">
			<span class="username">{{userinfo.displayName}}</span>
			<span class="email">{{userinfo.email}}</span>
		</view>
		<view class="layout-user" v-else>
			<u-button shape="circle" type="info" @click="handleToLogin">登 录</u-button>
		</view>
		<view style="background-color: white;">
			<u-cell-group :customStyle="{'backgroundColor': 'white'}">
				<u-cell size="large" title="账号信息" isLink url="/pages/profile/index" clickable></u-cell>
				<u-cell size="large" title="项目仓库" url="/pages/webview/index?url=https://gitee.com/whzzone/MyZeroTier"
					isLink clickable></u-cell>
				<u-cell size="large" title="当前版本" value="v1.0"></u-cell>
				<u-cell size="large" title="ZeroTier官网" url="/pages/webview/index?url=https://www.zerotier.com/" isLink
					clickable></u-cell>
				<u-cell size="large" title="获取API Token"
					url="/pages/webview/index?url=https://docs.zerotier.com/api/tokens/#zerotier-central-token" isLink
					clickable></u-cell>
			</u-cell-group>

			<view style="margin-top: 50px;width: 90%;margin: 30px auto;">
				<u-button v-if="userinfo" @click="handleLogout" shape="circle" type="error" text="退 出"></u-button>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {

			}
		},
		computed: {
			userinfo() {
				return this.$store.state.userinfo
			}
		},
		methods: {
			handleToLogin() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			handleLogout() {
				uni.showModal({
					title: '提示',
					content: '确认退出？',
					success: res => {
						if (res.confirm) {
							this.$store.commit("logout")
							uni.showToast({
								title: '即将跳转首页',
								duration: 2000,
								complete: () => {
									setTimeout(() => {
										uni.reLaunch({
											url: '/pages/index/index'
										})
									}, 2000)
								}
							})
						}
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.layout-user {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #ffb441;
		padding: 20px;
		height: 100px;

		.username {
			padding: 10px;
			font-size: 30px;
		}

		.email {
			// padding: 10px;
			font-size: 18px;
		}
	}
</style>