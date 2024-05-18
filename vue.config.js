module.exports = {
	devServer: {
		port: '8899',
		disableHostCheck: true,
		/* proxy: {
			'/api': {899
				target: 'https://api.zerotier.com',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		} */
	}
}