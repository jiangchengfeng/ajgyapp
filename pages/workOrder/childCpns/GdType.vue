<template>
	<view class="gd">
		<view class="gd_box">
			<view class="gd_title">
				<view :class="[activeTab==i?'active_title':'','title']" @click="tabClick(i)" v-for="(item,i) in tabList"
					:key="item">{{item}}</view>
			</view>
		</view>
		<view class="gd_list">
			<view class="gd_item" v-for="item in 5">
				<view class="item_top">
					<view class="bh">
						<u-icon style="margin-top: 6rpx;" name="order" color="#195c90" size="28"></u-icon>
						<text style="color: #195c90;">工单编号：SYSYH21062401500035</text>
					</view>
					<view class="bz">
						<image src="../../../static/gd/bz.png" style="height: 27rpx;width: 30rpx;" mode=""></image>
						<text>工单班组：设备科巡检班组-公共账号</text>
					</view>
					<view class="r">
						<image src="../../../static/gd/r.png" style="height: 28rpx;width: 29rpx;" mode=""></image>
						<text>养护人：夏秋良 胡俊峰</text>
					</view>
				</view>
				<view class="item_bottom">
					<view class="r">
						<u-icon  name="clock" color="#838484"  size="28"></u-icon>
						<text>计划养护时间：2021-07-05</text>
					</view>
					<view class="r">
						<text>实际养护时间：2021-07-04</text>
					</view>
				</view>
				<view class="kk">
					<text>已养护</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: 0,
				tabList: ['养护工单', '维修工单', '巡检工单']
			}
		},
		methods: {
			tabClick(i) {
				this.activeTab = i
			}
		}
	}
</script>

<style lang="scss" scoped>
	.gd {
		position: relative;
		margin: 20rpx;
		.gd_box {
			position: fixed;
			top: 0px;
			left: 20rpx;
			right: 20rpx;
			z-index: 999;
			height: 80rpx; 
			background-color: #fff; 
		}
		.gd_title {
			display: flex;
			// height: 60rpx;
			margin-top: 20rpx;
			.title {
				flex: 1;
				line-height: 60rpx;
				// font-size: 24rpx;
				border-radius: 10rpx;
				text-align: center;
			}

			.active_title {
				color: #183f98;
				box-shadow: 0px -2px 5px 0 #eee;  
			}
		}

		.gd_list {
			margin-top: 60rpx;
			font-size: 24rpx;
			.gd_item { 
				position: relative;
				padding: 0 10rpx; 
				box-shadow: 0px 2px 5px 0 #eee;
				margin-bottom: 10rpx;
				border-radius: 16rpx;
				.item_top {
					padding: 20rpx 0;  
					line-height: 64rpx;
					text {
						margin-left: 10rpx;
					}
					image {
						vertical-align: middle;
					}
				}
				.item_bottom {
					line-height: 64rpx;
					display: flex;
					justify-content: space-between; 
					text {
						margin-left: 10rpx;
						vertical-align: middle; 
						color: #838484;
					}
					.u-icon {
						vertical-align: middle; 
						 margin-top:  6rpx ;
					}
				}
				.kk {
					position: absolute;
					right: 10rpx;
					top: 30rpx; 
					width: 100rpx;
					height: 64rpx; 
					line-height: 64rpx;
					font-size: 24rpx;
					text-align: center;
					color: #183f98;
					background-image: url(../../../static/gd/kk.png);
					transform: rotate(45deg);

				}
			}
		}
	}
</style>
