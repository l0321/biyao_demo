import request from './request.js'

// 一级标题
export const gettypeone = ()=>request('/getTypeOne', 'GET')
// 二级标题
export const getTypeTwo = (type_one)=>request('/getTypeTwo',{type_one},'GET')
// 二级数据
export const getTypeTwoList = (type_one,type_two)=>request('/getTypeTwoList',{type_one,type_two},'GET')
// 热门
export const hotList = (page)=>request('/hotList',{page},'GET')
// 详情
export const detail = (goodId)=>request('/detail',{goodId},'GET')
// 加入购物车
export const addList = (goodId,token)=>request('/add',{goodId,token},'GET')