<template>
  <div class="swiper">
      <div class="swiper-containers">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in data" :key="item.targetId">
            <img :src="item.pic">
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-paginations"></div>
      </div>
  </div>
</template>
<script>
export default {
  data (){
    return{
      data:''
    }
  },
  created(){
    var _this=this;
    this.$http.get(this.config.api+'/banner').then(function(res){
      if(res.data.code==200){
        _this.data=res.data.banners;
      };
    })
  },
  mounted(){
    var swiper = new Swiper('.swiper-containers', {
      pagination: '.swiper-paginations',
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      slidesPerView: 1,
      paginationClickable: true,
      grabCursor: true,
      observer:true,//修改swiper自己或子元素时，自动初始化swiper 
      observeParents:false,//修改swiper的父元素时，自动初始化swiper 
      // spaceBetween: 30,
      resistanceRatio : 0,
      loop: true,
      autoplay:3000,
      autoplayDisableOnInteraction : false,
      onSlideChangeEnd: function(swiper){ 
        swiper.update();  
        swiper.startAutoplay();
        swiper.reLoop();  
      }
    });
  }
}
</script>
<style scoped>
.swiper{
  width:100%;
  height:3.5rem;
  margin:0 auto;
  text-align:center;
  margin-top: 1rem; 
}
.swiper-containers {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.swiper-wrapper,
.swiper-slide{
  width:100%;
  height:100%;
}
.swiper-slide img{
  display:inline-block;
  border:0;
  width:100%;
  height:100%;
}
.swiper-paginations{
  position: absolute;
  z-index: 10;
}
</style>
