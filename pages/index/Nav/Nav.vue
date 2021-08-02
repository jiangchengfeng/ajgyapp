<template>
	<view class="hNav">
		<view style="display: flex; width: 100%;position: relative;">
			<view class="num" v-if="dbnum != 0">{{dbnum}}</view>
			<view class="hNavItem" @click="toNav1">
				<image src="../../../static/index/wddb.png" mode="aspectFit"></image>
				<view class="hNavItemText">我的待办</view>
			</view>
			<view class="hNavItem" @click="toNav2">
				<image src="../../../static/index/ssjk.png" mode="aspectFit"></image>
				<view class="hNavItemText">实时监测</view>
			</view>
			<view class="hNavItem" @click="toNav3">
				<image src="../../../static/index/xj.png" mode="aspectFit"></image>
				<view class="hNavItemText">巡检养护</view>
			</view>
			<view class="hNavItem" @click="toNav4">
				<image src="../../../static/index/yh.png" mode="aspectFit"></image>
				<view class="hNavItemText">事件上报</view>
			</view>
		</view>
<!-- 		<view style="display: flex; width: 100%;position: relative;">
			<view class="hNavItem" @click="toNav5">
				<image src="../../../static/index/map.png" mode="aspectFit"></image>
				<view class="hNavItemText">地图展示</view>
			</view>
			<view class="hNavItem" @click="toNav6">
				<image src="../../../static/index/zc.png" mode="aspectFit"></image>
				<view class="hNavItemText">资产信息</view>
			</view>
			<view class="hNavItem" @click="toNav7">
				<image src="../../../static/index/bj.png" mode="aspectFit"></image>
				<view class="hNavItemText">报警信息</view>
			</view>
			<view class="hNavItem" @click="toNav8">
				<image src="../../../static/index/event.png" mode="aspectFit"></image>
				<view class="hNavItemText">事件上报</view>
			</view>
		</view>
	 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			dbnum: Number,
			xjnum: Number,
			wxnum: Number,
			yhnum: Number,
			xxsbnum: Number,
			szjcnum: Number,
		},
		methods: {
			toNav1() {
				uni.navigateTo({
					url: '/pages/wddb/wddb'
				});
			},
			toNav2() {
				uni.switchTab({
					url: '/pages/monitor/monitor'
				});
			},
			toNav3() {
				uni.navigateTo({
					url: '/pages/workOrder/workOrder'
				});
			},
			toNav4() {
				uni.navigateTo({
					url: '/pages/orderReport/orderReport'
				});
			},
			toNav5() {
				// uni.navigateTo({
				// 	url: '/pages/nwxc/nwxc'
				// });
			},
			toNav6() {
				// uni.navigateTo({
				// 	url: '/pages/bzxc/bzxc'
				// });
			},
			toNav7() {
				uni.switchTab({
					url: '/pages/alert/alert'
				});
			},
			toNav8() {
				uni.navigateTo({
					url: '/pages/orderReport/orderReport'
				});
			},
		}
	}
</script>

<style>
	.hNav {
		padding: 40rpx 20rpx; 
		background-color: #fff;
	}

	.hNavItem {
		flex: 1;
		text-align: center;
		padding: 20rpx 0;
	}

	.hNavItem>image {
		width: 80rpx;
		height: 80rpx;
	}

	.hNavItemText {
		font-size: 24rpx;
	}

	.num {
		position: absolute;
		top: 16rpx;
		left: 100rpx;
		width: 36rpx;
		line-height: 40rpx;
		border-radius: 50%;
		background-color: red;
		color: #fff;
		font-size: 12px;
		text-align: center;
		z-index: 99;
	}

	.xjnum {
		position: absolute;
		top: 16rpx;
		left: 100rpx;
		width: 36rpx;
		line-height: 40rpx;
		border-radius: 50%;
		background-color: red;
		color: #fff;
		font-size: 12px;
		text-align: center;
		z-index: 99;
	}

	,
	.yhnum {
		position: absolute;
		top: 16rpx;
		left: 242rpx;
		width: 36rpx;
		line-height: 40rpx;
		border-radius: 50%;
		background-color: red;
		color: #fff;
		font-size: 12px;
		text-align: center;
		z-index: 99;
	}

	.wxnum {
		position: absolute;
		top: 16rpx;
		left: 420rpx;
		width: 36rpx;
		line-height: 40rpx;
		border-radius: 50%;
		background-color: red;
		color: #fff;
		font-size: 12px;
		text-align: center;
		z-index: 99;
	}

	.szjcnum {
		position: absolute;
		top: 16rpx;
		left: 456rpx;
		width: 36rpx;
		line-height: 40rpx;
		border-radius: 50%;
		background-color: red;
		color: #fff;
		font-size: 12px;
		text-align: center;
		z-index: 99;
	}

	,
	.xxsbnum {
		position: absolute;
		top: 16rpx;
		left: 278rpx;
		width: 36rpx;
		line-height: 40rpx;
		border-radius: 50%;
		background-color: red;
		color: #fff;
		font-size: 12px;
		text-align: center;
		z-index: 99;
	}

</style>
