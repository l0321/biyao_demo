import request from './request.js'

// 一级标题
export const gettypeone = ()=>request('/getTypeOne', 'GET')
// 二级标题
export const getTypeTwo = (type_one)=>request('/getTypeTwo',{type_one},'GET')
// 二级数据
export const getTypeTwoList = (type_one,type_two)=>request('/getTypeTwoList',{type_one,type_two},'GET')
// 登录
export const Login = (userName,password)=>request('/login',{userName,password},'GET')
// 注册register
export const Register = (userName,password)=>request('/register',{userName,password},'GET')



//获取购物车列表
export const GetShopCar = (token) => request('/shopList', { token });
//添加购物车/添加商品数量
export const AddShopCar = (data) => request('/add', { ...data });
//减少商品数量
export const RemoveShopCar = (data) => request('/remove', { ...data });

//删除购车数据
export const DelShopList = (token) => request('/del', { ...token });
// 热门
export const hotList = (page)=>request('/hotList',{page},'GET')
// 详情
export const detail = (goodId)=>request('/detail',{goodId},'GET')
// 加入购物车
export const addList = (goodId,token)=>request('/add',{goodId,token},'GET')
