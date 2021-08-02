<template>
	<view class="my">
		<view class="myBg">
			<view class="myAvater">
				<image src="../../static/my/logo2.png" mode="aspectFill"></image>
				<view class="uname">
					<text>你好!</text>
					<text>{{userInfo.nickName}}</text>
				</view>
			</view>
			<view class="set">
				<uni-icons type="gear-filled" color="#248dd4" size="20"></uni-icons>
				<text>基本信息设置</text>
			</view>
		</view> 
		<uni-list>
			<uni-list-item title="定位功能" :show-extra-icon="true" :extra-icon="{color: '#007AFF',size: '20',type: 'location-filled'}" showArrow="false" :show-switch="true" @switchChange="switchChange1">
			</uni-list-item>
			<uni-list-item title="消息提示" :show-extra-icon="true" :extra-icon="{color: '#007AFF',size: '20',type: 'chat'}" showArrow="false" :show-switch="true" @switchChange="switchChange">
			</uni-list-item>
			<uni-list-item  :title="`版本号：${bbh}`" :show-extra-icon="true" :extra-icon="{color: '#007AFF',size: '20',type: 'info-filled'}" ></uni-list-item>
			
			<view class="gx1" style="margin-right: 30rpx;margin-top: 20rpx;color: #007AFF;text-decoration: underline;"
				@click="gx">版本更新</view>
		</uni-list> 
<!-- 		<view class="" style="display: flex;justify-content: space-between;">
			<view class="bbh">版本号：{{bbh}}</view>
			<view class="gx" style="margin-right: 30rpx;margin-top: 20rpx;color: #007AFF;text-decoration: underline;"
				@click="gx">版本更新</view>
		</view> -->
<!-- 		<u-button style="margin-top: 100rpx;width: 100%;margin-bottom: 40rpx;" type="" @click="logout">退出登录
		</u-button> -->
		<view class="btn" @click="logout">退出登录</view>
	</view>
</template> 

<script>
	export default {
		data() {
			return {
				userInfo: '',
				isLink: [],
				bluetooth: [],
				DeviceID: '',
				ServiceUUID: '',
				characteristics: '',
				bbh: '',
			}
		},

		onLoad() {
			var userInfo = uni.getStorageSync('userInfo');
			console.log(userInfo);
			this.userInfo = userInfo;
			this.bbh = plus.runtime.version
		},
		methods: {
			switchChange() {},
			// 更新
			gx(e) {
				console.log(e);
				//#ifdef APP-PLUS
				var server = "http://115.231.254.38:11021/ajgy2backend/luoben/api/applist?qs=2"; //检查更新地址  
				var req = { //升级检测数据  
					"appid": plus.runtime.appid,
					"version": plus.runtime.version
				};
				uni.request({
					url: server,
					success: (res) => {
						// console.log(res);
						if (res.statusCode == 200 && res.data.rows[0].version > this.bbh) {
							uni.showModal({ //提醒用户更新  
								title: "更新提示",
								content: res.data.rows[0].bz,
								success: (res2) => {
									if (res2.confirm) {
										plus.runtime.openURL(res.data.rows[0].url);
									}
								}
							})
						} else {
							uni.showToast({ //提醒用户更新
								title: "您已是最新版",
								duration: 2000
							})
						}
					}
				})
				// #endif  
			},
			logout() {
				uni.showModal({ //提醒用户更新
					title: "是否确定退出?",
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('userInfo');
							uni.removeStorageSync('token');
							uni.redirectTo({
								url: '/pages/login/login'
							})
						}
					}
				})
			},
			switchChange1(e) {
				let system = uni.getSystemInfoSync(); // 获取系统信息
				console.log(system);
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
						uni.getLocation({
							type: 'wgs84',
							success: function(res) {
								console.log('当前位置的经度：' + res.longitude);
								console.log('当前位置的纬度：' + res.latitude);
							}
						});
					}
				}
			},
		},
		components: {}
	}
</script>

<style lang='scss'>
	.my {
		width: 100%;
		height: 100vh;
		background-color: #F8F8F8;
	}
	.myBg {
		position: relative;
		/* width: 750rpx; */
		width: 750rpx;
		height: 528rpx;
		background: url('../../static/my/my_bg.png'); 
		background-size: 100% 100%;
		background-color: #fff;
	}

	.myAvater {
		position: absolute;
		top: 88rpx;
		left: 88rpx;
		display: flex;
		align-items: center;
	}

	.myAvater>image {
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
	}

	.uname {
		margin-left: 40rpx;
		display: flex;
		flex-direction: column;
		font-size: 16px;
		color: #fff;
	}

	.uname text:first-child {
		margin-bottom: 10rpx;
	}

	.bbh {
		margin-top: 20rpx;
		margin-left: 30rpx;
	}

	.set {
		position: absolute;
		bottom: 0;
		left: 20rpx;
		color: #248dd4;
		line-height: 80rpx;   
	} 

	.set>text {
		margin-left: 10rpx;
		font-size: 12px;
		vertical-align: middle;
	}
	.gx1 {
		position: absolute;
		right: 10rpx;
		bottom: 30rpx; 
	}
	.btn {
		margin-top: 120rpx;
		width: 100%;
		line-height: 90rpx;
		text-align: center;
		color: #d84222;
		font-size: 32rpx;
		background: #fff;
	}
</style>
