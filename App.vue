<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
				// const  clientInfo = plus.push.getClientInfo()
				// console.log(clientInfo);
				const _self = this;
				const _handlePush = function(message) {
					// console.log(message);
					uni.navigateTo({
						url:'/pages/wddb/wddb'
					})
				};
				
				const  _handlePush2 = function(message){
					plus.push.createMessage(msg.content,msg.payload,{
						title:msg.title
					})
				}
				plus.push.addEventListener('click', _handlePush);
				
				// 只有APP在线时，才会触发receive事件，透传消息不会触发系统消息,需要创建本地消息 
				plus.push.addEventListener('receive', _handlePush2);
			// #endif 
			// console.log('App Launch');
			// 登录状态
			/**
			 * app更新
			 */
			//#ifdef APP-PLUS  
			var server = "http://115.231.254.38:11020/ajgy2backend/luoben/api/applist?qs=2"; //检查更新地址  
			var req = { //升级检测数据  
				"appid": plus.runtime.appid,
				"version": plus.runtime.version
			};
			uni.request({
				url: server,
				// data: req,
				success: (res) => {
					// console.log(res);
					if (res.statusCode == 200 && res.data.rows[0].version > plus.runtime.version ) {
						uni.showModal({ //提醒用户更新  
							title: "更新提示",
							content: res.data.rows[0].bz,
							success: (res2) => {
								if (res2.confirm) {
									plus.runtime.openURL(res.data.rows[0].url);
								}
							}
						})
					}
				}
			})
			//#endif  
			const user = uni.getStorageSync('userInfo') || ''
			console.log(user);
			if (user) {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			}

		},
		
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
