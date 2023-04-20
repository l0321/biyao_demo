<template>
	<!-- 搜索 -->
	<view class="title">
		<view class="title_content">
			<view class="title_search">
				<view class="search">
					<image src="../../image/sousuo.svg" mode="" class="search_image"></image>
					<input type="text" placeholder="请输入您想要的商品" class="search_input">
				</view>
			</view>
		</view>
	</view>
	<!-- 一级标题 -->
	<view class="text">
		<view class="text_view">
			<text class="view_text">热门</text>
			<text :class="{'active':active == index}" v-for="(item,index) in type" :key="index"
				@click="typeTwo(index,item)">{{item}}</text>
			<image src="../../image/下拉.svg" mode="" class="text_img"></image>
		</view>
	</view>
	<!-- 轮播图 -->
	<!-- <view class="swiper">
		<swiper :indicator-dots="true" indicator-color="rgba(0, 0, 0, .3)" :autoplay="true" interval="2000">
			<swiper-item v-for="(item,index) in img" :key="index">
				<view class="swiper-item">
					<image :src="item" mode="" />
				</view>
			</swiper-item>
		</swiper>
	</view> -->
	<!-- 文本 -->
	<!-- <view class="swiper_text">
		<li>大牌品质</li>
		<li>/</li>
		<li>工厂价格</li>
		<li>/</li>
		<li>分期支付</li>
		<li>/</li>
		<li>顺丰包邮</li>
		<li>/</li>
		<li>无忧退款</li>
	</view> -->
	<!-- 二级标题 -->
	<view class="two_title">
		<view class="title_view">
			<image :src="item" mode="" v-for="(item,index) in image" :key="index"></image>
			<text class="title_text"></text>
		</view>
	</view>
</template>
<script setup>
	import {ref} from 'vue'
	import {
		gettypeone,
		getTypeTwo,
		getTypeTwoList
	} from '../api/serve.js'
	const img = [
		'https://bfs.biyao.com/group2/M00/32/9D/CghjFmJ6LPiAeSO9AAA7svOszMY962.jpg',
		'https://bfs.biyao.com/group2/M00/2F/7A/CghjFmJ0s5OAS5DnAABbNoMd8m4404.jpg',
		'https://bfs.biyao.com/group2/M00/42/E9/CghkFmKWtDOAb_kBAABFbGOM4rs662.jpg',
		'https://bfs.biyao.com/group2/M00/4A/F5/CghiFmKmypKAJzJ_AABKjkLREbA635.jpg',
		'https://bfs.biyao.com/group2/M00/32/9D/CghjFmJ6LPiAeSO9AAA7svOszMY962.jpg',
		'https://bfs.biyao.com/group2/M00/2F/7A/CghjFmJ0s5OAS5DnAABbNoMd8m4404.jpg'
	]
	// 一级标题
	let type = ref([])

	gettypeone().then(res => {

		console.log(res);
		type.value = res
	})
	// 点击请求二级数据

	// 高亮
	let active = ref(0)
	// 参数
	let type_two = ref()

	// 二级标题
	let twoTitle = ref([])
	// 二级数据
	let twoList = ref([])
	
	// 图片
	let image = ref([])

	let typeTwo = async (index, item) => {
		image.value = []
		active.value = index
		getTypeTwo(item).then(res => {
			twoTitle.value = res
			// type_two.value = res[0]
			console.log(res);
			res?.forEach((value,index)=>{
				getTypeTwoList(item, value).then(data => {
					twoList.value = data
					image.value.push(data[0].imageUrl)
					console.log(data);
				})
			})

		})
	}
	
	// let image = computed(()=>{
		
	// })
</script>

<style lang="scss">
	// 搜索
	.title {
		width: 750rpx;
		height: 1.71rem;
		background-color: antiquewhite;

		.title_search {
			width: 100%;
			background: #fff;
			padding-top: 0.2rem;
			padding-bottom: 0.12rem;

			.search {
				width: 20.1rem;
				height: 2.2rem;
				margin: 0 auto;
				background: #f4f4f4;
				border-radius: 25px;
				overflow: hidden;
				display: -webkit-box;
				display: -webkit-flex;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 0 5px 0 13px;

				.search_image {
					width: 30px;
					height: 30px;
				}

				.search_input {
					display: block;
					font-size: 13px;
					line-height: 1.4em;
					height: 1.4em;
					min-height: 1.4em;
					overflow: hidden;
					padding: 0 0 0 10px;
				}
			}
		}
	}

	// 轮播图
	.swiper {
		width: 750rpx;
		background: #f4f4f4;
		overflow: hidden;
		margin-top: 5px;

		image {
			width: 100%;
			height: 150px;
		}
	}

	.text {
		width: 750rpx;
		margin-top: 20px;
		height: 35px;
		overflow: hidden;
		overflow-x: auto;
		text-decoration: none;

		.text_view {
			pointer-events: auto;
			display: block;
			white-space: nowrap;
			padding: 0 0.1rem;

			text {
				display: inline-block;
				font-size: 14px;
				line-height: 35px;
				padding: 0rem 0.2rem;
			}

			.text_img {
				width: 18px;
				height: 9px;
			}

			.active {
				font-family: PingFangSC-Medium;
				border-bottom: 0.02rem solid #7f4395;
				color: #7f4395;
			}
		}
	}

	// 文本
	.swiper_text {
		width: 750rpx;
		display: flex;
		justify-content: space-around;
		padding: 8px 0 0 0px;

		li {
			list-style: none;
			height: 1.72rem;
			font-size: 0.24rem;
			color: #9687a4;
			background: #fff;
			line-height: 0.72rem;
		}
	}

	// 二级标题
	.two_title {
		width: 750rpx;
		background: #fff;
		padding-top: 0.32rem;
		margin-bottom: 0.2rem;

		.title_view {
			width: 730rpx;
			margin: auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.title_text {
				display: block;
				margin-bottom: 5px;
				font-family: PingFangSC-Regular;
				font-size: 0.22rem;
				color: #4a4a4a;
				text-align: center;
				text-decoration: none;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
</style>