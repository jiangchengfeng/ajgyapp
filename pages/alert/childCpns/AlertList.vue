<template>
	<view class="alert_list">
		<view class="alert_item" v-for="(item,i) in bjList">
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
	</view>
</template>

<script>
	export default {
		props: ['bjList'],
		created() {
			// this.getBjList()
		},
		methods: {
			// getBjList() {
			// 	this.$api.monitor({
			// 		url: `/api/home/data/warn/history?pageSize=${this.query.pageSize}&pageNum=${this.query.pageNum}&lx1=${this.query.lx1}`
			// 	}).then(res=>{
			// 		// console.log(res);
			// 		this.bjList = res.data.rows
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.alert_list {
		padding: 20rpx 20rpx;

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
					// color: #fff;
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
	}
</style>
