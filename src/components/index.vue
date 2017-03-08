<template>
    <div class="content">
      <div class="tags">
        <ul class="tags-ul">
          <li class="tags-li active" >个性推荐</li>
          <li class="tags-li" >歌单</li>
          <li class="tags-li" ><router-link class="point" :to="{path:'/singer'}">歌手
          </router-link></li>
          <li class="tags-li" >排行榜</li>
        </ul>
      </div>
      <div class="slider">
        <ul class="slider-ul" v-bind:style={left:left}>
          <li class="slider-li">
            <img src="../../static/img/1.jpg">
          </li>
          <li class="slider-li">
            <img src="../../static/img/2.jpg">
          </li>
          <li class="slider-li">
            <img src="../../static/img/3.jpg">
          </li>
          <li class="slider-li">
            <img src="../../static/img/4.jpg">
          </li>
          <li class="slider-li">
            <img src="../../static/img/5.jpg">
          </li>
          <li class="slider-li">
            <img src="../../static/img/1.jpg">
          </li>
        </ul>
      </div>
    </div> 
</template>

<script>
import axios from 'axios'
export default {
  name: 'reader',
  data:function(){
    return {
      left:0,
      active1:true,
      active2:false,
      active3:false,
      active4:false,
    }
  },
  created () {
      this.slider();
      this.pause();
  },
  watch:{
    '$route': ['slider','pause']
  },
  methods:{
    slider(){
      var slider=document.querySelector('.slider-ul');
      var vm=this;
      setInterval(function(){
        var l=parseInt(vm.left);
        if(l<=-500){
          vm.left=0+'%';
        }else{
          vm.left=l-100+'%';  
        }
      },3000)

    },
    pause(){
      this.$store.commit('setIsPlay',false);
    }
  }
}
</script>


<style scoped>
a{
  text-decoration:none;
  color:#666;
}
.tags{
  width:100%;
  height:40px;
}
.tags-ul{
  width:100%;
  height:100%;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
}
.tags-li{
  width:25%;
  height:100%;
  line-height:40px;
  text-align:center;
  color:#333; 
}
.active{
  color:#f44336;
  border-bottom:2px solid #f44336;
}
.slider{
  width:100%;
  height:180px;
  position: relative;
}
.slider-ul{
  width:600%;
  height:100%;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  position: absolute;
  transition:all 1s;
}
.slider-li{
  width:100%;
  height:100%;
}
.slider-li img{
  display:block;
  width:100%;
  height:100%;
}
</style>





