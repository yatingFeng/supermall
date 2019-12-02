<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
     <slot></slot>
  </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll' 
  export default {
    name:'Scroll',
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpload:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        scroll:null
      }
    },
    mounted(){
      // 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        // probeType：用来监听滚动的位置，为3时实时监听位置
        probeType:this.probeType,
        pullUpload:this.pullUpload
      }),
      // 监听滚动的位置
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)
      })
      // 监听上拉事件
        this.scroll.on('pullingUp',() =>{
          this.$emit('pullingUp')
        })
      // 监听scroll滚动到底部
      // if(this.pullUpload){
      //   this.scroll.on('pullingUp',() =>{
      //     this.$emit('pullingUp')
      //   })
      // }
    },
    methods:{
      scrollTo(x, y, time=300){
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y :0
      }
    }
  }
</script>

<style scoped>

</style>