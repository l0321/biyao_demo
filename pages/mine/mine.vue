<template>
	<view class="shopcar" @click="goshopcar">
		<text>购物车</text>
		<text>></text>
	</view>
	
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"

	onLoad(() => {
		let token = uni.getStorageSync("token")
		// console.log(token);
		if (!token) {
			uni.navigateTo({
				url: "/pages/login/index"
			})
		}
	})
let goshopcar=()=>{
	uni.navigateTo({
		url:"/pages/shopcar/index"
	})
}

</script>

<style>
	.shopcar{
		display: flex;
		justify-content: space-between;
		margin-top:200px ;
		width: 100%;
		height: 50px;
		border-top: 1px solid;
		border-bottom: 1px solid;
		line-height: 50px;
		font-size: 24px;
	}
</style>