import store from "@/store";
import {showToLoginModal} from "@/utils/common"

const baseURL = 'https://api.zerotier.com/api/v1'

const statusCodeMap = {
	401: {msg: 'API响应 401', func: showToLoginModal},
	403: {msg: 'API响应 403', func: showToLoginModal}
}

/**
 * 网络请求
 * @param {object} options 请求配置
 * @param {string} options.url 请求的地址
 * @param {'GET'|'POST'|'DELETE'|'PUT'} options.method 请求方法
 * @param {object} options.header 请求头
 * @param {'object'|'string'} options.data 请求的参数
 * @param {boolean} options.showLoading 显示loading
 * @param {string} options.loadingText 显示loading文字
 */
export const request = (options) => {
	return new Promise((resolve, reject) => {
		if (options.showLoading == null || options.showLoading) {
			uni.showLoading({
				title: options.loadingText || '加载中...'
			})
		}
		
		var config = store.state.config
		uni.request({
			url: (config.server || baseURL) + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				...options.header,
				'Authorization': 'token ' + config.token
			},
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.data)
				} else {
					uni.showToast({
						title: statusCodeMap[res.statusCode]?.msg ?? res.data.message,
						icon: 'error',
						complete: () => {
							statusCodeMap[res.statusCode]?.func()
						}
					})
					
					reject(res.errMsg)
				}
			},
			fail: (err) => {
				uni.showToast({
					title: err.errMsg,
					icon: 'error'
				})
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}
