<template>
    <div class="backg">
        <div class="shop">
            <div class="carHeader">
				<checkbox-group @change="selectAll" class="lis_all">
					<checkbox :checked="shoplist.length? shoplist.length==list.length||shoplist.length==newlist.length:false"  />
				</checkbox-group>
                <span class="all">全选</span>
                <span class="name">商品详情</span>
                <span class="pri">单价</span>
                <span class="number">数量</span>
                <span class="price">总价</span>
                <span class="handle">操作</span>
            </div>
           <div id="list">
			   
						<checkbox-group class="ls" @change="changeitem" >  
						<div class="li_box" style="width: 100%;"  v-for="(item, index) in shoplist" :key="item.Id" :data-ash="item.Id">
							<checkbox style="margin-left: 20px;" :checked="newlist.includes(item.Id)||list.includes(item)" :value="JSON.stringify(item)"/>
							<img :src="item?.imgs ? JSON.parse(item?.imgs)[0] : ''" alt="" style="margin-left: 10px;">

							<p class="unit_Price" style="margin-left: 2%;width: 50px;">￥<span>{{ item.priceStr }}</span></p>
							<div style="display: flex;flex-wrap: nowrap;align-items: center;margin-left: 5px;">
								<span class="butDown" @click="delshop(item, index)">-</span>
								<input type="text" class="ipt" :value="item.count">
								<span class="butUp" @click="addshop(item, index)">+</span>
							</div>
							<p class="zong_Price" style="margin-left: 2%;width: 50px;">￥{{ item.priceStr * item.count }}
							</p>
							<p class="del" style="margin-left: 5%;" @click="dellist(item, index)">删除</p>
						</div>
							
						</checkbox-group>
            </div>
            <div class="carBottom">
               <!-- <input type="checkbox" v-model="flag" @change="selectAll" class="lis_all">
                <span class="all">全选</span> -->
                <p class="total_Price">总价:￥<span>{{ setzong }}</span></p>
                <div class="btn">结算</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { nextTick,ref,watch,computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router';
import { onLoad } from "@dcloudio/uni-app"
import { GetShopCar, DelShopList, AddShopCar, RemoveShopCar } from '../api/serve.js'

let shoplist = ref([])
let list = ref([])  //选中列表
let newlist = ref([])  //选中列表
let flag = ref(false) //全选判断
let router = useRouter()
let token = uni.getStorageSync("token")
onLoad(() => {
    if (!token) {
    	uni.navigateTo({
    		url: "/pages/login/index"
    	})
    }
})

let changeitem=(e)=>{
	console.log(e.detail.value);
	let arr= e.detail.value
	let newarr= []
	let newarr2= []
	arr.forEach((item)=>{
		newarr.push(JSON.parse(item))
		newarr2.push(JSON.parse(item).Id)
	})
	console.log(newarr);
	list.value=newarr
	newlist.value=newarr2
}

watchEffect(()=>{
console.log(list.value);
console.log(newlist.value);
})
// console.log(token);
GetShopCar(token).then(res => {
    // console.log(res);
    shoplist.value = res
})
let getshoplist=()=>{
	GetShopCar(token).then(res => {
	    // console.log(res);
	    shoplist.value = res
	})
}
const feachData = async (key = '') => {
    await nextTick()
    GetShopCar(token).then(res => {
        // console.log(res);
        shoplist.value = res
    })

}
feachData()

watch(list, (newval) => {
    // console.log(newval?.length, list.value?.length);

    flag.value = newval?.length == shoplist.value?.length
}, { deep: true })
watch(shoplist, (newval) => {
    // console.log(newval?.length, list?.length);
    if (list.value?.length == 0) {
        flag.value = false
    } else {
        // console.log(shoplist.value);
        flag.value = newval?.length == list.value?.length
    }
}, { deep: true })




	let selectAll = (e) => {
		if(e.detail.value.length == 0) {
			list.value = []
			newlist.value = []
		}else{
			list.value = shoplist.value
			let newarr2= []
			shoplist.value.forEach((item)=>{
				newarr2.push(item.Id)
			})
			newlist.value=newarr2
			
		}
		// flag.value=!flag.value
		// // setTimeout(()=>{
		// if (e) {
	 //        list.value = shoplist.value
	 //        // console.log(list);
	 //    } else {
	 //        list.value = []
	 //    }
		// })
	   
	}
    
// watch(flag, (newval) => {
//     // console.log(newval?.length, list?.length);
//     if (flag.value) {
//             list.value = shoplist.value
//             // console.log(list);
//         } else {
//             list.value = []
//         }
    
// }, { deep: true })
let dellist = (item) => {
    
    let goodId = item.Id
    DelShopList({ goodId, token }).then(res => {
        // console.log(res);
    }).then(() => {
        GetShopCar(token).then(res => {
            // console.log(res);
            shoplist.value = res
        })
    })
    list.value.forEach((shop, index) => {
        if (item.Id == shop.Id) {
            list.value.splice(index, 1)
        }
    })

}
let addshop = (item) => {
    
    let goodId = item.Id
    AddShopCar({ goodId, token }).then(res => {
        // console.log(res);
    }).then(() => {
        GetShopCar(token).then(res => {
            // console.log(res);
            shoplist.value = res
            // for (let i = 0; i < list.value.length; i++) {
            //     if (list.value[i].Id == item.Id) {
            //         list.value[i].count++
            //     }
            // }
        })
    })
}
let delshop = (item) => {
    
    let goodId = item.Id
    if (item.count > 1) {
        RemoveShopCar({ goodId, token }).then(res => {
            // console.log(res);
        }).then(() => {
            GetShopCar(token).then(res => {
                // console.log(res);
                shoplist.value = res
                for (let i = 0; i < list.value.length; i++) {
                    if (list.value[i].Id == item.Id) {
                        list.value[i].count--
                    }
                }
            })
        })
    } else {
        DelShopList({ goodId, token }).then(res => {
            // console.log(res);
        }).then(() => {
            GetShopCar(token).then(res => {
                // console.log(res);
                shoplist.value = res
            })
            list.value.forEach((shop, index) => {
                if (item.Id == shop.Id) {
                    list.value.splice(index, 1)
                }
            })
            // for (let i = 0; i < list.length; i++) {
            //     if (list[i].Id == item.Id) {
            //         console.log(item.Id, list[i].Id);
            //         // list.splice(i, 1)
            //     }
            // }
        })
    }

}


let setzong = computed(() => {
    let zong = 0
    list.value.forEach(element => {
        zong += element.priceStr * element.count
    });
    return zong
})
</script>


<style scoped>
.backg {
    background-color: #ccc;
    padding-top: 50px;
	margin-top: 50px;
	width: 100%;
}

.shop {
    font-size: 14px;
    width: 90vw;
    margin: 0 auto;
    border-radius: 10px;
    background-color: #fff;
}

.carHeader {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: left;
    border-bottom: 1px solid #000;
	/* display: flex; */
}

 .lis_all {
    margin-left: 5%;
	display: inline-block;
	vertical-align: middle;
}

.all {
    margin-left: 2%;
}

.name,
.pri {
    margin-left: 5%;
}

.number,
.price {
    margin-left: 5%;
}

.handle {
    margin-left: 5%;
}

.carBottom {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: left;
    border-top: 1px solid #000;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.carBottom input {
    margin-left: 5%;
}

.carBottom .all {
    margin-left: 1%;
}

.carBottom .total_Price {
    width: 100px;
    display: inline-block;
    text-align: center;
}

.btn {
	display: inline-block;
	
    width: 80px;
	text-align: center;
    height: 50px;
	line-height: 50px;
    margin-left: 4%;
    border-radius: 20px;
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
}

#list {
    display: flex;
    flex-wrap: wrap;
	padding: 0;
	width: 100%;
}
.ls{
	width: 100%;
}

    


#list button {
    width: 20px;
    height: 20px;
}
.li_box{
	width: 100%;
	display: flex;
	align-items: center;
	position: relative;
	color: #2c3e50;
	font-size: 14px;
	background-color: #f5f5f5;
	margin: 10px 0;
	border-radius: 10px;
	width: 100%;
	height: 75px;
	line-height: 75px;
}
#list img {
    color: #2c3e50;
    line-height: 100px;
    width: 75px;
    height: 75px;
    background-color: #409eff;
}

.ipt {
    width: 20px;
	text-align: center;
}
</style>