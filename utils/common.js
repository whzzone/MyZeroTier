/**
 * 显示去登录弹窗
 * @param {boolean} navigateBack 返回上一页
 */
export function showToLoginModal(navigateBack = true) {
	uni.showModal({
		title: '温馨提示',
		content: '请登录后重试',
		confirmText: '去登录',
		success: res => {
			if (res.confirm) {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			}else if (navigateBack) {
				uni.navigateBack()
			}
		}
	})
}

/**
 * 时间戳转yyyy-MM-dd HH:mm:ss
 * @param {number} timestamp 时间戳
 */
export function timestampToTime(timestamp) {
	timestamp = timestamp ? timestamp : null;
	let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	return Y + M + D + h + m + s;
}