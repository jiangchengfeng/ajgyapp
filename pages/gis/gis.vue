<template>
	<view>
		<view class="map">
			<MapContainer ref="refMap"></MapContainer>
<!-- 			<view class="nav">
				<button type="default" size="mini" class="btn" @tap="handleRemoveAll">清空</button>
				<button type="default" size="mini" :class="[ywjShow ? 'activeBtn' : '', 'btn']" @tap="getYwj2">液位计</button>
				<button type="default" size="mini":class="[jgShow ? 'activeBtn' : '', 'btn']" @tap="getJg2">智能井盖</button>
				<button type="default" size="mini" :class="[lljShow ? 'activeBtn' : '', 'btn']" @tap="getLlj2">流量计</button>
				<button type="default" size="mini" :class="[jsdShow ? 'activeBtn' : '', 'btn']" @tap="getJsd2">积水点</button>
			</view> -->
			<view class="fl">
				<button type="default" size="mini" :class="[activeBtn == 1 ? 'activeBtn' : '', 'btnws']" @tap="getWs">污水</button>
				<button type="default" size="mini" :class="[activeBtn == 2 ? 'activeBtn' : '', 'btnys']" @tap="getYs">雨水</button>
			</view>
		</view> 
		<view class="con_bottom">
			<u-tr class="u-tr">
				<u-th class="u-th" style="">标题</u-th>
				<u-th class="u-th" >阈值</u-th>
				<u-th class="u-th">报警值</u-th>
				<u-th class="u-th" style="flex: 1.5;">时间</u-th>
				<u-th class="u-th" style="flex: 1.8;">持续时间</u-th>
				<!-- <u-th class="u-th">定位</u-th> -->
			</u-tr>
			<u-tr class="u-tr" v-for="(item,i) in bjList" :key="item.jcdmc" :style="{'backgroundColor':activeBg == i ? '#FF6A6A':''}">
				<u-td @click="handleMarker3(item,i)" :style="{'color':activeBg == i ? '#fff':''}" class="u-td" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; ">
					{{item.jcdmc}}
				</u-td>
				<u-td class="u-td" :style="{'color':activeBg == i ? '#fff':''}"><text @click="handleMarker3(item,i)">{{item.yz || '-'}} </text></u-td>
				<u-td class="u-td" :style="{'color':activeBg == i ? '#fff':''}"><text @click="handleMarker3(item,i)">{{item.bjz|| '-'}}</text></u-td>
				<u-td class="u-td" :style="{'color':activeBg == i ? '#fff':''}" style="flex: 1.5;"><text @click="handleMarker3(item,i)">{{item.bjsj}}</text></u-td>
				<u-td class="u-td" :style="{'color':activeBg == i ? '#fff':''}" style="flex: 1.8;"><text @click="handleMarker3(item,i)">{{item.cxsj}}</text></u-td>
				<!-- <u-td class="u-td" style="position: relative;"><text class="status">{{item.zt}}</text></u-td> -->
<!-- 				<u-td class="u-td"><text @click="handleMarker3(item,i)">
						<u-icon name="map" size="40"></u-icon>
					</text></u-td> -->
			</u-tr>
		</view>
		<view v-if="bjList == false" style="margin-top: 400rpx;margin: 40rpx auto;text-align: center;color: #888;">
			暂无数据
		</view>

		<!-- <view id="map" style="width: 100vw;height:50vh"></view> -->
	</view>
</template>


<script >
	import MapContainer from './map/map.vue'
	
	export default {
		components: {
			MapContainer
		},
		data() {
			return {
				activeBg:999,
				bjList: [],
				ywjShow: true,
				jgShow: false,
				lljShow: false,
				jsdShow: false,
				activeBtn:1,
			}
		},
		mounted() {
			// this.getYwj2()
			this.getWsBj()
		},
		methods: {
			getWsBj() {
					this.activeBg = 999
					this.handleRemoveAll()
					this.$api.monitor({
						url: `/api/home/data/warn/history?stationType=1`
					}).then(res => {
						this.bjList = []
						this.bjList = res.data.rows
					})
			},
			getYsBj() {
					this.activeBg = 999
					this.handleRemoveAll()
					this.$api.monitor({
						url: `/api/home/data/warn/history?stationType=2`
					}).then(res => {
						this.bjList = []
						this.bjList = res.data.rows
					})
			},
			getWs(){
				this.activeBtn = 1
				this.getWsBj()
				// if(this.ywjShow == true){
				// 	this.getYwj('1')
				// }else if(this.jgShow == true){
				// 	this.getJg('1')
				// }else if (this.lljShow == true) {
				// 	this.getLlj('1')
				// }else if (this.jsdShow == true) {
				// 	this.getJsd('1')
				// }
			},
			getYs(){
				this.activeBtn = 2
				this.getYsBj()
				// if(this.ywjShow == true){
				// 	this.getYwj('2')
				// }else if(this.jgShow == true){
				// 	this.getJg('2')
				// }else if (this.lljShow == true) {
				// 	this.getLlj('2')
				// }else if (this.jsdShow == true) {
				// 	this.getJsd('2')
				// }
			},
			getYwj2(){
				if(this.activeBtn == 1){
					this.getYwj('1')
				}else {
					this.getYwj('2')
				}
			},
			getJg2(){
				if(this.activeBtn == 1){
					this.getJg('1')
				}else {
					this.getJg('2')
				}
			},
			getLlj2(){
				if(this.activeBtn == 1){
					this.getLlj('1')
				}else {
					this.getLlj('2')
				}
			},
			getJsd2(){
				if(this.activeBtn == 1){
					this.getJsd('1')
				}else {
					this.getJsd('2')
				}
			},
			getYwj(type) {
					this.handleRemoveAll()
					this.ywjShow = true
					this.jgShow = false,
					this.lljShow = false,
					this.jsdShow = false,
					this.$api.monitor({
						url: `/api/home/data/warn/history?lx1=液位计&stationType=${type}`
					}).then(res => {
						this.bjList = []
						this.bjList = res.data.rows
					})
			},
			getJg(type) {
				this.handleRemoveAll()
					this.ywjShow = false
					this.jgShow = true,
					this.lljShow = false,
					this.jsdShow = false,
				this.$api.monitor({
					url: `/api/home/data/warn/history?lx1=智能井盖&stationType=${type}`
				}).then(res => {
					this.bjList = []
					this.bjList = res.data.rows
				})
			},
			getLlj(type) {
					this.ywjShow = false
					this.jgShow = false,
					this.lljShow = true,
					this.jsdShow = false,
				this.$api.monitor({
					url: `/api/home/data/warn/history?lx1=流量计&stationType=${type}`
				}).then(res => {
					this.bjList = []
					this.bjList = res.data.rows
				})
			},
			getJsd(type) {
					this.ywjShow = false
					this.jgShow = false,
					this.lljShow = false,
					this.jsdShow = true,
				this.$api.monitor({
					url: `/api/home/data/warn/history?lx1=积水点&stationType=${type}`
				}).then(res => {
					this.bjList = []
					this.bjList = res.data.rows
				})
			},
			showToast(text) {
				uni.showToast({
					icon: 'none',
					title: text
				})
			},
			handleMarker() {
				var latlng = {
					lat: 30.63664102701957,
					lng: 119.6825852313696
				}
				//回调函数只能传函数名称
				// 回调函数必须在组件的父页面实现
				this.$refs.refMap.handleMarker(latlng, 'handleMarkerClick', {
					msg: '这是handleMarker传过来的参数。'
				})
				setTimeout(() => {
					// 当执行多个地图操作时必须延迟执行否则没反应
					this.$refs.refMap.handlePanTo(latlng)
				}, 100)
			},

			handleMarker2() {
				var latlng = {
					lat: 30.637547013000074,
					lng: 119.67568143100004
				}
				this.$refs.refMap.handleMarker(latlng, 'handleMarkerClick', {
					msg: '这是handleMarker传过来的参数。'
				})
				setTimeout(() => {
					this.$refs.refMap.handlePanTo(latlng)
				}, 100)
			},

			handleMarker3(item,i) {
				this.activeBg = i
				console.log(item);
				this.$nextTick(res=>{
					this.$refs.refMap.handleMarker({
						lat: item.x,
						lng: item.y
					}, {
						popup: `<div class="myPopup">${item.jcdmc}</div>`
					}, 'handleMarkerClick', {
						msg: item
					})
					setTimeout(() => {
						// 当执行多个地图操作时必须延迟执行否则没反应
						this.$refs.refMap.handlePanTo({
							lat: item.x,
							lng: item.y
						})
					}, 100)
					setTimeout(() => {
						// 当执行多个地图操作时必须延迟执行否则没反应
						this.$refs.refMap.handleSetZoom(16)
					}, 500)
					this.handleMarkerClick(item)
				})
			},

			handleRemoveAll() {
				console.log(111);
				this.$refs.refMap.handleRemoveAll()
			},

			handleMarkerClick(obj) {
				// this.showToast(obj.msg)
				console.log(obj);
			},
		}
	
	}
</script>

<style lang="scss" scoped>
	.btnws {
		position: absolute;
		left: 20rpx;
		top: 180rpx;
		z-index: 999;
	}

	.btnys {
		position: absolute;
		left: 20rpx;
		top: 260rpx;
		z-index:999;
	}
	.map {
		position: fixed;
		top: 0rpx;
		width: 100%;
		height: 700rpx;
		z-index: 9;
	}

	.flex {
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.form-item {
		border: 1px solid #eee;
		padding: 5px;
	}

	.padding-xl {
		padding: 15px;
	}

	.con_bottom {
		margin-top: 750rpx;
		text-align: center;

		.u-tr {
			border-bottom: 2rpx solid #eee;
		}

		.u-th {
			font-size: 24rpx;
			line-height: 80rpx;
			background-color: #fefefe;

		}

		.u-td {
			font-size: 24rpx;
			line-height: 80rpx;
			height: 80rpx;
		}

		.status {
			position: absolute;
			height: 40rpx;
			line-height: 40rpx;
			width: 80%;
			top: 20rpx;
			left: 10%;
			color: #fff;
			background-color: #3dae12;
		}
	}

	.nav {
		position: absolute;
		bottom: 20rpx;
		// right: 20rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
		display: flex;
		justify-content: space-between;
		width: 710rpx;

		.btn {
			margin-left: 20rpx;
			font-size: 24rpx;
			padding: 0 20rpx;

			&:last-child {
				margin: 0;
			}
		}



	}
	.activeBtn {
		background-color: #3388FF !important;
		color: #fff !important;
	}
</style>
