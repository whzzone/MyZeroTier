<template>
	<view>
		<view>
			<u-row customStyle="margin: 10px">
				<u-col span="4">
					<view class="">网络数量：{{networks.length}}</view>
				</u-col>
				<u-col span="4">
					<view class="">授权成员：{{networks.reduce((sum, e) => sum + e.authorizedMemberCount, 0)}}</view>
				</u-col>
				<u-col span="4">
					<view class="">成员数量：{{networks.reduce((sum, e) => sum + e.totalMemberCount, 0)}}</view>
				</u-col>
			</u-row>
			<u-cell-group>
				<view style="white-space: pre;">
					<u-cell v-for="(item, index) in networks" :key="index" isLink
						:url="`/pages/detail/index?networkId=${item.id}`" center>
						<template slot="title">
							<view style="display: flex; align-items: center;">
								<u-tag :text="item.config.private ? '私人' : '公开'" plain size="mini"
									:type="item.config.private ? 'warning' : 'success'" />
								<span style="margin-left: 10px;font-weight: bold;">{{item.id}}</span>
							</view>
						</template>
						<template slot="label">
							<u-row custom-style="padding: 6px 0 4px 0">
								<u-col span="6">
									<view>名称：{{item.config.name === '' ? '-' : item.config.name}}</view>
								</u-col>
								<u-col span="6">
									<view>成员：{{item.totalMemberCount}}</view>
								</u-col>
							</u-row>
						</template>
					</u-cell>
				</view>
			</u-cell-group>
		</view>
		<u-loadmore loadmore-text="下拉刷新" line />
		<view @click="handleAddNetwork" class="btn-add" hover-class="btn-add-hover"></view>
	</view>
</template>

<script>
	import loginMixin from "@/mixin/loginMixin";

	export default {
		mixins: [loginMixin],
		data() {
			return {
				networks: [],
			}
		},

		onPullDownRefresh() {
			if (!this.isLogin(true, false)) {
				uni.stopPullDownRefresh()
				return
			}
			this.getData()
		},

		onLoad() {
			setTimeout(() => {
				if (this.isLogin(false)) {
					this.getData()
				}
			}, 500)
		},

		methods: {
			getData() {
				this.$api.getNetworkList().then(res => {
					this.networks = res
				}).finally(() => {
					uni.stopPullDownRefresh()
				})
			},
			handleAddNetwork() {
				if (!this.isLogin(true, false)) {
					return
				}
				uni.showModal({
					title: '提示',
					content: `确认新增网络？`,
					success: res => {
						if (res.confirm) {
							this.$api.createNetwork().then(() => {
								uni.showToast({
									title: '新增成功',
									icon: 'success',
									complete: () => {
										this.getData()
									}
								})
							}).catch(err => {
								uni.showToast({
									title: '新增失败：' + err,
									icon: 'error'
								})
							})
						}
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		height: 100%;
		display: flex;
		flex-direction: column;

		.layout-token {
			display: flex;
			padding: 6px;
			align-items: center;

			.btnLogin {
				flex: 0.9;
			}
		}

		.btn-add {
			position: absolute;
			bottom: 10%;
			right: 10%;
			background-image: url('../../static/add.png');
			background-size: cover;
			width: 60px;
			height: 60px;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 40px;
		}

		.btn-add-hover {
			opacity: 0.6;
		}

	}
</style>