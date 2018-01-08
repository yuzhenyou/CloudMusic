<template>
  <div id="app">
    <router-view/>
    <Player></Player>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Player from '@/components/player'
export default {
  name: 'app',
  components:{
    Player
  },
  mounted(){
    
  }
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
  font-size: 14px;
}
html,body{
  width: 100%;
  height: 100%;
}
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
  color: #666;
}
ul {
  list-style: none;
}
img{
  display: inline-block;
  width: 100%;
  height: 100%;
}
/*清除浮动*/
.clearfix:after {
    display: table;
    content: "";
    clear: both;
}
.clearfix:before {
    display: table;
    content: "";
}
.backs{
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
}
.backs img{
  width: 0.6rem;
  height: 0.5rem;
}
/* swiper样式 */
.swiper-pagination-bullet{
  background:rgba(255,255,255,1);
}
.swiper-pagination-bullet-active{
  background:#f4ea2a;
}
</style>
