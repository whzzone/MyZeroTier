<template>
	<view>
		<view style="margin: 6px;">
			<u-row customStyle="margin: 10px;">
				<u-col span="12">
					<view class="" style="font-weight: bold;">基础信息</view>
				</u-col>
			</u-row>
			<u-row customStyle="margin: 10px">
				<u-col span="12">
					<view class="">网络 ID：{{network.id}}</view>
				</u-col>
			</u-row>

			<u-row customStyle="margin: 10px">
				<u-col span="12">
					<view class="">网络名称：{{network.config.name}}</view>
				</u-col>
			</u-row>
			<u-row customStyle="margin: 10px">
				<u-col span="12">
					<view class="">在线成员：{{network.onlineMemberCount}}</view>
				</u-col>
			</u-row>
			<u-row customStyle="margin: 10px">
				<u-col span="12">
					<view class="">访问控制：{{network.config.private ? '私人' : '公开'}}</view>
				</u-col>
			</u-row>
			<u-row customStyle="margin: 10px">
				<u-col span="12">
					<view class="">创建时间：{{timestampToTime(network.config.creationTime)}}</view>
				</u-col>
			</u-row>
			<u-row customStyle="margin: 10px">
				<u-col span="12">
					<view class="">更新时间：{{timestampToTime(network.config.lastModified)}}</view>
				</u-col>
			</u-row>
		</view>
		<hr />
		<view style="margin: 6px;">
			<u-row customStyle="margin: 10px;">
				<u-col span="12">
					<view class="" style="font-weight: bold;">路由</view>
				</u-col>
			</u-row>

			<u-row justify="space-between" customStyle="margin: 10px" v-for="(item, index) in network.config.routes" :key="index">
				<u-col span="7">
					<view class="">target：{{item.target}}</view>
				</u-col>
				<u-col span="5" v-if="item.via">
					<view class="">via：{{item.via}}</view>
				</u-col>
				<u-col span="4" v-else>
						<view class="">(LAN)</view>
				</u-col>
			</u-row>
		</view>
		<hr />
		<view style="margin: 6px;">
			<u-row customStyle="margin: 10px;">
				<u-col span="12">
					<view class="" style="font-weight: bold;">IP分配池</view>
				</u-col>
			</u-row>

			<u-row customStyle="margin: 10px" v-for="(item, index) in network.config.ipAssignmentPools" :key="index">
				<u-col span="12">
					<view class="">{{item.ipRangeStart}} ~ {{item.ipRangeEnd}}</view>
				</u-col>
			</u-row>
		</view>
		<hr />
		<view style="margin: 6px;">
			<u-row customStyle="margin: 10px;">
				<u-col span="12">
					<view class="" style="font-weight: bold;">{{`成员（${memberList.length}）`}}</view>
				</u-col>
			</u-row>
			<u-collapse>
				<u-collapse-item :title="item.nodeId" name="Docs guide" v-for="(item, index) in memberList" :key="item.nodeId">
					<text slot="value" class="">{{item.name}}</text>
					<u-row customStyle="margin: 10px;">
						<u-col span="12">
							<view class="" style="font-weight: bold; display: flex;">
								<u-checkbox-group iconPlacement="right" :value="[item.config.authorized.toString()]"
									@change="checkboxAuthorizedChange($event, index, item)">
									<u-checkbox activeColor="#19be6b" :customStyle="{marginBottom: '0px'}" label="授权状态：" name="true">
									</u-checkbox>
								</u-checkbox-group>
							</view>
						</u-col>
					</u-row>
					<u-row customStyle="margin: 10px;">
						<u-col span="12">
							<view class="" style="font-weight: bold;">
								虚拟IP：{{item.config.ipAssignments.map((obj)=>{return obj}).join("、")}}</view>
						</u-col>
					</u-row>
					<u-row customStyle="margin: 10px;">
						<u-col span="12">
							<view class="" style="font-weight: bold;">物理IP：{{item.physicalAddress || 'UNKNOW'}}</view>
						</u-col>
					</u-row>
					<u-row customStyle="margin: 10px;">
						<u-col span="12">
							<view class="" style="font-weight: bold;">版本：{{item.clientVersion}}</view>
						</u-col>
					</u-row>
					<u-row customStyle="margin: 10px;">
						<u-col span="12">
							<view class="" style="font-weight: bold;">最近在线：{{timestampToTime(item.lastOnline)}}</view>
						</u-col>
					</u-row>
					<view style="width: 60%;margin: 0px auto;">
						<u-button @click="handleMemberDelete(index, item)" shape="circle" type="error" text="删 除 成 员"></u-button>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		
		<view style="width: 90%;margin: 30px auto;">
			<u-button v-if="network" @click="handleNetworkUpdate" shape="circle" type="primary" text="编 辑 网 络"></u-button>
			<u-button v-if="network" @click="handleNetworkDelete" shape="circle" type="error" text="删 除 网 络"></u-button>
		
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
				network: {
					id: null,
					onlineMemberCount: null,
					config: {
						name: null,
						private: null,
						routes: [],
						ipAssignmentPools: [],
					}
				},
				memberList: [],
			}
		},
		onLoad(options) {
			if (!this.isLogin()) {
				return
			}
			
			this.getData(options.networkId)
		},
		methods: {
			timestampToTime,
			getData(id) {
				this.$api.getNetwork(id).then(res => {
					this.network = res
					uni.setNavigationBarTitle({
						title: res.id
					})

					this.getMemberList(id)
				})
			},
			getMemberList(id) {
				this.$api.getNetworkMemberList(id).then(res => {
					this.memberList = res
				})
			},
			checkboxAuthorizedChange(e, index, item) {
				const authorize = e.length > 0
				this.$api.authorizeMember(item.networkId, item.nodeId, authorize).then(res => {
					this.memberList[index].config.authorized = authorize
				})
			},
			handleMemberDelete(index, member) {
				uni.showModal({
					title:'提示',
					content:`确认删除成员：${member.nodeId}？`,
					success: res => {
						if (res.confirm) {
							this.$api.deleteMember(this.network.id, member.nodeId).then(() => {
								this.memberList.splice(index, 1)
								uni.showToast({
									title: '删除成功',
									icon: 'success',
								})
							}).catch(err => {
								uni.showToast({
									title: '删除失败：' + err,
									icon: 'error'
								})
							})
						}
					}
				})
			},
			handleNetworkUpdate() {
				uni.navigateTo({
					url: `/pages/network/update/index?networkId=${this.network.id}`
				})
				
			},
			handleNetworkDelete() {
				uni.showModal({
					title:'提示',
					content:`确认删除网络：${this.network.id}？`,
					success: res => {
						if (res.confirm) {
							this.$api.deleteNetwork(this.network.id).then(() => {
								uni.showToast({
									title: '删除成功',
									icon: 'success',
									complete: () => {
										uni.reLaunch({
											url: '/pages/index/index'
										})
									}
								})
							}).catch(err => {
								uni.showToast({
									title: '删除失败：' + err,
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

<style>

</style>
