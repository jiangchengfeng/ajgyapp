<template>
	<view class="xj" style="background-color: rgb(234,238,241);min-height: 100vh;">
		<view class="gdTab">
			<view class="gdTabItem" v-for="(item,i) in tabTitle" :key="i" :class="{aActive:i===activeIndex}"
				@click="tabClick(i)">{{item}}
			</view>
		</view>
		<view class="addxj" @click="addXj">
			<u-icon name="plus" color="#fff" size="30"></u-icon>
		</view>

		<view class="taskList" v-if="xjList==false">
			<view style="height: 50rpx;color: red; line-height: 70rpx;padding-left: 20rpx;">暂无工单..</view>
		</view>

		<view class="taskList">
			<view class="bzItem" v-for="item in xjList" @click="xjClick(item)">
				<!-- <view class="bzItem" v-for="item in xjList" > -->
				<view class="itemTop">
					<text>标题：<text class="blue">{{item.title}}</text></text>
				</view>
				<!-- 				<view class="itemTop">
					<text>当前审批人：<text class="blue">{{item.nextsprmc}}</text></text>
					<text>当前节点：<text class="blue">{{item.taskName}}</text></text>
				</view> -->
				<view class="itemTop">
					<text>类型：<text class="blue">{{lxFormat(item.lx)}}</text></text>
					<text>等级：<text class="blue">{{djFormat(item.dj)}}</text></text>
				</view>
				<view class="itemTop">
					<text>区域：<text class="blue">{{qyFormat(item.qy)}}</text></text>
					<text>来源：<text class="blue">{{lyFormat(item.ly)}}</text></text>
				</view>
				<!-- 				<view class="itemTop">
					<text>地点：<text class="blue">{{item.address}}</text></text>
				</view> -->
				<view class="itemTop">
					<text>申请时间：<text class="blue">{{item.createTime}}</text></text>
				</view>
				<image :src="getSrc(item.filepath)" @tap="_previewImage(getSrc(item.filepath))" mode="aspectFill"
					style="width: 120rpx;height: 120rpx;border-radius: 20rpx;vertical-align: middle;"></image>
			</view>
		</view>

	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabTitle: ['我的工单'],
				activeIndex: 0,
				xjList: [], // 巡检列表数据

				lxOpt: [],
				qyOpt: [],
				lyOpt: [],
				djOpt: [],
			}
		},
		onLoad() {
			this.lxList()
			this.qyList()
			this.lyList()
			this.djList()
			this.tabClick(0)
		},
		computed: {
			getSrc(src) {
				return function(src) {
					return 'http://115.231.254.38:11021/' + src
				}
			}
		},
		methods: {
			tabClick(i) {
				this.xjList = []
				this.activeIndex = i
				switch (i) {
					case 0:
						this.getxjList()
						break;
					case 1:
						this.getdbList()
						break;
					default:
						break;
				}
			},
			// 字典
			async lxList() {
				const {
					data: res
				} = await this.$api.request({
					url: '/system/dict/data/type/gzl_gdlx'
				})
				this.lxOpt = res.data
			},
			async qyList() {
				const {
					data: res
				} = await this.$api.request({
					url: '/system/dict/data/type/org_xzb'
				})
				this.qyOpt = res.data
			},
			async lyList() {
				const {
					data: res
				} = await this.$api.request({
					url: '/system/dict/data/type/gzl_sjly'
				})
				this.lyOpt = res.data
			},
			async djList() {
				const {
					data: res
				} = await this.$api.request({
					url: '/system/dict/data/type/gzl_sjdj'
				})
				this.djOpt = res.data
			},

			lxFormat(row) {
				return this.selectDictLabel(this.lxOpt, row);
			},
			qyFormat(row) {
				return this.selectDictLabel(this.qyOpt, row);
			},
			lyFormat(row) {
				return this.selectDictLabel(this.lyOpt, row);
			},
			djFormat(row) {
				return this.selectDictLabel(this.djOpt, row);
			},


			// 获取我的事件工单
			async getxjList() {
				const {
					data
				} = await this.$api.request({
					url: `/event/OrderEvent/list`
				})
				this.xjList = data.rows
			},
			// 获取我的待办事件工单
			async getdbList() {
				const {
					data
				} = await this.$api.request({
					url: `/event/OrderEvent/taskList`
				})
				this.xjList = data.rows
			},

			// 点击跳转详情页
			xjClick(item) {
				if(this.activeIndex == 0) {
					uni.navigateTo({
						url: `/pages/orderReport/xq/xq?id=${item.id}&obj=${JSON.stringify(item)}`
					});
				}else {
					uni.navigateTo({
						url: `/pages/orderReport/xq/spxq?id=${item.id}&obj=${JSON.stringify(item)}`
					});
				} 
			},

			// 新增
			addXj() {
				uni.navigateTo({
					url: '/pages/orderReport/add/add'
				});
			},

			_previewImage(image) {
				// console.log(image);
				var imgArr = [];
				imgArr.push(image);
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},
		},
		async onPullDownRefresh() {
			await this.tabClick(this.activeIndex)
			await uni.stopPullDownRefresh();
		}
	}
</script>

<style>
	.taskList {
		width: 710rpx;
		margin: 0 auto;
		padding-bottom: 20rpx;
	}


	.bzItem {
		padding: 10rpx;
		background-color: #fff;
		border: 1px solid rgb(230, 230, 230);
		font-size: 12px;
		margin-top: 20rpx;
		border-radius: 16rpx;
	}


	.itemTop,
	.itemMiddle,
	.itemBottom {
		width: 100%;
		height: 60rpx;
		/* line-height: 60rpx; */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.itemTop>text,
	.itemMiddle>text,
	.itemBottom>text {
		flex: 1;
	}

	.gdTab {
		height: 96rpx;
		line-height: 96rpx;
		color: #aaa;
		display: flex;
		font-size: 16px;
		padding: 0 20rpx;
		box-shadow: 0 3px 3px 0px #F1F1F1;
		background-color: #FFF;
	}

	.gdTabItem {
		padding: 0 20rpx;
		margin-right: 40rpx;
	}

	.aActive {
		color: #007AFF;
		border-bottom: 6rpx solid #007AFF;
	}

	.xjgd {
		padding: 0 20rpx;
	}

	.gdItem {
		height: 96rpx;
		line-height: 96rpx;
		padding: 0 20rpx;
		border-bottom: 2rpx solid #bbb;
		color: #000;
		font-size: 16px;
		display: flex;
		justify-content: space-between;
	}

	.blue {
		color: #007AFF;
	}

	.gdTab {
		height: 96rpx;
		line-height: 96rpx;
		color: #aaa;
		display: flex;
		font-size: 16px;
		padding: 0 20rpx;
		box-shadow: 0 3px 3px 0px #F1F1F1;
	}

	.gdTabItem {
		padding: 0 20rpx;
		margin-right: 40rpx;
	}

	.aActive {
		color: #007AFF;
		border-bottom: 6rpx solid #007AFF;
	}

	.xjgd {
		padding: 0 20rpx;
	}

	.gdItem {
		height: 96rpx;
		line-height: 96rpx;
		padding: 0 20rpx;
		border-bottom: 2rpx solid #bbb;
		color: #000;
		font-size: 16px;
		display: flex;
		justify-content: space-between;
	}

	.success {
		color: #4CD964;
	}

	.default {
		color: #bbb;
	}

	.warn {
		color: #DD524D;
	}

	.addxj {
		position: absolute;
		top: 18rpx;
		right: 20rpx;
		line-height: 60rpx;
		width: 60rpx;
		text-align: center;
		background-color: #007AFF;
		border-radius: 50%;
		color: #fff;
	}
</style>
