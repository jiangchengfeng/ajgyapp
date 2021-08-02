<template>
	<view class="datagl">
		<view class="con">
			<view class="con_top">
				<view class="ct_left">
					<image src="../../../static/index/db.png" mode=""></image>
					<text>污水监测报警({{total1}})</text>
				</view>
				<view class="ct_right" @click="moreBj">更多></view>
			</view>
			<!-- 			<view class="con_bottom">
				<u-tr class="u-tr">
					<u-th class="u-th">标题</u-th>
					<u-th class="u-th">阈值</u-th>
					<u-th class="u-th">报警值</u-th>
					<u-th class="u-th" style="flex: 1.5;">时间</u-th>
					<u-th class="u-th" style="flex: 1.7;">持续时间</u-th>
				</u-tr>
				<u-tr class="u-tr" v-for="item in dbList">
					<u-td class="u-td" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; ">{{item.mc}}
					</u-td>
					<u-td class="u-td">{{item.yz || '-'}}</u-td>
					<u-td class="u-td" style="color:red">{{item.bjz|| '-'}}</u-td>
					<u-td class="u-td" style="flex: 1.5;">{{item.bjsj}}</u-td>
					<u-td class="u-td" style="flex: 1.7;">{{item.cxsj}}</u-td>
				</u-tr>
			</view>
		 -->
			<view class="alert_item" v-for="(item,i) in dbList" :key="item.id">
				<view class="item_top">
					<view class="l">
						<text class="jb">{{i+1}}</text>
						<text class="lx">{{item.lx1}}-{{item.jcdmc}}</text>
					</view>
					<view class="btn">{{item.jcdwz}}</view>
				</view>
				<view class="item_bottom">
					<view class="context">
						<view class="txt"  style="flex: 1.2;font-size: 24rpx;">
							<text>报警内容：</text>
							<text style="color:#a40000;">{{item.warnDesc}}</text>
						</view>
	
						<view class="txt" style="flex: 1;font-size: 24rpx;">
							<text>持续时间：</text>
							<text>{{item.cxsj}} </text>
						</view>
					</view>
					<view class="time">
						<u-icon size="30" name="clock"></u-icon>
						<text>{{item.bjsj}}</text>
					</view>
				</view>
			</view>
			
			<view v-if="dbList == false" style="text-align: center;color: #888;line-height: 64rpx;">暂无数据</view>
		</view>
		<view class="con">
			<view class="con_top">
				<view class="ct_left">
					<image src="../../../static/index/db.png" mode=""></image>
					<text>雨水监测报警({{total2}})</text>
				</view>
				<view class="ct_right" @click="moreBj">更多></view>
			</view>
			<!-- 			<view class="con_bottom">
				<u-tr class="u-tr">
					<u-th class="u-th">标题</u-th>
					<u-th class="u-th">阈值</u-th>
					<u-th class="u-th">报警值</u-th>
					<u-th class="u-th" style="flex: 1.5;">时间</u-th>
					<u-th class="u-th" style="flex: 1.7;">持续时间</u-th>
				</u-tr>
				<u-tr class="u-tr" v-for="item in dbList2">
					<u-td class="u-td" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; ">{{item.mc}}
					</u-td>
					<u-td class="u-td">{{item.yz || '-'}}</u-td>
					<u-td class="u-td" style="color:red">{{item.bjz|| '-'}}</u-td>
					<u-td class="u-td" style="flex: 1.5;">{{item.bjsj}}</u-td>
					<u-td class="u-td" style="flex: 1.7;">{{item.cxsj}}</u-td>
				</u-tr>
			</view>
		 -->
			<view class="alert_item" v-for="(item,i) in dbList2" :key="item.id">
				<view class="item_top">
					<view class="l">
						<text class="jb">{{i+1}}</text>
						<text class="lx">{{item.lx1}}-{{item.jcdmc}}</text>
					</view>
					<view class="btn">{{item.jcdwz}}</view>
				</view>
				<view class="item_bottom">
					<view class="context">
						<view class="txt" style="flex: 1.1;font-size: 24rpx;">
							<text>报警内容：</text>
							<text style="color:#a40000;">{{item.warnDesc}}</text>
						</view>
						<view class="txt" style="flex: 1;font-size: 24rpx;">
							<text>持续时间：</text>
							<text>{{item.cxsj}} </text>
						</view>
					</view>
					<view class="time">
						<u-icon size="30" name="clock"></u-icon>
						<text>{{item.bjsj}}</text>
					</view>
				</view>
			</view>
			<view v-if="dbList2 == false" style="text-align: center;color: #888;line-height: 64rpx;">暂无数据</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: ['dbList', 'dbList2','total1','total2'],
		methods: {
			moreBj() {
				this.$emit('moreBj')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.alert_item {
		padding: 10rpx;
		box-shadow: 0px 2px 5px 0 #eee;
		border-radius: 16rpx;
		margin-bottom: 10rpx;

		.item_top {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.l {
				.jb {
					padding: 0 10rpx;
					border-radius: 10rpx;
					background-color: #3d64ac;
					color: #fff;
					margin-right: 40rpx;
				}

				.lx {
					color: #3d64ac;
				}
			}

			.btn {
				float: right;
				padding: 10rpx 20rpx;
				// background-color: #a40000;
				color: #333;
				border-radius: 10rpx;
			}
		}

		.item_bottom {
			.context {
				display: flex;
				justify-content: space-between;
				border-bottom: 1rpx solid #F8F8F8;
			}

			.txt {
				line-height: 64rpx;
				color: #616161;

				text {

					&:first-child {
						display: inline-block;
						width: 140rpx;
					}
				}
			}

			.time {
				line-height: 64rpx;
				color: #838484;

				.u-icon {
					margin-right: 10rpx;
					vertical-align: middle;
					margin-top: 6rpx;
				}

				text {
					vertical-align: middle;
				}
			}

		}
	}

	.datagl {
		background-color: #fff;
		padding: 20rpx;
		padding-top: 0;
		padding-bottom: none;

		.con {
			box-sizing: border-box;
			width: 710rpx;
			margin: 0 auto;
			padding: 0 10rpx;
			box-shadow: 0px 2px 5px 0 #eee;
			border-radius: 16rpx;
			margin-bottom: 20rpx;

			.con_top {
				display: flex;
				justify-content: space-between;
				line-height: 90rpx;
				align-items: center;

				.ct_left {
					image {
						width: 28rpx;
						height: 28rpx;
						vertical-align: middle;
						margin-bottom: 6rpx;
					}

					text {
						font-size: 32rpx;
						margin: 0 10rpx;
					}
				}

				.ct_right {
					color: #195c90;
					font-size: 28rpx;
				}

			}

			.con_bottom {
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
		}
	}
</style>
