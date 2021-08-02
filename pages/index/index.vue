<template>
	<view class="home">
		<Nav :dbnum=dbNum v-if="appqx == 1" />
		<view class="line"></view>
		<Data-Gl/>
		<Db @moreBj="moreBj" :dbList="dbList" :dbList2="dbList2" :total1="t1" :total2="t2"/>
	</view>
</template>

<script>
	import Nav from './Nav/Nav.vue'
	import DataGl from './Nav/DataGl.vue'
	import Db from './Nav/Db.vue'
	export default {
		name:'Home',
		data() {
			return {
				pageSize:5,
				pageNum:1,
				dbList:[],
				dbList2:[],
				appqx:null,
				dbNum:0,
				t1:0,
				t2:0
			}
		},
		onShow(){
			this.getdbList()

		},
		onLoad() {
			this.getDbList()
			this.getDbListYs()
			// console.log(uni.getStorageSync('userInfo').appqx);
			this.appqx = uni.getStorageSync('userInfo').appqx
		},
		components:{
			Nav,
			DataGl,
			Db
		},
		methods: {
			// 获取我的待办事件工单
			async getdbList() {
				const {
					data
				} = await this.$api.request({
					url: `/event/OrderEvent/taskList`
				})
				if(data.rows.length){
					this.dbNum = data.rows.length
				}
			},
			getDbList(){
				this.$api.monitor({
					// url:`/api/home/data/warn/history?pageSize=${this.pageSize}&pageNum=${this.pageNum}`
					url:`/api/home/data/warn/history?stationType=1`
				}).then(res=>{
					// 
					if(res.data.rows) {
						this.dbList = res.data.rows
						this.t1 = res.data.total
					}
				})
			},
			getDbListYs(){
				this.$api.monitor({
					// url:`/api/home/data/warn/history?pageSize=${this.pageSize}&pageNum=${this.pageNum}&stationType=2`
					url:`/api/home/data/warn/history?stationType=2`
				}).then(res=>{
					if(res.data.rows) {
						this.dbList2 = res.data.rows
						this.t2 = res.data.total
					}
				})
			},
			moreBj(){
				uni.switchTab({
					url: '/pages/alert/alert'
				});
			}
		},
		async onPullDownRefresh() {
			await this.getdbList()
			await this.getDbList()
			await this.getDbListYs()
			await uni.stopPullDownRefresh();
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		width: 100%;

	}
	.line {
		height: 16rpx;
		width: 100%; 
		background-color: #efefef;
	}
</style>
