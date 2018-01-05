<template>
  <div class="box">
    <Top></Top>
    <Swiper></Swiper>
    <Personal></Personal> 
  </div>
</template>

<script>
import Swiper from '@/components/Swiper'
import Personal from '@/components/personal'
import Top from '@/components/top'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'yogee'
    }
  },
  methods:{

  },
  mounted(){

  },
  components:{
    Swiper,Personal,Top
  }
}
</script>


<style scoped>
.box{
  width: 100%;
  background: #fff;
  position: relative;

}

</style>
