import {request} from "./request";

// 获取到轮播图和轮播图下方的数据（十点抢券、好物特卖、内购福利、初秋上新）
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 获取到商品列表（流行、新款、精选）
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}