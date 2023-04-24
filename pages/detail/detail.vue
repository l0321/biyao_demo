<template>
	<view class="section" v-for="(item,index) in detailList" :key="index">
		<view class="swiper">
			<swiper style="height: 730rpx;">
				<swiper-item v-for="(val,index) in JSON.parse(item.imgs)" :key="index">
					<view class="swiper-item">
						<image :src="val" mode="" />
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="list_view">
			<view class="list_price">
				<p>￥{{item.priceStr}}</p>
			</view>
			<view class="list_mark">
				<span v-html="item.mack"></span>
			</view>
			<view class="list_supplier">
				<p>{{item.supplier}}<span style="margin-left: 150px;color: #bbb;">生产周期：{{item.leadTime}}天</span></p>
			</view>
			<view class="list_title">
				<p>{{item.title}}</p>
			</view>
			<view class="list_evaluate">
				<p>{{item.evaluate}}条好评</p>
			</view>
		</view>
		<!-- 相似商品 -->
		<button class="button" @click="goshopcar(item.Id)">加入购物车</button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad,
		onReady
	} from "@dcloudio/uni-app"
	import {
		detail,
		addList
	} from '../api/serve.js'

	// 
	let detailList = ref([])
	// 图片
	let imgs = ref([])
	onLoad((options) => {
		console.log(options.goodId);
		detail(options.goodId).then(res => {
			console.log(res);
			imgs.value = JSON.parse(res[0].imgs)
			detailList.value = res
		})
	})

	// 跳转
	let Token = uni.getStorageSync('token')
	console.log(Token);
	let goshopcar = (goodId) => {
		console.log(goodId, Token);
		addList(goodId, Token).then(res => {
			console.log(res);
			if (res.code == 1) {
				uni.showToast({
					title: '加入成功'
				})
				uni.navigateTo({
					url: '/pages/shopcar/shopcar?goodId=' + goodId
				})
			}
		})
	}
</script>

<style lang="scss">
	.section {
		width: 750rpx;

		.swiper {
			width: 730rpx;
			height: 730rpx;
			margin: auto;

			.swiper-item {
				height: 730rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

		}

		.list_view {
			width: 100%;
			padding: 0 20px;
		
			.list_price {
				color: #ff3637;
				font-size: 16px;
				margin-bottom: 0.08rem;
				display: -webkit-flex;
				display: -webkit-box;
				display: flex;
				margin-left: 0.24rem;
			}
		
			.list_mark {
				display: block;
			}
		
			.list_supplier {
				color: #bf9e6b;
				margin-bottom: 0.08rem;
				font-size: 0.24rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		
			.list_title {
				margin-bottom: 0.08rem;
				color: #4a4a4a;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 16px;
			}
		
			.list_evaluate {
				color: #bbbbbb;
				font-size: 14px;
				padding-top: 0.06rem;
			}
		}
		.button {
			position: fixed;
			bottom: 0;
			right: 0;
			left: 0;
			border: none;
			background-color: #e37f20;
			color: #fff;
		}

	}
</style>