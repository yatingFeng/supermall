<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content">
       <home-swiper :banners="banners"/>
       <recommend-view :recommends="recommends"/>
       <feature-view/>
       <tab-control 
          :titles="['流行','新款','精选']" 
          class="tab-control"
          @tabClick = "tabClick" />
        <good-list :goods="showGoods"/>  
      </scroll>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  import NavBar from "components/common/navbar/NavBar"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodList from "components/content/goods/GoodsList"

  import {getHomeMultidata,getHomeGoods} from "network/home"

  import Scroll from "components/common/scroll/Scroll"
  export default {
    name:'Home',
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop'
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      // 请求多个数据（轮播图及他下面的）
      this.getMultidata();
      // 请求商品数据
      this.getGoods('pop');
      this.getGoods('new');
      this.getGoods('sell');
    },
    methods:{
      // 事件监听相关的方法
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },

      // 网络请求的相关方法
      getMultidata(){
        getHomeMultidata().then(res =>{
          //保存数据
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getGoods(type){
        // 获取到当前类型的页数，然后加1
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res =>{
          // 将新加载的数据存到原有的数据中,并使页码数加一
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
       })
      },
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9
  }
  .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom:49px;
    left: 0;
    right: 0
  }
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
