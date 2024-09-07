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
			} else if (navigateBack) {
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

/**
 * IP校验
 * @param {Object} ip
 */
export function isValidIPv4(ip) {
	const regex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
	return regex.test(ip);
}

/**
 * 要校验类似192.168.66.0/24这样的CIDR（无类别域间路由）格式的IP地址
 * @param {Object} cidr
 */
export function isValidCIDR(cidr) {
	const parts = cidr.split('/');
	if (parts.length !== 2) {
		return false; // 必须有两部分
	}
	const [ip, mask] = parts;

	// 校验IP地址部分
	const ipRegex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
	if (!ipRegex.test(ip)) {
		return false; // IP地址格式不正确
	}

	// 校子孙网掩码部分
	const maskRegex = /^([1-9]|[1-2]\d|3[0-2])$/;
	return maskRegex.test(mask);
}

/** 
 * 校验ipv6
 * @param {Object} ip
 */
export function isValidIPv6(ip) {
	  const regex = /^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/;
	  return regex.test(ip);
}