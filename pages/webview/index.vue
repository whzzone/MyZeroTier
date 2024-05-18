<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
			}
		},
		onLoad(options) {
			this.src = options.url
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
