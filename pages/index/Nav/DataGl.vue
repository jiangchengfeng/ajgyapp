<template>
	<view class="datagl">
		<view class="con">
			<view class="con_top">
				<view class="ct_left">
					<image src="../../../static/index/data.png" mode=""></image>
					<text>污水监测</text>
				</view>
				<view class="ct_right">
					<view :class="[activeTab==i?'active_item':'','item']" @click="tabClick(i)"
						v-for="(item,i) in tabList1" :key="item">{{item}}</view>
				</view>
			</view>
			<view class="con_bottom">
				<view class="item" v-for="item in dataList" :key="item.name">
					<view class="val" :style="{'color':item.color}">{{item.val}}</view>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="con">
			<view class="con_top">
				<view class="ct_left">
					<image src="../../../static/index/data.png" mode=""></image>
					<text>雨水监测</text>
				</view>
				<view class="ct_right">
					<view :class="[activeTab2==i?'active_item':'','item']" @click="tabClick2(i)"
						v-for="(item,i) in tabList" :key="item">{{item}}</view>
				</view>
			</view>
			<view class="con_bottom">
				<view class="item" v-for="item in dataList2" :key="item.name">
					<view class="val" :style="{'color':item.color}">{{item.val}}</view>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList1: ['液位计', '智能井盖', '流量计'],
				tabList: ['液位计', '智能井盖', '流量计','积水点'],
				// tabList2: ['液位监测', '井盖监测', '流量监测'],
				activeTab: 0,
				activeTab2: 0,
				dataList: [{
						name: '监测点总数',
						val: 0,
						color: '#044c7a'
					},
					{
						name: '正常设备数',
						val: '0',
						color: '#009820'
					},
					{
						name: '离线设备数',
						val: 0,
						color: '#cb6400'
					},
					// {name: '当日报警',val: 0,color:'#cb6400'},
					{
						name: '报警总数',
						val: 0,
						color: '#cb6400'
					},
				],
				dataList2: [{
						name: '监测点总数',
						val: 0,
						color: '#044c7a'
					},
					{
						name: '正常设备数',
						val: '0',
						color: '#009820'
					},
					{
						name: '离线设备数',
						val: 0,
						color: '#cb6400'
					},
					// {name: '当日报警',val: 0,color:'#cb6400'},
					{
						name: '报警总数',
						val: 0,
						color: '#cb6400'
					},
				],
			}
		},
		created() {
			this.tabClick(0)
			this.tabClick2(0)
		},
		methods: {
			//  获取液位监测数据
			getLevelList() {
				this.dataList = [{
						name: '监测点总数',
						val: 0,
						color: '#044c7a'
					},
					{
						name: '正常设备数',
						val: '0',
						color: '#009820'
					},
					{
						name: '离线设备数',
						val: 0,
						color: '#cb6400'
					},
					// {name: '当日报警',val: 0,color:'#cb6400'},
					{
						name: '报警总数',
						val: 0,
						color: '#cb6400'
					}
				]
				this.$api.monitor({
					url: '/api/home/data/devReal/nowdata?type=污水井'
				}).then(res => {
					this.dataList[0].val = res.data.total
					this.dataList[2].val = res.data.offlineTotal
					this.dataList[1].val = res.data.regularTotal
					// this.dataList[3].val = res.data.warnTotal
					this.$api.monitor({
						url: `/api/home/data/warn/history?lx1=液位计&stationType=1`
					}).then(res => {
						this.dataList[3].val = res.data.total
					})
				})
			},
			getLevelListYs() {
				this.dataList2 = [{
						name: '监测点总数',
						val: 0,
						color: '#044c7a'
					},
					{
						name: '正常设备数',
						val: '0',
						color: '#009820'
					},
					{
						name: '离线设备数',
						val: 0,
						color: '#cb6400'
					},
					{
						name: '报警总数',
						val: 0,
						color: '#cb6400'
					}
				]
				this.$api.monitor({
					url: '/api/home/data/devReal/nowdata?type=雨水井'
				}).then(res => {
					this.dataList2[0].val = res.data.total
					this.dataList2[2].val = res.data.offlineTotal
					this.dataList2[1].val = res.data.regularTotal
					// this.dataList2[3].val = res.data.warnTotal
					this.$api.monitor({
						url: `/api/home/data/warn/history?lx1=液位计&stationType=2`
					}).then(res => {
						this.dataList2[3].val = res.data.total
					})
				})
			},

			getWellList() {
				this.dataList = [{
						name: '监测点总数',
						val: 0,
						color: '#044c7a'
					},
					{
						name: '正常设备数',
						val: '0',
						color: '#009820'
					},
					{
						name: '离线设备数',
						val: 0,
						color: '#cb6400'
					},
					// {name: '当日报警',val: 0,color:'#cb6400'},
					{
						name: '报警总数',
						val: 0,
						color: '#cb6400'
					}
				]
				this.$api.monitor({
					url: '/api/home/data/station/znjg?type=污水井'
				}).then(res => {
					this.dataList[0].val = res.data.total
					this.dataList[2].val = res.data.offlineTotal
					this.dataList[1].val = res.data.regularTotal
					// this.dataList[3].val = res.data.warnTotal
					this.$api.monitor({
						url: `/api/home/data/warn/history?lx1=智能井盖&stationType=1`
					}).then(res => {
						
						this.dataList[3].val = res.data.total
					})
				})
			},
			getWellListYs() {
				this.dataList2 = [{
						name: '监测点总数',
						val: 0,
						color: '#044c7a'
					},
					{
						name: '正常设备数',
						val: '0',
						color: '#009820'
					},
					{
						name: '离线设备数',
						val: 0,
						color: '#cb6400'
					},
					{
						name: '报警总数',
						val: 0,
						color: '#cb6400'
					}
				]
				this.$api.monitor({
					url: '/api/home/data/station/znjg?type=雨水井'
				}).then(res => {
					this.dataList2[0].val = res.data.total
					this.dataList2[2].val = res.data.offlineTotal
					this.dataList2[1].val = res.data.regularTotal
					// this.dataList2[3].val = res.data.warnTotal
					this.$api.monitor({
						url: `/api/home/data/warn/history?lx1=智能井盖&stationType=2`
					}).then(res => {
						
						this.dataList2[3].val = res.data.total
					})
				})
			},

			getFlowList() {
				this.dataList = [{
						name: '监测点总数',
						val: 0,
						color: '#044c7a'
					},
					{
						name: '正常设备数',
						val: '0',
						color: '#009820'
					},
					{
						name: '离线设备数',
						val: 0,
						color: '#cb6400'
					},
					// {name: '当日报警',val: 0,color:'#cb6400'},
					{
						name: '报警总数',
						val: 0,
						color: '#cb6400'
					}
				]
				this.$api.monitor({
					url: '/api/home/data/station/zc_fl_rg?type=污水井'
				}).then(res => {
					// 
					this.dataList[0].val = res.data.total
					this.dataList[2].val = res.data.offlineTotal
					this.dataList[1].val = res.data.regularTotal
					// this.dataList[3].val = res.data.warnTotal
					this.$api.monitor({
						url: `/api/home/data/warn/history?lx1=流量计&stationType=1`
					}).then(res => {
						this.dataList[3].val = res.data.total
					})
				})
			},
			getFlowListYs() {
				this.dataList2 = [{
						name: '监测点总数',
						val: 0,
						color: '#044c7a'
					},
					{
						name: '正常设备数',
						val: '0',
						color: '#009820'
					},
					{
						name: '离线设备数',
						val: 0,
						color: '#cb6400'
					},
					// {name: '当日报警',val: 0,color:'#cb6400'},
					{
						name: '报警总数',
						val: 0,
						color: '#cb6400'
					}
				]
				this.$api.monitor({
					url: '/api/home/data/station/zc_fl_rg?type=雨水井'
				}).then(res => {
					this.dataList2[0].val = res.data.total
					this.dataList2[2].val = res.data.offlineTotal
					this.dataList2[1].val = res.data.regularTotal
					this.$api.monitor({
						url: `/api/home/data/warn/history?lx1=流量计&stationType=2`
					}).then(res => {
						this.dataList2[3].val = res.data.total
					})
				})
			},
			
			getJsList() {
				this.dataList = [{
						name: '监测点总数',
						val: 0,
						color: '#044c7a'
					},
					{
						name: '正常设备数',
						val: '0',
						color: '#009820'
					},
					{
						name: '离线设备数',
						val: 0,
						color: '#cb6400'
					},
					// {name: '当日报警',val: 0,color:'#cb6400'},
					{
						name: '报警总数',
						val: 0,
						color: '#cb6400'
					}
				]
				this.$api.monitor({
					url: '/api/home/data/station/zc_fl_jsd?type=污水井'
				}).then(res => {
					
					// this.dataList[0].val = res.data.total
					// this.dataList[2].val = res.data.offlineTotal
					// this.dataList[1].val = res.data.regularTotal
					this.dataList[0].val = 0
					this.dataList[2].val = 0
					this.dataList[1].val = 0
					// this.dataList[3].val = res.data.warnTotal
					this.$api.monitor({
						url: `/api/home/data/warn/history?lx1=积水点&stationType=1`
					}).then(res => {
						this.dataList[3].val = 0
					})
				})
			},
			getJsListYs() {
				this.dataList2 = [{
						name: '监测点总数',
						val: 0,
						color: '#044c7a'
					},
					{
						name: '正常设备数',
						val: '0',
						color: '#009820'
					},
					{
						name: '离线设备数',
						val: 0,
						color: '#cb6400'
					},
					// {name: '当日报警',val: 0,color:'#cb6400'},
					{
						name: '报警总数',
						val: 0,
						color: '#cb6400'
					}
				]
				this.$api.monitor({
					url: '/api/home/data/station/zc_fl_jsd?type=雨水井'
				}).then(res => {
					
					this.dataList2[0].val = res.data.total
					this.dataList2[2].val = res.data.offlineTotal
					this.dataList2[1].val = res.data.regularTotal
					this.$api.monitor({
						url: `/api/home/data/warn/history?lx1=积水点&stationType=2`
					}).then(res => {
						this.dataList2[3].val = res.data.total
					})
				})
			},
			
			tabClick(i) {
				this.activeTab = i
				switch (i) {
					case 0:
						this.getLevelList()
						break;
					case 1:
						this.getWellList()
						break;
					case 2:
						this.getFlowList()
						break;
						case 3:
							this.getJsList()
							break;
					default:
						break;
				}
			},
			tabClick2(i) {
				this.activeTab2 = i
				switch (i) {
					case 0:
						this.getLevelListYs()
						break;
					case 1:
						this.getWellListYs()
						break;
					case 2:
						this.getFlowListYs()
						break;
						case 3:
							this.getJsListYs()
							break;
					default:
						break;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.datagl {
		background-color: #fff;
		padding: 20rpx;
		// padding-top:0;
		padding-bottom: none;

		.con {
			box-sizing: border-box;
			width: 710rpx;
			margin: 0 auto;
			padding: 10rpx;
			box-shadow: 0px 2px 5px 0 #eee;
			border-radius: 16rpx;

			.con_top {
				display: flex;
				line-height: 72rpx;
				align-items: center;

				.ct_left {
					image {
						width: 28rpx;
						height: 26rpx;
						vertical-align: middle;
						margin-bottom: 6rpx;
					}

					text {
						font-size: 28rpx;
						margin: 0 10rpx;
					}
				}

				.ct_right {
					flex: 1;
					display: flex;
					line-height: 48rpx;

					.item {
						flex: 1;
						text-align: center;
						font-size: 24rpx;
					}

					.active_item {
						color: #195c90;
						font-weight: 700;
						box-shadow: 0px 0px 1px 0px #ddd;
						background-color: #eee;
					}
				}

			}

			.con_bottom {
				display: flex;

				.item {
					position: relative;
					flex: 1;
					text-align: center;
					line-height: 48rpx;
					font-size: 24rpx;

					&::after {
						content: '';
						position: absolute;
						width: 2rpx;
						height: 60rpx;
						top: 18rpx;
						right: 0;
						background-color: #eee;
					}

					&:last-child {
						&::after {
							display: none;
						}
					}

					.val {
						font-size: 32rpx;
						color: #044c7a;
					}
				}

			}
		}
	}
</style>
