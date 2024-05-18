<template>
	<view class="page">
		<view class="item">
			<view class="title">基础信息</view>
			<u-cell-group>
				<u-cell size="large" title="昵称" :value="userinfo.displayName || ''" isLink clickable
					@click="handleClickDisplayName($event, userinfo.displayName)"></u-cell>
				<u-cell size="large" title="邮箱" :value="userinfo.email || ''"></u-cell>
				<u-cell size="large" title="注册时间" :value="formatTime(userinfo.creationTime)"></u-cell>
			</u-cell-group>
		</view>
		<view class="item">
			<view class="title">账户状态</view>
			<u-cell-group>
				<u-cell size="large" title="管理员数量" :value="userinfo.accountLimits.currentAdmins"></u-cell>
				<u-cell size="large" title="成员数量" :value="userinfo.accountLimits.currentMembers"></u-cell>
				<!-- <u-cell size="large" title="SSO" :value="userinfo.accountLimits.currentSSO"></u-cell> -->

			</u-cell-group>
		</view>
		<view class="item">
			<view class="title">账户限制</view>
			<u-cell-group>
				<u-cell size="large" title="管理员数量" :value="userinfo.accountLimits.maxAdmins"></u-cell>
				<u-cell size="large" title="成员数量" :value="userinfo.accountLimits.maxMembers"></u-cell>
				<!-- <u-cell size="large" title="SSO" :value="userinfo.accountLimits.maxSSO"></u-cell> -->
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {timestampToTime} from '../../utils/common'
	import loginMixin from "@/mixin/loginMixin";
	
	export default {
		mixins: [loginMixin],
		data() {
			return {

			}
		},
		computed: {
			userinfo() {
				return this.$store.state.userinfo
			}
		},
		onLoad() {
			if (!this.isLogin()) {
				return
			}
		},
		methods: {
			handleClickDisplayName(e, displayName) {
				uni.showModal({
					title: '修改昵称',
					content: displayName,
					editable: true,
					success: res => {
						if (res.confirm) {
							if (!res.content) {
								uni.showToast({
									title: '昵称不能为空',
									icon: 'error'
								})
								return
							}

							this.$api.updateDisplayName(this.userinfo.id, res.content).then(updateRes => {
								this.$store.commit('setDisplayName', res.content)
								uni.showToast({
									title: '更新成功',
									icon: 'success'
								})
							}).catch(err => {
								uni.showToast({
									title: '更新失败:' + err.toString(),
									icon: 'error'
								})
							})
						}
					}
				})
			},
			formatTime(value) {
				return timestampToTime(value)
			},
		}
	}
</script>

<style scoped lang="scss">
	.page {

		.title {
			color: #ffb441;
		}
	}

	.page .item:not(:last-child) {
		margin-bottom: 30px;
	}
</style>