<template>
	<view class="search">
<!-- 		<uni-datetime-picker v-model="range" type="daterange" start="2021-1-01" end="" rangeSeparator="至"
			@change="change" /> -->
			<view class="root">
				<ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex' @ed='ed' @dateChange='dateChange'>
				</ren-dropdown-filter>
			</view>
	</view>

</template> 

<script>
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	export default {
		data() {
			return {
				// range: ['', ''],
				filterData: [
					[{
						text: '所属类型',
						value: ''
					}, {
						text: '液位计',
						value: 'ywj'
					}, {
						text: '积水点',
						value: 'jsd'
					}, {
						text: '智能井盖',
						value: 'znjg'
					}, {
						text: '流量计',
						value: 'llj'
					}],
					[{
						text: '报警状态',
						value: ''
					}, {
						text: '未确认',
						value: 1
					}, {
						text: '已确认',
						value: 2
					}],
					[{
						text: '报警级别',
						value: ''
					}, {
						text: '级别1',
						value: 1
					}, {
						text: '级别2',
						value: 2
					}, {
						text: '级别3',
						value: 3
					}]
				],
				defaultIndex: [0, 0, 0]
			}
		},
		components: {
			RenDropdownFilter
		},
		created() {
			// this.qyList()
		},
		methods: {
			// change(val) {
			// 	console.log(val);
			// 	this.range = val
			// 	console.log(this.range);
			// },
			// async qyList() {
			// 	const {
			// 		data: res
			// 	} = await this.$api.request({
			// 		url: '/system/dict/data/type/org_xzb'
			// 	})
			// 	let arr = []
			// 	for (let item of res.data) {
			// 		arr.push({text:item.dictLabel,value:item.dictValue})
			// 	}
			// 	this.filterData[0] = arr
			// },
			ed(res) {
				console.log(res);
				console.log(res[0][0].value,res[0][0].text)
				console.log(res[1][0].value,res[1][0].text)
				console.log(res[2][0].value,res[2][0].text)
			},
			dateChange(d) {
				console.log(d);
				// uni.showToast({
				// 	icon: 'none',
				// 	title: d
				// })
			}
		},

	}
</script>

<style lang="scss">
	.search {
		// width: 710rpx;
		// padding: 20rpx ;
		// margin: 0 75rpx;
		// position: fixed;
		// top: calc(88rpx + env(safe-area-inset-top));
		// background-color:#fff;
	}
	.uni-date-x--border {
		border: none;
	}
	.uni-date__input {
		height: 72rpx !important;
		line-height: 72rpx !important;
	}

</style>
