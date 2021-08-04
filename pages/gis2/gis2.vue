<template>
	<view>
		<web-view :src="gisUrl" progress></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gisUrl: 'http://115.231.254.38:11020/mapindex'
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
