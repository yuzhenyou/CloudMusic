<template>
  <div class="box">
    <Top></Top>
    <Swiper></Swiper>
    <Personal></Personal> 
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Swiper from '@/components/Swiper'
import Personal from '@/components/personal'
import Top from '@/components/top'
export default {
  name: 'Home',
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters([
      'reloads',
      'activeId'
    ]),
  },
  methods:{
    reload () {
      window.location.reload();
    }
  },
  mounted(){
    if(this.reloads){
      this.$store.commit('setReload',false);
      window.location.reload();
    }
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
