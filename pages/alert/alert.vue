<template>
	<view>
		<view class="root">
			<ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex' @ed='ed'
				@dateChange='dateChange'>
			</ren-dropdown-filter>
		</view>
		<view class="line"></view>
		<alert-list v-if="bjList != false" :bjList='bjList' />
		<view style="text-align: center;margin-top: 100px;color: #888;" v-else>暂无数据</view>
		<!-- <uni-load-more :status="loadStatus"/> -->
	</view>
</template>

<script>
	import AlertList from './childCpns/AlertList.vue'
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	export default {
		data() {
			return {
				filterData: [
					[ {
						text: '污水',
						value: 1
					}, {
						text: '雨水',
						value: 2
					}],
					[{
						text: '所属类型',
						value: ''
					}, {
						text: '液位计',
						value: '液位计'
					}, {
						text: '积水点',
						value: '积水点'
					}, {
						text: '智能井盖',
						value: '智能井盖'
					}, {
						text: '流量计',
						value: '流量计'
					}],
					[{
						text: '报警级别',
						value: ''
					}, {
						text: 'Ⅰ级',
						value: 'Ⅰ级'
					}, {
						text: 'Ⅱ级',
						value: 'Ⅱ级'
					}, {
						text: 'Ⅲ级',
						value: 'Ⅲ级'
					}]
				],
				defaultIndex: [0, 0, 0],

				bjList: [],
				query: {
					pageNum: 1,
					pageSize: 10,
					lx1: "",
					dj:"",
					stationType:1,
				},
				loadStatus: 'loading', //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
				isLoadMore: false, //是否加载中
			}
		},
		components: {
			RenDropdownFilter,
			AlertList
		},
		onLoad() {
			// this.qyList()
			this.getBjList2(this.query.lx1,this.query.dj,this.query.stationType)
		},
		// onReachBottom() { //上拉触底函数
		// 	if(this.bjList.length < this.query.pageSize){
		// 		uni.showToast({
		// 			title: '没有更多数据了！',
		// 			icon: 'none'
		// 		})
		// 	}else {
		// 		if (!this.isLoadMore) { //此处判断，上锁，防止重复请求
		// 			this.isLoadMore = true
		// 			this.query.pageNum += 1
		// 			console.log(this.query);
		// 			this.getBjList(this.query.pageSize, this.query.pageNum, this.query.lx1,this.query.dj,this.query.stationType)
		// 		}
		// 	}
		// },
		
		methods: {
			// 分页
			getBjList( lx,dj,stationType) {
				this.$api.monitor({
					url: `/api/home/data/warn/history?lx1=${lx}&dj=${dj}&stationType=${stationType}`
				}).then(res => {
					if (res.data.rows) {
						// console.log(res.data);
						this.bjList = this.bjList.concat(res.data.rows)
						// if (res.data.rows.length < pageSize) { //判断接口返回数据量小于请求数据量，则表示此为最后一页
						// 	this.isLoadMore = true
						// 	this.loadStatus = 'nomore'
						// 	uni.showToast({
						// 		title: '没有更多数据了！',
						// 		icon: 'none'
						// 	})
						// } else {
						// 	this.isLoadMore = false
						// }
					} else {
						// this.isLoadMore = true
						// this.loadStatus = 'nomore'
					}
				}, err => {
					uni.showToast({
						title: '服务器忙，请您稍后再试',
						icon: 'none'
					})
					// this.isLoadMore = false
					// if (this.page > 1) {
					// 	this.page -= 1
					// }
				})
			},

			// 查询
			getBjList2( lx,dj,stationType) {
				this.$api.monitor({
					url: `/api/home/data/warn/history?lx1=${lx}&dj=${dj}&stationType=${stationType}`
				}).then(res => {
					if (res.data.rows) {
						this.bjList = res.data.rows
						// if (res.data.rows.length < pageSize) { //判断接口返回数据量小于请求数据量，则表示此为最后一页
						// 	this.isLoadMore = true
						// 	this.loadStatus = 'nomore'
						// } else {
						// 	this.isLoadMore = false
						// }
					} else {
						// this.isLoadMore = true
						// this.loadStatus = 'nomore'
					}
				}, err => {
					uni.showToast({
						title: '服务器忙，请您稍后再试',
						icon: 'none'
					})
				})
			},
			async qyList() {
				const {
					data: res
				} = await this.$api.request({
					url: '/system/dict/data/type/org_xzb'
				})
				let arr = []
				for (let item of res.data) {
					arr.push({
						text: item.dictLabel,
						value: item.dictValue
					})
				}
				arr.unshift({
					text: '所属区域',
					value: ''
				})
				this.filterData[0] = arr
			},
			ed(res) {
				// console.log(res);
				// console.log(res[0][0].value, res[0][0].text)
				// console.log(res[1][0].value, res[1][0].text)
				// console.log(res[2][0].value, res[2][0].text)
				this.bjList = []
				this.query.lx1 = res[1][0].value
				this.query.dj = res[2][0].value
				this.query.stationType = res[0][0].value
				this.getBjList2(this.query.lx1,this.query.dj,this.query.stationType)
			},
			dateChange(d) {
				console.log(d);
				// uni.showToast({
				// 	icon: 'none',
				// 	title: d
				// })
			}
		},
		async onPullDownRefresh() {
			await this.getBjList2(this.query.lx1,this.query.dj,this.query.stationType)

			await uni.stopPullDownRefresh();
		}
	
	}
</script>

<style lang="scss" scoped>
	.line {
		// position: absolute;
		// top: 110rpx;
		height: 16rpx;
		width: 750rpx;
		background-color: #efefef;
	}

	.root {
		height: 110rpx;
	}
</style>
