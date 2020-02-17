<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title" @tap="getData">{{title}}</text>
		</view>
		<uni-popup class="err-pop" ref="popup" type="top">{{error}}</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import { getSqMode } from '../../api/user.js'
	export default {
		components: {uniPopup},
		data() {
			return {
				title: 'Hello',
				error: ''
			}
		},
		onLoad() {

		},
		methods: {
			getData() {
			  const params = {
				gettype: '1',
				yzm: '12345678'
			  }
			  getSqMode(params).then(res => {
				console.log(res)
			  }).catch(err => {
				  this.error = "请求错误 请重试"
				  this.$refs.popup.open()
				  setTimeout(() => {
					  this.$refs.popup.close()
				  }, 1000)
				  console.error(err)
			  })
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.err-pop{
		color: red;
	}
</style>
