<template>
    <div class="swiper">
        <div class="swiper-containers">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in data" :key="item.img">
                    <img :src="item.img">
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
            data:[
                {img:'../../static/img/img1.jpg'},
                {img:'../../static/img/img2.jpg'},
                {img:'../../static/img/img3.jpg'}
            ]
        }
    },
    mounted(){
      var swiper = new Swiper('.swiper-containers', {
        pagination: '.swiper-paginations',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        grabCursor: true,
        // spaceBetween: 30,
        resistanceRatio : 0,
        loop: true,
        autoplay:3000,
        autoplayDisableOnInteraction : false
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
