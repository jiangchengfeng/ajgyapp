<template>
	<view class="monitor_con">
		<!-- 		<view class="monitor_title">
			<view :class="[activeTab==i?'active_title':'','title']" @click="tabClick(i)"
						v-for="(item,i) in tabList" :key="item">{{item}}</view>
		</view> -->
		<view class="monitor_list">
			<view class="monitor_item" v-for="item in monitorList" :key="item.id">
				<view class="item_top">
					<view class="t_left">
						<u-icon size="30" name="map"></u-icon>
						<text v-if="tabIndex == 4">{{item.mc}}</text>
						<text v-else>{{item.mc}}-{{item.xzq}}</text>
					</view>
					<view class="t_right">
						<u-icon size="30" name="clock"></u-icon>
						<text v-if="tabIndex == 4">{{item.ctime.slice(5,19)}}</text>
						<text v-else>{{item.ctime}}</text>
					</view>
				</view>

				<view class="item_bottom" v-if="tabIndex == 0">
					<view class="item">
						<view class="val" :class="item.isWarn?'cred':''">{{item.currVal || '-'}}</view>
						<view class="name" >液位（M）</view>
					</view>
					<view class="item">
						<view class="val">{{item.warnVal || '-'}}</view>
						<view class="name">警戒液位（M）</view>
					</view>
					<view class="item">
						<view class="val">{{item.p7 || '-'}}</view>
						<view class="name">距井口（M）</view>
					</view>
				</view>

				<view class="item_bottom" v-else-if="tabIndex == 1">
					<view class="item">
						<view class="val">{{item.p6 || '-'}}</view>
						<view class="name">电量（%）</view>
					</view>
					<view class="item">
						<view class="val">{{item.p2 || '-'}}</view>
						<view class="name">偏移度（°）</view>
					</view>
					<view class="item">
						<view class="" v-if="!item.isWarn">
							<view class="val" :class="item.currVal=='设备离线'?'ccred':''" v-if="item.currVal=='设备离线'">离线</view>
							<view class="val" :class="item.isWarn?'cred':'cgreen'" v-else>{{item.isWarn?'报警':'正常' || '-'}}</view>
						</view>
						<view class="" v-else>
							<view class="val" :class="item.isWarn?'cred':'cgreen'" >{{item.isWarn?'报警':'正常' || '-'}}</view>
						</view>
						<!-- <view class="val" :class="item.currVal=='设备离线'?'ccred':''" v-if="item.currVal=='设备离线'">离线</view>
						<view class="val" :class="item.isWarn?'cred':'cgreen'" v-else>{{item.isWarn?'报警':'正常' || '-'}}</view> -->
						<view class="name">状态</view>
					</view>
				</view>

				<view class="item_bottom" v-else-if="tabIndex == 2">
					<view class="item">
						<view class="val">{{item.currVal || '-'}}</view>
						<view class="name">瞬时流量（m³/h）</view>
					</view>
					<view class="item">
						<view class="val">{{item.p7 || '-'}}</view>
						<view class="name">液位</view>
					</view>
					<view class="item">
						<view class="val" :class="item.isWarn?'cred':'cgreen'">{{item.isWarn?'报警':'正常' || '-'}}</view>
						<view class="name">状态</view>
					</view>
				</view>

				<view class="item_bottom" v-else-if="tabIndex == 3">
					<view class="item">
						<view class="val" v-if="item.p1 != null">{{(item.p1 - 0).toFixed(2) || '-'}}</view>
						<view class="val" v-else> - </view>
						<view class="name">COD（mg/l）</view>
					</view>
					<view class="item">
						<view class="val" v-if="item.p2 != null">{{(item.p2 - 0).toFixed(2) || '-'}}</view>
						<view class="val" v-else> - </view>
						<view class="name">PH</view>
					</view>
					<view class="item">
						<view class="val" v-if="item.p3 != null">{{(item.p3 - 0).toFixed(2) || '-'}}</view>
						<view class="val" v-else> - </view>
						<view class="name">瞬时流量（m³/h）</view>
					</view>
					<view class="item">
						<view class="val" v-if="item.p4 != null">{{(item.p4- 0).toFixed(2) || '-'}}</view>
						<view class="val" v-else> - </view>
						<view class="name">液位（m）</view>
					</view>
					<view class="item">
						<view class="val" style="display: flex;justify-content: space-between;margin:0 20rpx;height: 48rpx;">
							<view  :class="[item.p5 == 1?'green':'',item.p5 == 0?'red':'','dian']"></view>
							<view :class="[item.p6 == 1?'green':'',item.p6 == 0?'red':'','dian']"></view>
							<view :class="[item.p7 == 1?'green':'',item.p7 == 0?'red':'','dian']"></view>
						</view>
						<view class="name">泵站状态</view>
					</view>
				</view>

				<view class="item_bottom" v-else-if="tabIndex == 4">
					<view class="item" v-for="item2 in item.val" style="width:33.33%;">
						<view class="val" style="text-align: left;">{{(item2.values - 0 ).toFixed(2) || '-'}}
							{{item2.dw}}</view>
						<view class="name" style="text-align: left;">{{item2.mc}}</view>
					</view>
				</view>

			</view>
		</view>
	
		<view v-if="monitorList == false" style="margin-top: 400rpx;margin: 0 auto;text-align: center;color: #888;">
			暂无数据
		</view>
	</view>
</template>

<script>
	export default {
		props: ['monitorList', 'tabIndex'],
	}
</script>

<style lang="scss" scoped>
	.monitor_con {
		// margin-top: 210rpx;
		margin-top: 300rpx;
		padding: 10rpx 20rpx;

		.monitor_title {
			display: flex;

			.title {
				// line-height: 60rpx;
				// font-size: 24rpx;
				padding: 16rpx 30rpx;
				margin-right: 40rpx;
				border-radius: 10rpx;
			}

			.active_title {
				color: #fff;
				background-color: #3d64ac;
			}
		}

		.monitor_list {

			.monitor_item {
				padding: 10rpx;
				padding-top: 0;
				margin-bottom: 10rpx;
				box-shadow: 0px 2px 5px 0 #eee;
				border-radius: 16rpx;

				.item_top {
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					line-height: 72rpx;
					border-bottom: 1rpx solid #f8f8f8;

					.t_left {
						text {
							color: #195c90;
						}
					}

					.t_right {}

					.u-icon {
						vertical-align: middle;
						margin-top: 6rpx;
					}

					text {
						margin: 8rpx;
						vertical-align: middle;
					}

				}

				.item_bottom {
					display: flex;
					// justify-content: space-between;
					flex-wrap: wrap;

					.item {
						width: 33.33%;
						position: relative;
						text-align: center;
						line-height: 48rpx;
						font-size: 24rpx;
						// margin: 0 36rpx;

						.val {
							color: #195c90;
							font-size: 28rpx;
						}
					}

				}
			}
		}
	}

	.dian {
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		background-color: transparent;
	}

	.red {
		background-color: red;
	}
	.cred {
		color: red !important;
		font-weight: 700;
	}
	.cgreen {
		color: lightgreen !important;
		font-weight: 700;
	}
	.ccred {
		color: grey !important;
		font-weight: 700;
	}

	.green {
		background-color: lightgreen;
	}
</style>
