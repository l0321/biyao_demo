<template>
	
    <div class="login">
		<view class="title" style="text-align: center;margin-bottom: 10px;font-size: 30px;">
			注册
		</view>
        <form action="">
            <div>
                <label for="username">用户名</label>
                <input type="text" name="" id="1" v-model="username">
                <span style="top: 68px;left: 110px;"></span>
            </div>
            <div>
                <label for="password">密&#x3000;码</label>
                <input type="password" name="" id="2" v-model="password">
                <span style="top: 129px;left: 110px;"></span>
            </div>
        </form>
        <nav>
            <button @click="router.push('/pages/login/index')">
                <span>登录</span>
            </button>
            <button @click="zhuce">
                <span>注册</span>
            </button>
        </nav>

    </div>
</template>

<script setup>
import { Register } from '../api/serve.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

let username = ref('')
let password = ref('')
let router = useRouter()



let zhuce = () => {
    let data = { userName: username.value, password: password.value }
    console.log(username.value, password.value);
    Register(username.value, password.value).then(res => {
        console.log(res);
        // store.$state.token = res.token
		// uni.setStorageSync("token",res.token)
        if (res.code == 0) {
            uni.showToast({title:'被占用'})
        } else {
            uni.showToast({title:'注册成功'})
            // router.push('/')
        }
    })

}

</script>

<style lang="scss" scoped>
.login {
    width: 18.71875rem;
    margin: 80px auto;
    padding: 30px;
    position: relative;

    div {
        padding-bottom: 22px;

        label {
            width: 80px;
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #606266;
            line-height: 40px;
            padding: 0 12px 0 0;
            box-sizing: border-box;
        }

        label::before {
            content: "*";
            color: #f56c6c;
            margin-right: 4px;
        }

        input {
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            height: 40px;
            line-height: 40px;
            outline: 0;
            padding: 0 15px;
            transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
            width: 66%;
        }

        span {
            color: #f56c6c;
            font-size: 12px;
            line-height: 1;
            padding-top: 4px;
            position: absolute;
        }
    }

    button {
        line-height: 1;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        transition: .1s;
        font-weight: 500;
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        padding: 10px 20px;
        font-size: 14px;
        border-radius: 4px;

        span {
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
        }
    }

    nav {
        display: flex;
        justify-content: space-evenly;
    }
}
</style>

