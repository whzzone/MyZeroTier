import {request} from "@/utils/request.js"

export default {

	/**
	 * 获取网络列表
	 */
    getNetworkList(){
        return request({
			url: '/network'
		})
    },

	/**
	 * 获取单个网络详情
	 * @param {string} id networkId
	 */
    getNetwork(id){
        return request({
			url: '/network/' + id
		})
    },

	/**
	 * 获取网络成员列表
	 * @param {string} id networkId
	 */
	getNetworkMemberList(id){
	    return request({
			url: '/network/' + id + '/member'
		})
	},

	/**
	 * 设置成员授权
	 * @param {string} networkId 网络id
	 * @param {string} memberId 成员id
	 * @param {boolean} authorize 是否授权
	 */
	authorizeMember(networkId, memberId, authorize) {
		return request({
			url: `/network/${networkId}/member/${memberId}`,
			method: 'POST',
			data: {"config": {"authorized": authorize}}
		})
	},

	/**
	 * 登录
	 */
	login() {
		return request({
			url: '/status',
		})
	},

	/**
	 * 更新昵称
	 * @param {string} userId 用户id
	 * @param {string} displayName 昵称
	 */
	updateDisplayName(userId, displayName) {
		return request({
			url: `/user/${userId}`,
			method: 'POST',
			data: {"displayName": displayName}
		})
	},

	/**
	 * 新增网络
	 */
	createNetwork() {
		return request({
			url: `/network`,
			method: 'POST',
		})
	},

	/**
	 * 删除网络
	 * @param {string} networkId 网络id
	 */
	deleteNetwork(networkId) {
		return request({
			url: `/network/${networkId}`,
			method: 'DELETE',
		})
	},

	/**
	 * 删除成员
	 * @param {string} networkId 网络id
	 * @param {string} memberId 成员id
	 */
	deleteMember(networkId, memberId) {
		return request({
			url: `/network/${networkId}/member/${memberId}`,
			method: 'DELETE',
		})
	},
}
