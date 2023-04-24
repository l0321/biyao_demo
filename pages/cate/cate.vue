<template>
	<view class="lt_list">
		<view class="list_li" v-for="(item,index) in list_lt" :key="index" @click="()=>{getTweList(item)}">
			{{item}}
		</view>
	</view>
	<view class="rt_list">
		<view class="list_li" v-for="(item,index) in list_rt" :key="index" @click="">
			{{item}}
		</view>
	</view>
</template>

<script setup>
	import {ref} from "vue"
	import { onLoad,onReady } from "@dcloudio/uni-app"
	import {gettypeone,getTypeTwo}from '../api/serve.js'
	
	let list_lt=ref([])
	let list_rt=ref([])
	
	onLoad(()=>{
		gettypeone().then(res=>{
			// console.log(res);
			list_lt.value=res
		})
		getTypeTwo("个护").then(res=>{
			console.log(res);
			list_rt.value=res
		})
	})
	onReady(()=>{
		console.log(list_lt);
	})
	let getTweList=(item)=>{
		getTypeTwo(item).then(res=>{
			console.log(res);
			list_rt.value=res
		})
	}
</script>

<style lang="scss" scoped>
	.lt_list{
		width: 7.72rem;
		border-right: 1px solid ;
		height: 100%;
		overflow: scroll;
		position: fixed;
		left: 0;
		top: 2.9rem;
		bottom: 0.99rem;
		z-index: 2;
		box-sizing: border-box;
		background: #f7f7f7;
		.list_li{
			width: 7.72rem;
			height: 2.98rem;
			font-size: 1.26rem;
			color: #4a4a4a;
			text-align: center;
			box-sizing: border-box;
			padding: 0.28rem 0;
		}
	}
	.rt_list{
		width: 100%;
		margin-left: 7.72rem;
	}
</style>