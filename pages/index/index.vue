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

			<text :class="{'active':active == index}" v-for="(item,index) in type" :key="index"
				@click="tabsChange(index,item)">{{item}}</text>

			<image src="../../image/下拉.svg" mode="" class="text_img"></image>
		</view>
	</view>
	<view v-show="isShow">
		<!-- 轮播图 -->
		<view class="swiper">
			<swiper :indicator-dots="true" indicator-color="rgba(0, 0, 0, .3)" :autoplay="true" interval="2000">
				<swiper-item v-for="(item,index) in img" :key="index">
					<view class="swiper-item">
						<image :src="item" mode="" />
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 文本 -->
		<view class="swiper_text">
			<li>大牌品质</li>
			<li>/</li>
			<li>工厂价格</li>
			<li>/</li>
			<li>分期支付</li>
			<li>/</li>
			<li>顺丰包邮</li>
			<li>/</li>
			<li>无忧退款</li>
		</view>
		<!-- 热门商品 -->
		<view class="content_list">
			<view class="list_content" v-for="(item,index) in hostList" :key="index" @click="godetail(item.Id)">
				<image :src="item.imageUrl" mode="" class="list_img"></image>
				<view class="list_view">
					<view class="list_price">
						<p>￥{{item.priceStr}}</p>
					</view>
					<view class="list_mark">
						<span v-html="item.mack"></span>
					</view>
					<view class="list_supplier">
						<p>{{item.supplier}}</p>
					</view>
					<view class="list_title">
						<p>{{item.title}}</p>
					</view>
					<view class="list_evaluate">
						<p>{{item.evaluate}}条好评</p>
					</view>
				</view>
			</view>

		</view>
		<view class="bottom">
			<text>没有更多数据了~</text>
		</view>
	</view>

	<view v-show="!isShow">
		<!-- 二级标题 -->
		<view class="two_title">
			<template v-for="(item,index) in image" :key="index">
				<view class="title_view" v-if="index<=8">
					<image :src="item" mode="" class="two_title_img"></image>
					<text class="title_text">{{twoTitle[index]}}</text>
				</view>
			</template>
			<view class="title_view">
				<image src="https://static.biyao.com/mnew/img/master/index/classify_more@2x_0ed30f2.png" mode=""
					class="two_title_img"></image>
				<text class="title_text">全部</text>
			</view>
		</view>
		<!-- 数据 -->
		<view class="content_list">
			<view class="list_content" v-for="(item,index) in twoList" :key="index" @click="godetail(item.Id)">
				<image :src="item.imageUrl" mode="" class="list_img"></image>
				<view class="list_view">
					<view class="list_price">
						<p>￥{{item.priceStr}}</p>
					</view>
					<view class="list_mark">
						<span v-html="item.mack"></span>
					</view>
					<view class="list_supplier">
						<p>{{item.supplier}}</p>
					</view>
					<view class="list_title">
						<p>{{item.title}}</p>
					</view>
					<view class="list_evaluate">
						<p>{{item.evaluate}}条好评</p>
					</view>
				</view>
			</view>

		</view>
		<view class="bottom">
			<text>没有更多数据了~</text>
		</view>
	</view>

</template>
<script setup>
	import {
		ref
	} from 'vue'
	import {
		gettypeone,
		getTypeTwo,
		getTypeTwoList,
		hotList
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

		res?.unshift('热门')
		type.value = res
	})

	// 热门商品
	let page = 1
	let hostList = ref([])
	hotList(page).then(res=>{
		hostList.value = res
		console.log(res);
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

	// 显示隐藏
	let isShow = ref(true)
	let host = () => {
		isShow.value = true
		// console.log(isShow.value);
	}

	let typeTwo = async (index, item) => {
		// console.log(type.value);
		isShow.value = false
		image.value = []
		// console.log(item,'******')
		// console.log(item, '================');
		getTypeTwo(item).then(res => {

			twoTitle.value = res
			// type_two.value = res[0]
			// console.log(res);
			res?.forEach((value, index) => {
				getTypeTwoList(item, value).then(data => {
					twoList.value = data
					image.value.push(data[0]?.imageUrl)
					// console.log(data);
				})
			})

		})
	}

	// 高亮
	let tabsChange = (index, item) => {
		// console.log(index, '================')
		active.value = index
		if (index === 0) {
			host()
		} else {
			typeTwo(index, item)
		}
	}

	// 跳转详情页
	let godetail = (goodId)=>{
		console.log(goodId);
		uni.navigateTo({
			url:'/pages/detail/detail?goodId='+goodId
		})
	}
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
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.title_view {
			width: 75px;
			margin: auto;


			.two_title_img {
				display: block;
				width: 30px;
				height: 30px;
				margin: auto;
			}

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

	// 数据
	.content_list {
		padding: 10px;
		width: 750rpx;
		display: flex;
		flex-wrap: wrap;

		.list_content {
			display: flex;
			flex-wrap: wrap;
			width: 170px;
			margin-bottom: 10px;
			margin-right: 11px;

			.list_img {
				display: block;
				width: 170px;
				height: 170px;
				margin-bottom: 0.16rem;
			}

			.list_view {
				width: 170px;

				.list_price {
					color: #f7a701;
					font-size: 0.34rem;
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
					font-size: 14px;
				}

				.list_evaluate {
					color: #bbbbbb;
					font-size: 0.2rem;
					padding-top: 0.06rem;
				}
			}
		}
	}
</style>