<template>
	<view class="login">
		<view class="loginBg">
			<image src="../../static/logo_bg.jpg" mode="heightFix"></image>
			<view class="title">
				<!-- <text></text> <br> -->
				<text>安吉智慧排水管控平台</text>
			</view>
		</view>

		<view class="dl">登录</view>
		<form @submit="">
			<view class="uname">
				<uni-icons type="person-filled" color="#1999f3" size="20"></uni-icons>
				<input type="text" v-model="username" placeholder="请输入账号名称" />
			</view>
			<view class="password">
				<uni-icons type="locked-filled" color="#1999f3" size="20"></uni-icons>
				<input type="text" password v-model="password" placeholder="请输入密码" />
			</view>
			<button @click="loginBtn" :disabled="logining">登&nbsp;录</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				logining: false
			}
		},
		onLoad() {

		},
		methods: {
			async loginBtn() {

				this.logining = true;
				const {
					username,
					password
				} = this;
				if (this.username == '') {
					uni.showToast({
						title: '请输入用户名',
						icon: 'none'
					});
					this.logining = false;
				} else if (this.password == '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					});
					this.logining = false;
				} else {

					// let url = "http://192.168.1.106:8089/ajgy2backend/loginapp";
					// let url = "http://115.231.254.38:11021/ajgy2backend/loginapp";
					let url = "http://115.231.254.38:11020/ajgy2backend/loginapp";
					const data = {
						username: this.username,
						password: this.password
					};

					uni.request({
						url: url, //真实接口地址。
						data: data,
						method: "post",
						success: (res) => {
							if (res.statusCode == 200 && res.data.code == 200) {
								// uni.setStorageSync('userInfo', res.data.user);
								let token = res.data.token
								// console.log(token);
								uni.setStorageSync('token', res.data.token);
								this.$api.request({
									url: '/getInfo',
								}).then(res => {
									// console.log(res);
									uni.setStorageSync('userInfo', res.data.user);
									// #ifdef APP-PLUS
									const  cid = plus.push.getClientInfo().clientid
									const userId = uni.getStorageSync('userInfo').userId
									// console.log(cid);
									// console.log(uni.getStorageSync('userInfo').userId);
									this.$api.request({
										url:'/system/user/editcid',
										method:'post',
										data:{userId:userId,cid:cid},
									}).then(res=>{
										console.log(res);
										uni.reLaunch({
											url: '../index/index'
										});
									})
									// #endif
									uni.reLaunch({
											url: '../index/index'
										});

								}, err => {
									console.log(err);
								})
							} else {

								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								});
								this.logining = false;
							}
						},
						fail: (res) => {
							console.log(res);
							// uni.showToast({
							// 	title: res.data.msg,
							// 	icon: 'none'
							// });
							this.logining = false;
						}
					});
				}

			}
		}
	}
</script>

<style>
	.loginBg {
		position: relative;
	}

	.loginBg image {
		width: 750rpx;
	}

	.title {
		position: absolute;
		top: 50%;
		width: 100%;
		transform: translateY(-50%);
		text-align: center;
	}

	.title text {
		font-size: 32px;
		color: #fff;
		margin-bottom: 20rpx;
		font-weight: 600;
	}

	.dl {
		width: 710rpx;
		margin: 0 20rpx;
		color: #1999f3;
		line-height: 96rpx;
		margin-top: 20rpx;
		border-bottom: 2rpx solid #ccc;
		font-size: 14px;
	}

	form {}

	.uname,
	.password {
		width: 710rpx;
		margin: 0 20rpx;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		border-bottom: 1px solid #ddd;
		height: 120rpx;
		padding: 0 10rpx;
	}

	.uname input,
	.password input {
		flex: 1;
		padding-left: 40rpx;
		font-size: 14px;
	}

	button {
		width: 710rpx;
		margin: 0 auto;
		margin-top: 80rpx;
		border: none;
		box-shadow: 0 5px 5px 0 #ddd;
		border-radius: 20rpx;
		line-height: 96rpx;
		color: #fff;
		font-size: 14px;
		background-image: linear-gradient(to right, #18d7f4, #1986f3);
	}
</style>
