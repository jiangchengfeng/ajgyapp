<template>
	<view style="position: relative;">
		<view class="fixed">
			<view class="search">
				<uni-search-bar @confirm="search" @input="input" @blur="blur" @cancel="cancel" @clear="clear"
					placeholder="请输入关键字"></uni-search-bar>
			</view>
			<view class="line"></view>
			<view class="wsys">
				<view :class="[wsysBtn==1?'active_title':'','title']" @click="getWs">污水</view>
				<view style="margin-left: 60rpx;" :class="[wsysBtn==2?'active_title':'','title']" @click="getYs">雨水</view>
			</view>
			<view class="monitor_title">
				<view :class="[activeTab==i?'active_title':'','title']" @click="tabClick(i)" v-for="(item,i) in tabList"
					:key="item">{{item}}</view>
			</view>
		</view>
		<m-list :monitorList=monitorList :tabIndex="activeTab" />
	</view>
</template>

<script>
	import MList from './childCpns/MList.vue'
	export default {
		data() {
			return {
				activeTab: 0,
				tabList: ['液位', '井盖', '流量', '泵站', '污水厂'],
				// tabList: ['液位', '井盖', '流量'],
				monitorList: [],
				wsysBtn:1,
			}
		},
		components: {
			MList
		},
		onLoad() {
			this.tabClick(0)
		},
		methods: {
			getWs(){
				this.wsysBtn = 1
				this.tabClick(this.activeTab)
			},
			getYs(){
				this.wsysBtn = 2
				this.tabClick(this.activeTab)
			},
			//  获取液位监测数据 
			getLevelList(type) {
				this.$api.monitor({
					url: `/api/home/data/devReal/nowdata?type=${type}`
				}).then(res => {
					this.monitorList = []
					this.monitorList = res.data.rows
				})
			},

			getWellList(type) {
				this.$api.monitor({
					url: `/api/home/data/station/znjg?type=${type}`
				}).then(res => {
					this.monitorList = []
					this.monitorList = res.data.rows
				})
			},
			getFlowList(type) {
				this.$api.monitor({
					url: `/api/home/data/station/zc_fl_rg?type=${type}`
				}).then(res => {
					this.monitorList = []
					this.monitorList = res.data.rows
				})
			},

			getWscList() {
				this.$api.monitor({
					url: '/api/home/data/station/nowdata?station=wsc_jy'
				}).then(res => {
					let ctime = res.data.wsc_jy[0]['ctime']
					// console.log(ctime);
					this.$api.monitor({
						url: '/api/home/data/station/nowdata?station=wsc_qy'
					}).then(res2 => {
						let ctime2 = res2.data.wsc_qy[0]['ctime']
						this.monitorList = []
						this.monitorList = [{
							mc: '城北污水厂',
							val: res.data.wsc_jy,
							ctime: ctime
						}, {
							mc: '天子湖污水厂',
							val: res2.data.wsc_qy,
							ctime: ctime2
						}]
					})
				})
			},

			getBzList() {
				this.$api.monitor({
					url: '/api/home/data/allbz/nowdata?station=zc_fl_bz'
				}).then(res => {
					// console.log(res.data.rows);
					this.monitorList = []
					this.monitorList = res.data.rows
				})
			},

			tabClick(i) {
				this.activeTab = i
				if(this.wsysBtn == 1){
					switch (i) {
						case 0:
							this.getLevelList('污水井')
							break;
						case 1:
							this.getWellList('污水井')
							break;
						case 2:
							this.getFlowList()
							break;
						case 3:
							this.getBzList()
							break;
						case 4:
							this.getWscList()
							break;
						default:
							break;
					}
				}
				if(this.wsysBtn == 2){
					switch (i) {
						case 0:
							this.getLevelList('雨水井')
							break;
						case 1:
							this.getWellList('雨水井')
							break;
						case 2:
							this.getFlowList()
							break;
						case 3:
							this.getBzList()
							break;
						case 4:
							this.getWscList()
							break;
						default:
							break;
					}
				}
			},

			search(e) {},
			input(e) {},
			blur(e) {},
			cancel() {},
			clear() {},

		},
		async onPullDownRefresh() {
			await this.tabClick(this.activeTab)
			await uni.stopPullDownRefresh();
		}
	}
</script>

<style lang="scss" scoped>
	// uni-searchbar__box
	.wsys {
		padding: 10rpx 20rpx;
		display: flex;
		border-bottom: 1rpx solid #F8F8F8;
		// justify-content: space-between;
	}

	.fixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		// height: 210rpx;
		height: 300rpx;
		background-color: #fff;
	}

	.line {
		height: 16rpx;
		width: 100%;
		background-color: #efefef;
	}

	.monitor_title {
		padding: 10rpx 20rpx;
		display: flex;
		border-bottom: 1rpx solid #F8F8F8;
		justify-content: space-between;

		// background-color: #fff;

	}
	.title {
		// line-height: 60rpx;
		// font-size: 24rpx;
		padding: 16rpx 20rpx;
		// margin-right: 40rpx;
		border-radius: 10rpx;
	}
	
	.active_title {
		color: #fff;
		background-color: #3d64ac;
	}
</style>
