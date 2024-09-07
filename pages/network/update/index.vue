<template>
	<view style="padding-bottom: 50px;">
		<u-loading-page :loading="loading"></u-loading-page>
		
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
					<view style="display: flex;">
						<view class="">网络名称：</view>
						<u--input clearable placeholder="网络名称" v-model="network.config.name"
							border="surround"></u--input>
					</view>
				</u-col>
			</u-row>
			<u-row customStyle="margin: 10px">
				<u-col span="12">
					<view style="display: flex;">
						<view class="">访问控制：</view>
						<u-tag text="私人" :plain="!network.config.private" type="primary" :name="1"
							@click="handlePrivateRadioClick">
						</u-tag>
						<view style="width: 20px;"></view>

						<u-tag text="公开" :plain="network.config.private" type="primary" :name="0"
							@click="handlePrivateRadioClick">
						</u-tag>
					</view>
				</u-col>
			</u-row>
			<u-row customStyle="margin: 10px">
				<u-col span="12">
					<view style="display: flex;">
						<view class="">网络描述：</view>
						<u--input clearable placeholder="网络描述" v-model="network.description"
							border="surround"></u--input>
					</view>
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
					<view class="" style="font-weight: bold;">路由管理</view>
				</u-col>
			</u-row>

			<u-row customStyle="margin: 10px">
				<u-col span="12">
					<view style="white-space: break-spaces;">target                             via</view>
				</u-col>
			</u-row>

			<u-row customStyle="margin: 10px" v-for="(item, index) in network.config.routes" :key="index">
				<u-col span="12">
					<view style="display: flex; justify-content: space-between;">
						<view style="white-space: break-spaces;">{{item.target}}        {{item.via ? item.via : '(LAN)'}}
						</view>
						<view> </view>
						<u-icon name="close-circle" color="#ff7779" size="20" @tap="handleRouteDel(index)"></u-icon>
					</view>
				</u-col>

			</u-row>

			<u-row customStyle="margin: 10px">
				<u-col span="12">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view style="width: 40%;">
							<u--input clearable placeholder="10.11.12.0/24" @change="debounce(handleRouteTargetChange)"
								v-model="routeTarget" border="surround"></u--input>
						</view>
						<span> ~ </span>
						<view style="width: 40%;">
							<u--input clearable placeholder="192.168.168.1" @change="debounce(handleRouteViaChange)"
								v-model="routeVia" border="surround"></u--input>
						</view>
						<view>
							<u-button :disabled="!addRouteAble" plain type="primary" text="添加"
								@tap="handleRouteAdd"></u-button>
						</view>
					</view>
				</u-col>

			</u-row>
		</view>

		<hr>
		<view style="margin: 6px;">

			<u-row customStyle="margin: 10px;">
				<u-col span="12">
					<view class="" style="font-weight: bold;">IPv4 设置</view>
				</u-col>
			</u-row>

			<u-row customStyle="margin: 10px">
				<u-checkbox-group placement="column" @change="handleIpv4Change" v-model="getIpv4AutoSelected">
					<u-checkbox :customStyle="{marginBottom: '8px'}" label="自动分配IP" name="zt">
					</u-checkbox>
				</u-checkbox-group>
			</u-row>

			<template v-if="network.config.v4AssignMode.zt">
				<u-row customStyle="margin: 10px;">
					<u-col span="12">
						<view class="" style="font-weight: bold;">IP分配池</view>
					</u-col>
				</u-row>

				<u-row customStyle="margin: 10px" v-for="(item, index) in network.config.ipAssignmentPools"
					:key="index">
					<u-col span="12" v-if="item.ipRangeStart.length <= 15">
						<view style="display: flex; justify-content: space-between;">
							<view>{{item.ipRangeStart}} ~ {{item.ipRangeEnd}}</view> <u-icon name="close-circle"
								color="#ff7779" size="20" @tap="handleIpAssignmentDel(index)"></u-icon>
						</view>
					</u-col>

				</u-row>

				<u-row customStyle="margin: 10px">
					<u-col span="12">
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view style="width: 40%;">
								<u--input clearable placeholder="192.168.1.1" @change="debounce(handleIpStartChange)"
									v-model="ipStart" border="surround"></u--input>
							</view>
							<span> ~ </span>
							<view style="width: 40%;">
								<u--input clearable placeholder="192.168.1.255" @change="debounce(handleIpEndChange)"
									v-model="ipEnd" border="surround"></u--input>
							</view>
							<view>
								<u-button :disabled="!addIpAble" plain type="primary" text="添加"
									@tap="handleIpAdd"></u-button>
							</view>
						</view>
					</u-col>

				</u-row>
			</template>
			

			<!-- <hr>
			<view style="margin: 6px;">
				<u-row customStyle="margin: 10px;">
					<u-col span="12">
						<view class="" style="font-weight: bold;">DNS</view>
					</u-col>

				</u-row>

				<u-row customStyle="margin: 6px;">
					<u-col span="12">
						<span>Requires ZeroTier version 1.6. See Settings Help below.</span>
					</u-col>

				</u-row>
				<u-row customStyle="margin: 10px">
					<view style="display: flex;align-items: center;">
						<span>Search Domain：</span> <u--input clearable placeholder="Search Domain"
							v-model="network.config.dns.domain" border="surround"></u--input>
					</view>
				</u-row>
			</view> -->

		</view>
		<hr>
		<view style="margin: 6px;">
			<u-row customStyle="margin: 10px;">
				<u-col span="12">
					<view class="" style="font-weight: bold;">IPv6 设置</view>
				</u-col>
			</u-row>
		
			<u-row customStyle="margin: 10px">
				<u-checkbox-group placement="column" @change="handleIpv6Change" v-model="getIpv6AutoSelected">
					<u-checkbox :customStyle="{marginBottom: '8px'}"
						label="ZeroTier 6PLANE (/80 routable for each device)" name="rfc4193">
					</u-checkbox>
					<u-checkbox :customStyle="{marginBottom: '8px'}" label="ZeroTier RFC4193 (/128 for each device)"
						name="6plane">
					</u-checkbox>
					<u-checkbox :customStyle="{marginBottom: '8px'}" label="自动分配IP" name="zt">
					</u-checkbox>
				</u-checkbox-group>
			</u-row>
		
			<template v-if="network.config.v6AssignMode.zt">
				<u-row customStyle="margin: 10px;">
					<u-col span="12">
						<view class="" style="font-weight: bold;">IP分配池</view>
					</u-col>
				</u-row>
		
				<u-row customStyle="margin: 10px" v-for="(item, index) in network.config.ipAssignmentPools"
					:key="index">
					<u-col span="12" v-if="item.ipRangeStart.length > 15">
						<view style="display: flex; justify-content: space-between;">
							<view>{{item.ipRangeStart}} ~ {{item.ipRangeEnd}}</view> <u-icon name="close-circle"
								color="#ff7779" size="20" @tap="handleIpAssignmentDel(index)"></u-icon>
						</view>
					</u-col>
		
				</u-row>
		
				<u-row customStyle="margin: 10px">
					<u-col span="12">
						<view style="display: flex; flex-direction: column;gap: 6px;">
							<view style="">
								<u--input clearable placeholder="2001:abcd:ef00:ffff:ffff:ffff:ffff:0000"
									@change="debounce(handleIpv6StartChange)" v-model="ipv6Start"
									border="surround"></u--input>
							</view>
							<view style="">
								<u--input clearable placeholder="2001:abcd:ef00:ffff:ffff:ffff:ffff:0000"
									@change="debounce(handleIpv6EndChange)" v-model="ipv6End"
									border="surround"></u--input>
							</view>
							<view>
								<u-button :disabled="!addIpv6Able" plain type="primary" text="添加"
									@tap="handleIpv6Add"></u-button>
							</view>
						</view>
					</u-col>
		
				</u-row>
			</template>
		</view>
		<hr>
		<view style="margin: 6px;">
			<u-row customStyle="margin: 10px;">
				<u-col span="12">
					<view class="" style="font-weight: bold;">多播</view>
				</u-col>
			</u-row>
		
			<u-row customStyle="margin: 10px">
				<u-checkbox-group placement="column" @change="handleBroadcastChange" v-model="getBroadcastSelected">
					<u-checkbox :customStyle="{marginBottom: '8px'}" label="开启广播" name="enableBroadcast">
					</u-checkbox>
				</u-checkbox-group>
			</u-row><u-row customStyle="margin: 10px">
				<view style="display: flex;align-items: center;">
					<span>Multicast Recipient Limit：</span> <u--input clearable
						placeholder="Multicast Recipient Limit" type="number"v-model="network.config.multicastLimit"
						border="surround"></u--input>
				</view>
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
			<view><u-button type="primary" shape="circle"  text="保 存" @tap="handSaveClick"></u-button></view>
			<br>
			<view><u-button @click="handleNetworkDelete" shape="circle" type="error" text="删 除 网 络"></u-button></view>
		
		</view>
	</view>
</template>

<script>
	import loginMixin from '../../../mixin/loginMixin'
	import debounce from '@/uni_modules/uview-ui/libs/function/debounce.js'
	import {
		isValidIPv4,
		isValidCIDR,
		timestampToTime,
		isValidIPv6
	} from '@/utils/common.js'
	export default {
		mixins: [loginMixin],
		data() {
			return {
				loading: true,
				network: {
					id: null,
					onlineMemberCount: null,
					config: {
						name: null,
						private: null,
						routes: [],
						ipAssignmentPools: [],
						v4AssignMode: {
							zt: null
						},
						v6AssignMode: {
							'6plane': null,
							rfc4193: null,
							zt: null,
						},
						multicastLimit: null,
						enableBroadcast: null,
						dns: {
							domain: '',
							servers: [],
						}
					},
				},

				ipStart: '',
				ipEnd: '',
				ipv6Start: '',
				ipv6End: '',
				routeTarget: '',
				routeVia: '',
				addIpAble: false,
				addRouteAble: false,
				addIpv6Able: false,
				memberList: [],
			}
		},
		onLoad(option) {
			if (!this.isLogin()) {
				return
			}
			
			this.getData(option.networkId)
		},
		computed: {
			getIpv6AutoSelected: function() {
				let selected = []
				Object.keys(this.network.config.v6AssignMode).forEach(key => {
					if (this.network.config.v6AssignMode[key]) {
						selected.push(key)
					}
				});
				return selected
			},
			getIpv4AutoSelected: function() {
				let selected = []
				Object.keys(this.network.config.v4AssignMode).forEach(key => {
					if (this.network.config.v4AssignMode[key]) {
						selected.push(key)
					}
				});
				return selected
			},
			getBroadcastSelected: function() {
				let selected = []
				if (this.network.config.enableBroadcast) {
					selected.push('enableBroadcast')
				}
				return selected
			},
		},
		methods: {
			debounce,
			timestampToTime,
			getData(id) {
				this.loading = true
				this.$api.getNetwork(id).then(res => {
					this.network = res
					console.log(res);
					uni.setNavigationBarTitle({
						title: res.id
					})
					
					 this.getMemberList(id)
				}).finally(() => {
					this.loading = false
				})
			},
			handleIpAssignmentDel(index) {
				this.network.config.ipAssignmentPools.splice(index, 1)
			},
			handleRouteDel(index) {
				this.network.config.routes.splice(index, 1)

			},
			handleIpStartChange(val) {
				this.addIpAble = this.ipStart && this.ipEnd
			},
			handleIpEndChange(val) {
				this.addIpAble = this.ipStart && this.ipEnd
			},

			handleIpv6StartChange(val) {
				this.addIpv6Able = this.ipv6Start && this.ipv6End
			},
			handleIpv6EndChange(val) {
				this.addIpv6Able = this.ipv6Start && this.ipv6End
			},
			handleRouteTargetChange(val) {
				this.addRouteAble = !!this.routeTarget
			},
			handleRouteViaChange(val) {

			},
			handleIpAdd() {
				if (!isValidIPv4(this.ipStart) || !isValidIPv4(this.ipEnd)) {
					uni.showToast({
						title: 'IPv4地址错误',
						icon: 'none'
					})
					return
				}

				this.network.config.ipAssignmentPools.push({
					"ipRangeStart": this.ipStart,
					"ipRangeEnd": this.ipEnd
				})

				this.ipStart = ''
				this.ipEnd = ''
				this.addIpAble = false
			},

			handleIpv6Add() {
				if (!isValidIPv6(this.ipv6Start) || !isValidIPv6(this.ipv6End)) {
					uni.showToast({
						title: 'IPv6地址错误',
						icon: 'none'
					})
					return
				}

				this.network.config.ipAssignmentPools.push({
					"ipRangeStart": this.ipv6Start,
					"ipRangeEnd": this.ipv6End
				})

				this.ipv6Start = ''
				this.ipv6End = ''
				this.addIpv6Able = false
			},
			handleRouteAdd() {
				if (!isValidCIDR(this.routeTarget)) {
					uni.showToast({
						title: '无类域间路由错误',
						icon: 'none'
					})
					return
				}

				if (this.routeVia && !isValidIPv4(this.routeVia)) {
					uni.showToast({
						title: 'IP地址错误',
						icon: 'none'
					})
					return
				}

				this.network.config.routes.push({
					"target": this.routeTarget,
					"via": this.routeVia
				})

				this.routeTarget = ''
				this.routeVia = ''
				this.addRouteAble = false
			},
			handlePrivateRadioClick(name) {
				this.network.config.private = name === 1
			},
			handleIpv4AutoClick(name) {
				this.network.config.v4AssignMode.zt = name === 1
			},
			handleIpv6Change(array) {
				Object.keys(this.network.config.v6AssignMode).forEach(key => {
					this.$set(this.network.config.v6AssignMode, key, array.includes(key))
				});
			},
			handleIpv4Change(array) {
				Object.keys(this.network.config.v4AssignMode).forEach(key => {
					this.$set(this.network.config.v4AssignMode, key, array.includes(key))
				});
			},
			handleBroadcastChange(array) {
				this.network.config.enableBroadcast = array.length > 0
				console.log(this.network.config.enableBroadcast);
			},
			handSaveClick() {
				if (!this.network.config.name) {
					uni.showToast({
						title:'网络名称不能为空',
						icon:'none'
					})
					return	
				}
				try{
					this.network.config.multicastLimit = Number(this.network.config.multicastLimit)
				}catch (e) {}
				this.$api.updateNetwork(this.network).then(res => {
					uni.showToast({
						title:'保存成功',
						icon:'success'
					})
				}).catch(err => {
					uni.showToast({
						title:'保存失败:' + e,
						icon:'none'
					})
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