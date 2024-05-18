import {showToLoginModal} from "../utils/common"

export default {
    methods: {
		/**
		 * 是否登录
		 * @param {boolean} showModal 显示登录弹窗  
		 * @param {boolean} navigateback 返回上一页
		 */
        isLogin(showModal = true, navigateback = true) {
            if (!this.$store.state.userinfo) {
				if (showModal) {
				 showToLoginModal(navigateback)	
				}
                return false
            } else {
                return true
            }
        }
    }
}
