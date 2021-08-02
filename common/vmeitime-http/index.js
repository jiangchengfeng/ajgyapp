import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const request = ({url, data, method}) => {

	// http.config.baseUrl = "http://115.231.254.38:11021/ajgy2backend"
	http.config.baseUrl = "http://115.231.254.38:11020/ajgy2backend"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		let token = uni.getStorageSync("token")
		delete config.header['Authorization']
		if (token) {
			config.header['Authorization'] = 'Bearer ' + token
		}
	}
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		// console.log(response)
		//判断返回状态 执行相应操作
		const statusCode = response.data.code
		if (statusCode === 401) { //返回401，即token需刷新
			// return response.data = await doRequest(response, url)
			uni.setStorageSync('token', null)
			uni.setStorageSync('userInfo', null)
			uni.removeStorageSync('userInfo');
			uni.removeStorageSync('token');
			uni.showToast({
				title: '请重新登录'
			})
			uni.reLaunch({
				url: '/pages/login/login'
			})
			return false
		}
		if (statusCode === 422) {
			uni.hideLoading()
			//业务代码...return
		}
		// 不能再刷新时，服务器返回状态码500时,判断是不是刷新token的接口
		if (statusCode === 500) {
			// if (response.config.url.indexOf("current") == -1) { // 换
				uni.showToast({
					icon: "none",
					// title: response.data.msg
					title: '服务端错误'
				})
			// }
		
			return
		}
		if (statusCode === 200 || statusCode === 201 || statusCode ===
			204) { //成功
			uni.hideLoading()
			return response
		} else {
			uni.hideLoading()
			uni.showToast({
				title: response.data.message,
				icon: 'none',
				duration: 1000
			})
			return
		}
		return response;
	}
	return http.request({
		url: url,
		data,
		method: method
	})
}

// 监测数据
export const monitor = ({url, data, method}) => {
	// console.log(111);
	http.interceptor.request = (config) => {
		delete config.header['Authorization']
		// console.log(config);
	}
	http.interceptor.response = (response) => {
		// console.log(response);
		return response;
	}
    return http.request({
       url: url,
       data,
       method: method
    })
}

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	request,
	monitor
}
