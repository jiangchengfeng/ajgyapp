<template>
	<view>
		<view id="mapContainer" :style="{height: height + 'rpx',width: '100%'}" :prop="sender"
			:change:prop="handleAction"></view>
	</view>
</template>

<script module="leaflet" lang="renderjs">
	import gcoord from 'gcoord';
	import '@/libs/leaflet/leaflet.css';
	import L from '@/libs/leaflet/leaflet'
	import '@/libs/leaflet/leaflet.ChineseTmsProviders.js'
	import '@/libs/leaflet/leaflet.mapCorrection.js'
	import '@/libs/leaflet/terraformer'
	import Terraformer from '@/libs/leaflet/terraformer-wkt-parser'

	export default {
		data() {
			return {
				map: null,
				ownerInstance: {},
				layers: [],
				baseLayers: [],
				settings: {
					keyTianDi: '878b6bb66c3fdbf298c4fecf8b11037e', //这里需要替换成自己的KEY
					// keyMapbox: 'pk.xxxxxxxxxxxxxxxx', //这里需要替换成自己的KEY
				}
			}
		},
		mounted() {
			this.handleCreate()
		},
		methods: {
			handleAction(newValue, oldValue, ownerInstance, instance) {
				this.ownerInstance = ownerInstance
				var handle = this[newValue.handle]
				var latlng = newValue.latlng
				var options = newValue.options
				var callback = newValue.callback
				var param = newValue.param
				if (!options) {
					options = undefined
				}
				if (!handle) {
					console.info('参数为标记需要执行的方法')
					return
				}
				//同时执行两次操作的时必须延迟执行否则数据变化太快导致没反应 
				this.handleExecute(handle, latlng, options, callback, param)
			},
			handleExecute(handle, latlng, options, callback, param) {
				var layer = handle(latlng, options)
				if (!layer) {
					return
				}
				if (options && options.popup) {
					layer.bindPopup(options.popup)
				}
				if (!callback) {
					return
				}
				layer.on('click', () => {
					this.ownerInstance.callMethod('handleItemClick', {
						callback,
						param
					})
				})
			},
			handleCreate(options) {
				this.map = L.map('mapContainer', {
					zoom: 0,
					zoomDelta: 1,
					attributionControl: false,
					zoomControl: true,
					maxZoom: 18,
					minZoom: 10,
					maxBounds: [
						[30.963205731628022, 120.2021964246876],
						[30.289606180859664, 118.93636485298373],
					],
					detectRetina: true
				}).setView([30.63664102701957, 119.6825852313696], 12)
				var layer = this.handleInitializeLayer()
				layer.addTo(this.map)
				this.handleCreateLayerControl()
			},
			handleInitializeLayer() {
				//高德电子地图
				var gaodeAmap = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
					maxZoom: 18,
					minZoom: 5
				})
				//  午夜蓝图
				var geoqImage = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', {
					maxZoom: 18,
					minZoom: 5
				})
				// 高德卫星影像地图
				var SatelliteMap = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {}) // 卫星影像纯净地图不带注记和道路
				var SatelliteAnnotion = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {}) // 卫星影像地图注记和道路
				var gaodeSatellite = L.layerGroup([SatelliteMap, SatelliteAnnotion])
				// 天地图底图
				var tianImage = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
					key: this.settings.keyTianDi
				})
				//天地图注记
				var tianCia = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
					key: this.settings.keyTianDi
				})

				// 天地图图组
				var tiandiMap = L.layerGroup([tianImage, tianCia])

				// 天地图（云南）图组
				var tianYnImage = L.tileLayer.chinaProvider('TianDiTu.YunNan.Map', {
					key: this.settings.keyTianDi
				})
				var tianYnAnnotion = L.tileLayer.chinaProvider('TianDiTu.YunNan.Annotion', {
					key: this.settings.keyTianDi
				})
				var tiandiYnMap = L.layerGroup([tianYnImage, tianYnAnnotion])


				// // mapbox
				// var mapbox = L.tileLayer.chinaProvider('MapBox.Normal.Map', {
				// 	token: this.settings.keyMapbox,
				// 	user: 'hangxingwen',
				// 	style: 'ckngw7lrq00kk17l8mtaliu7r'
				// })
				this.baseLayers.push({
					id: 1,
					label: '电子地图',
					layer: gaodeAmap
				})
				this.baseLayers.push({
					id: 2,
					label: '午夜蓝图',
					layer: geoqImage
				})
				this.baseLayers.push({
					id: 3,
					label: '高德影像',
					layer: gaodeSatellite
				})
				this.baseLayers.push({
					id: 4,
					label: '天地图',
					layer: tiandiMap
				})
				// this.baseLayers.push({
				// 	id: 5,
				// 	label: '天地图(云南)',
				// 	layer: tiandiYnMap
				// })
				// this.baseLayers.push({ id: 6, label: '卫星影像', layer: mapbox })
				return gaodeAmap
			},
			handleCreateLayerControl() {
				var obj = {}
				for (var i = 0; i < this.baseLayers.length; i++) {
					var item = this.baseLayers[i]
					obj[item.label] = item.layer
				}
				var control = L.control.layers(obj)
				control.addTo(this.map)
			},
			marker({lat,lng}, options) {
				console.log(lat);
				console.log(lng);
				// let latlng = this.wgs84togcj02(
				// 	lat,lng
				// )
				let latlng = gcoord.transform(
				  [lng,lat],    // 经纬度坐标
				  gcoord.WGS84,               // 当前坐标系
				  gcoord.GCJ02                 // 目标坐标系
				);
				console.log(latlng);
				var marker = L.marker([latlng[1],latlng[0]], options)
				marker.addTo(this.map)
				if (options && options.popup) {
					marker.bindPopup(options.popup)
				}
				this.layers.push(marker)
				return marker
			},
			polyline(latlngs, options) {
				var polyline = L.polyline(latlngs, options)
				polyline.addTo(this.map)
				if (options && options.popup) {
					polyline.bindPopup(options.popup)
				}
				this.layers.push(polyline)
				return polyline
			},
			lsyerWMS(baseUrl, options) {
				var layer = L.tileLayer.wms(baseUrl, options)
				layer.addTo(this.map)
				this.layers.push(layer)
				return layer
			},
			circle(latlng, options) {
				var circle = L.circle(latlng, options)
				circle.addTo(this.map)
				if (options && options.popup) {
					circle.bindPopup(options.popup)
				}
				this.layers.push(circle)
				return circle
			},
			geoJson(geojson, options) {
				var json = geojson
				if (typeof(geojson) == 'string') {
					json = Terraformer.parse(geojson)
				}
				var layer = L.geoJSON(json, options)
				layer.addTo(this.map)
				if (options && options.popup) {
					layer.bindPopup(options.popup)
				}
				this.layers.push(layer)
				return layer
			},
			panTo({lat,lng}, options) {
				let latlng = gcoord.transform(
				  [lng,lat],    // 经纬度坐标
				  gcoord.WGS84,               // 当前坐标系
				  gcoord.GCJ02                 // 目标坐标系
				);
				this.map.panTo([latlng[1],latlng[0]], options)
			},
			flyTo(latlng, options) {
				this.map.flyTo(latlng, options)
			},
			fitBounds(bounds, options) {
				this.map.fitBounds(bounds, options)
			},
			flyBounds(bounds, options) {
				this.map.flyToBounds(bounds, options)
			},
			setZoom(zoom, options) {
				this.map.setZoom(zoom, options)
			},
			removeAll() {
				for (var i = 0; i < this.layers.length; i++) {
					var item = this.layers[i]
					item.remove()
				}
				this.layers = new Array()
			}
		}
	}
</script>
<script>
	export default {
		data() {
			return {
				sender: {
					handle: '',
					latlng: {},
					options: null,
					callback: '',
					param: null
				},
				height: 700
			}
		},
		mounted() {

		},
		methods: {
			handleMarker(latlng, options, callback, param) {
				if (typeof options == 'string') {
					param = callback
					callback = options
					options = undefined
				}
				this.sender = {
					handle: 'marker',
					latlng: latlng,
					options: options,
					callback,
					param
				}
			},
			handleItemClick(event) {
				// #ifdef H5
				var handle = this.$parent.$parent[event.callback]
				//#endif
				// #ifdef APP-PLUS
				var handle = this.$parent[event.callback]
				//#endif
				if (handle) {
					handle(event.param)
				}
				// console.log(event)
			},
			handlePolyline(latlngs, options, callback, param) {
				if (typeof options == 'string') {
					param = callback
					callback = options
					options = undefined
				}
				this.sender.handle = 'polyline'
				this.sender.latlng = latlngs
				this.sender.options = options
				this.sender.callback = callback
				this.sender.param = param
			},
			handleLsyerWMS(baseUrl, options, callback, param) {
				if (typeof options == 'string') {
					param = callback
					callback = options
					options = undefined
				}
				this.sender.handle = 'lsyerWMS'
				this.sender.latlng = baseUrl
				this.sender.options = options
				this.sender.callback = callback
				this.sender.param = param
			},
			handleCircle(latlng, options, callback, param) {
				if (typeof options == 'string') {
					param = callback
					callback = options
					options = undefined
				}
				this.sender.handle = 'circle'
				this.sender.latlng = latlng
				this.sender.options = options
				this.sender.callback = callback
				this.sender.param = param
			},
			handleGeoJson(geojson, options, callback, param) {
				this.sender.handle = 'geoJson'
				this.sender.latlng = geojson
				this.sender.options = options
				this.sender.callback = callback
				this.sender.param = param
			},
			handlePanTo(latlng, options) {
				this.sender.handle = 'panTo'
				this.sender.latlng = latlng
				this.sender.options = options
			},
			handleFlyTo(latlng, options) {
				this.sender = {
					handle: 'flyTo',
					latlng: latlng,
					options: options
				}
			},
			handleFitBounds(bounds, options) {
				this.sender.handle = 'fitBounds'
				this.sender.latlng = bounds
				this.sender.options = options
			},
			handleFlyBounds(bounds, options) {
				this.sender.handle = 'flyBounds'
				this.sender.latlng = bounds
				this.sender.options = options
			},
			handleSetZoom(zoom, options) {
				this.sender.handle = 'setZoom'
				this.sender.latlng = zoom
				this.sender.options = options
			},
			handleRemoveAll() {
				this.sender.handle = 'removeAll'
				this.sender.latlng = null
				this.sender.options = null
			}
		}

	}
</script>

<style lang="scss">

</style>
