import Vue from 'vue'
import App from './App'
import api from '@/common/vmeitime-http/'
import uView from "uview-ui";
import { selectDictLabel,selectDictLabels,selectDictLabel3,selectDictLabel4,selectDictLabels2,selectUserPerLabel , getPorjectBh } from "@/utils/sjhx.js";

Vue.use(uView);

Vue.config.productionTip = false

// 全局挂载后使用
Vue.prototype.$api = api
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabel3 = selectDictLabel3
Vue.prototype.selectDictLabel4 = selectDictLabel4
Vue.prototype.selectDictLabels2 = selectDictLabels2
Vue.prototype.selectUserPerLabel = selectUserPerLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.getPorjectBh = getPorjectBh

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
