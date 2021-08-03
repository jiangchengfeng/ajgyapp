<template>
	<view class="content" style="width: 710rpx;
		margin: 0 20rpx;">
		<u-form :model="form" ref="uForm" class="sqbd" style="margin-bottom: 20rpx;">
			<u-form-item label="工单编号:" prop="bh">
				<u-input v-model="form.bh" placeholder="" />
			</u-form-item>
			<u-form-item label="标题:" prop="title">
				<u-input v-model="form.title" placeholder="请输入标题" />
			</u-form-item>
			<u-form-item label="类型" prop="lx">
				<u-select v-model="show2" :list="lxOpt" @confirm="confirm2"></u-select>
				<u-input disabled v-model="lxName" @click="show2 = true" placeholder="请选择类型" />
			</u-form-item>
			<u-form-item label="区域" prop="qy">
				<u-select v-model="show3" :list="qyOpt" @confirm="confirm3"></u-select>
				<u-input disabled v-model="qyName" @click="show3 = true" placeholder="请选择区域" />
			</u-form-item>
			<u-form-item label="来源" prop="ly">
				<u-select v-model="show4" :list="lyOpt" @confirm="confirm4"></u-select>
				<u-input disabled v-model="lyName" @click="show4 = true" placeholder="请选择来源" />
			</u-form-item>
			<u-form-item label="等级" prop="dj">
				<u-select v-model="show5" :list="djOpt" @confirm="confirm5"></u-select>
				<u-input disabled v-model="djName" @click="show5 = true" placeholder="请选择等级" />
			</u-form-item>
<!-- 			<u-form-item label="经度:" prop="y">
				<u-input disabled v-model="form.y" placeholder="" />
			</u-form-item>
			<u-form-item label="纬度:" prop="x">
				<u-input disabled v-model="form.x" placeholder="" />
			</u-form-item> -->
			<u-form-item label="地址:" prop="address">
				<u-input v-model="form.address" placeholder="请输入地址" />
			</u-form-item>
			<u-form-item label="描述:" prop="ms">
				<u-input v-model="form.ms" placeholder="请输入描述" />
			</u-form-item>
			<u-form-item label="现场照片:" prop="filepath">
				<u-upload ref="uUpload" :action="action" :header="headers" :form-data="formData" :auto-upload="true"
					max-count="1"></u-upload>
			</u-form-item>
			<u-button style="margin-top: 40rpx;" type="success" @click="submit">提交</u-button>
		</u-form>

		<!-- <u-picker mode="time" v-model="show" :params="params"></u-picker> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: null,
				form: {
					x: '',
					y: '',
				},
				show1: false,
				mode: 'date',

				show2: false,
				lxOpt: [],
				lxName: '',
				show3: false,
				qyOpt: [],
				qyName: '',
				show4: false,
				lyOpt: [],
				lyName: '',
				show5: false,
				djOpt: [],
				djName: '',

				action: 'http://115.231.254.38:11020/ajgy2backend/rural/workOrder/importFile',
				headers: {
					Authorization: "Bearer " + uni.getStorageSync('token')
				},
				formData: {
					file: '',
					path: 'appimg'
				},
			}
		},
		created() {
			this.form.bh = this.getPorjectBh();
			this.lxList()
			this.qyList()
			this.lyList()
			this.djList()
		},
		methods: {
			change1(e) {
				this.form.wxrq = e.result
			},
			confirm2(e) {
				this.form.lx = e[0].value
				this.lxName = e[0].label
			},
			confirm3(e) {
				this.form.qy = e[0].value
				this.qyName = e[0].label
			},
			confirm4(e) {
				this.form.ly = e[0].value
				this.lyName = e[0].label
			},
			confirm5(e) {
				this.form.dj = e[0].value
				this.djName = e[0].label
			},
			// xjyh_yhss
			async lxList() {
				const {
					data: res
				} = await this.$api.request({
					url: '/system/dict/data/type/gzl_gdlx'
				})
				for (let item of res.data) {
					this.lxOpt.push({
						value: item.dictValue,
						label: item.dictLabel
					})
				}

			},
			async qyList() {
				const {
					data: res
				} = await this.$api.request({
					url: '/system/dict/data/type/org_xzb'
				})
				for (let item of res.data) {
					this.qyOpt.push({
						value: item.dictValue,
						label: item.dictLabel
					})
				}
			},
			async lyList() {
				const {
					data: res
				} = await this.$api.request({
					url: '/system/dict/data/type/gzl_sjly'
				})
				for (let item of res.data) {
					this.lyOpt.push({
						value: item.dictValue,
						label: item.dictLabel
					})
				}
			},
			async djList() {
				const {
					data: res
				} = await this.$api.request({
					url: '/system/dict/data/type/gzl_sjdj'
				})
				for (let item of res.data) {
					this.djOpt.push({
						value: item.dictValue,
						label: item.dictLabel
					})
				}
			},



			submit() {

				this.form.type = "orderEvent";
				let system = uni.getSystemInfoSync(); // 获取系统信息
				if (system.platform === 'android') { // 判断平台
					var context = plus.android.importClass("android.content.Context");
					var locationManager = plus.android.importClass("android.location.LocationManager");
					var main = plus.android.runtimeMainActivity();
					var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
					if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
						uni.showModal({
							title: '提示',
							content: '请打开定位服务功能',
							showCancel: false, // 不显示取消按钮
							success() {
								if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
									var Intent = plus.android.importClass('android.content.Intent');
									var Settings = plus.android.importClass('android.provider.Settings');
									var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
									main.startActivity(intent); // 打开系统设置GPS服务页面
								} else {
									console.log('GPS功能已开启');
								}
							}
						});
					} else {
						console.log('GPS功能已开启');
						var files = this.$refs.uUpload.lists.filter(val => {
							return val.progress == 100;
						})
						if (files != false) {
							this.form.filepath = files[0].response.url;
						}
						uni.getLocation({
							type: 'wgs84',
							geocode:true,
							success: res => {
								// console.log('当前位置的经度：' + res.longitude);
								// console.log('当前位置的纬度：' + res.latitude);
								// console.log('当前地址：' + res.address.district);
								// console.log('当前地址：' + res.address.street);
								// console.log('当前地址：' + res.address.streetNum);
								this.form.y = res.longitude
								this.form.x = res.latitude
								if(this.form.title == false) {
									uni.showToast({
										icon: 'error',
										title: '请填写工单标题'
									});
									return false
								}
								this.$refs.uForm.validate(valid => {
									
									console.log(this.form);
									this.$api.request({
										url: '/event/OrderEvent',
										method: 'post',
										data: this.form
									}).then(res => {
										console.log(res);
										if (res.data.code == 200) {
											uni.showToast({
												icon: 'success',
												title: '新增成功'
											});
											uni.navigateTo({
												url: '/pages/orderReport/orderReport'
											})
										} else {
											uni.showToast({
												icon: 'error',
												title: '新增失败'
											});
										}
									}, err => {
										uni.showToast({
											icon: 'none',
											title: err
										});
									})

								})

							}
						});

					}
				}

			}
		},
		onLoad(options) {
			// console.log(options.type);
			// this.type = options.type
		},
	}
</script>

<style>
	.u-form-item--left {
		width: 160rpx !important;
		flex: 0 0 160rpx !important;
	}

	.u-form-item__message {
		padding-left: 160rpx !important;
	}

	.sbqk {
		margin: 20rpx 0;
		font-size: 14px;
		color: #007AFF;
		line-height: 60rpx;
		border-bottom: 2rpx solid #007AFF;
	}
</style>
