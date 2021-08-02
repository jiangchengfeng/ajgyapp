<template>
	<view>
		<view class="xjxqList">
			<view class="xjxqItem">
				<view class="itemTop">
					<text class="text1">标题：<text class="text2">{{(gdInfo.title)}}</text></text>
				</view>
				<view class="itemTop">
					<text class="text1">编号：<text class="text2">{{gdInfo.bh}}</text></text>
				</view>
				<view class="itemTop">
					<text class="text1">类型：<text class="text2">{{gdInfo.lxmc}}</text></text>
				</view>
				<view class="itemTop">
					<text class="text1">区域：<text class="text2">{{gdInfo.qymc}}</text></text>
				</view>
				<view class="itemTop">
					<text class="text1">来源：<text class="text2">{{(gdInfo.lymc)}}</text></text>
				</view>
				<view class="itemTop">
					<text class="text1">等级：<text class="text2">{{gdInfo.djmc}}</text></text>
				</view>
				<view class="itemTop">
					<text class="text1">x坐标：<text class="text2">{{gdInfo.x}}</text></text>
				</view>
				<view class="itemTop">
					<text class="text1">y坐标：<text class="text2">{{gdInfo.y}}</text></text>
				</view>
				<view class="itemTop">
					<text class="text1">地址：<text class="text2">{{gdInfo.address}}</text></text>
				</view>
				<view class="itemTop">
					<text class="text1">描述：<text class="text2">{{gdInfo.ms}}</text></text>
				</view>
				<view class="itemTop" style="margin-top:20rpx">
					<image :src="getSrc(gdInfo.filepath)" @tap="_previewImage(getSrc(gdInfo.filepath))"
						mode="aspectFill"
						style="width: 120rpx;height: 120rpx;border-radius: 20rpx;vertical-align: middle;"></image>
				</view>
			</view>
			<view class="jckList1">
				<text class="title2">审批记录</text>
				<view class="taskList" v-if="spList==false">
					<view style="height: 50rpx;color: red; line-height: 70rpx;padding-left: 20rpx;">暂无审批记录..</view>
				</view>
				<view class="spjl">
					<view class="spjlList" v-for="(item,i) in spList">
						<view class="spjlItem">
							<view class="itemTit">
								<!-- <view class="name" v-if="item.createName"><text>{{item.createName}}</text></view>
								<view class="name" v-if="!item.createName"><><text>{{gdInfo.createName}}</text></view>
								<view class="yj" v-if="item.createName"
									:class="{'green':item.state=='同意','red':item.state=='不同意'}">
									<text>{{item.state}}</text>
								</view>
								<view class="yj" v-if="!item.createName"
									:class="{'green':item.formHistoryDataDTO[0].value=='同意','red':item.formHistoryDataDTO[0].value=='不同意'}">
									<text>{{item.formHistoryDataDTO[0].value}}</text>
								</view> -->
								<view class="name" ><text>{{item.createName}}</text></view>
								<view class="yj" :class="{'green':item.state=='同意','red':item.state=='不同意'}">
									<text>{{item.state}}</text>
								</view>
								<view class="time">{{item.createdDate.slice(5,19)}}</view>
							</view>
							<view class="itemCon"><text>节点名称：</text><text style="">{{item.taskNodeName}}</text></view>
							<view class="itemCon" >
								<!-- <text>批注：</text><text v-if="item.formHistoryDataDTO[1]">{{item.formHistoryDataDTO[1]['value']}}</text> -->
								<text>批注：</text><text >{{item.notice}}</text>
							</view>
							<view class="itemCon" v-if="item.filepath">
								<image :src="getSrc(item.filepath)" @tap="_previewImage(getSrc(item.filepath))"
									mode="aspectFill"
									style="width: 120rpx;height: 120rpx;border-radius: 20rpx;vertical-align: middle;">
								</image>
							</view>
						</view>
					</view>
				</view>

			</view>
			<view style="height:20rpx;"></view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				gdInfo: {},
				spList: [],
			}
		},
		computed: {
			getSrc(src) {
				return function(src) {
					return 'http://115.231.254.38:11021/' + src
				}
			}
		},

		methods: {

			_previewImage(image) {
				// console.log(image);
				var imgArr = [];
				imgArr.push(image);
				//预览图片z
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},

		},
		async onLoad(options) {
			this.gdInfo = JSON.parse(decodeURIComponent(options.obj));
			// console.log(this.gdInfo);
			const {
				data
			} = await this.$api.request({
				url: `/historyFromData/ByInstanceId/${options.id}`
			})
			console.log(data.data);
			this.spList = data.data


		},
	}
</script>

<style>
	.xjxqList {
		width: 710rpx;
		margin: 0 auto;
	}

	.xjxqItem {
		/* padding: 0 20rpx; */
		color: #000;
		font-size: 12px;
	}

	.itemTop,
	.itemMiddle,
	.itemBottom {
		width: 100%;
		min-height: 60rpx;
		/* line-height: 60rpx; */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.itemTop>text:first-child,
	.itemMiddle>text:first-child,
	.itemBottom>text:first-child {
		flex: 1;
	}

	.itemTop>text:last-child,
	.itemMiddle>text:last-child,
	.itemBottom>text:last-child {
		flex: 1;
	}

	.itemBottom3>text:last-child {
		flex: 1;
	}

	.blue {
		color: #007AFF;
	}

	.xjxl {
		margin-top: 40rpx;
	}

	.title {
		margin-top: 20rpx;
		padding: 10rpx 20rpx;
		background-color: #007AFF;
		border-radius: 10rpx;
		color: #fff;
		font-size: 14px;
	}


	.jckList {
		margin-top: 20rpx;
	}

	.u-form-item--left {
		width: 160rpx !important;
		flex: 0 0 160rpx !important;
	}

	.u-form-item__message {
		padding-left: 160rpx !important;
	}

	.u-td input,
	.u-td {
		font-size: 10px !important;
		text-align: center;
	}

	.u-td .uni-input-placeholder {
		text-align: center;
	}

	.u-mode-center-box {
		width: 100% !important;
	}

	.cbox {
		flex: 0.5;
		/* 		width: 40rpx; */
	}

	.select {
		/* background-color: #; */
	}

	.btn {
		margin: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.xjlbItem {
		/* 		display: flex;
		justify-content: space-between; */
		color: #000;
		font-size: 12px;
		background-color: #F8F8FF;
		padding: 10rpx;
		margin-top: 20rpx;
		border-radius: 16rpx;
	}

	.add {
		position: absolute;
		right: 0;
		top: 0;
	}

	.jckList1 {
		margin-top: 20rpx;
		background-color: #fff;
		border: 1px solid rgb(230, 230, 230);
		border-radius: 16rpx;
		overflow: hidden;
	}

	.title2 {
		display: block;
		width: 100%;
		font-size: 14px;
		padding-left: 10rpx;
		line-height: 60rpx;
		border-bottom: 1px solid rgb(240, 240, 240);
		color: #007AFF;
	}

	.spjl {
		/* margin-top: 20rpx; */

		padding: 20rpx 10rpx;
	}

	.spjlItem {
		position: relative;
		padding-left: 40rpx;
	}

	.spjlItem::before {
		content: "";
		position: absolute;
		top: 12rpx;
		left: 0;
		width: 16rpx;
		height: 16rpx;
		border: 8rpx solid green;
		border-radius: 50%;
	}

	.itemTit {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
	}

	.itemTit .time {
		flex: 1;
	}

	.itemTit .yj {
		flex: 0.5;
	}

	.itemTit .name {
		flex: 1.5;
	}

	,
	.itemTit,
	.itemCon {
		padding: 6rpx 0 10rpx 0;
		font-size: 12px;
	}

	.itemTit .time {
		color: #ccc;
	}

	.sqbd {
		padding: 10rpx;
		padding-bottom: 0;
	}

	.green {
		color: green;
	}

	.red {
		color: red;
	}

	.text1 {
		font-size: 12px;
		line-height: 80rpx;
		border-bottom: 1rpx solid #e4e7ed;
		color: #303133;
	}

	.text2 {
		color: #007AFF;
	}
</style>
