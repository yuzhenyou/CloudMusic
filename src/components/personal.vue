<template>
  <div class="personal">
    <h6>推荐歌单</h6>
    <div class="personal-content">
      <ul class="personal-ul clearfix">
        <li class="personal-li"  v-for="item in result" :key="item.name">
          <img :src="item.picUrl" alt="">
          <p v-text="item.name"></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      result:''
    }
  },
  methods:{
    
  },
  created(){
    var _this=this
    this.$http.get(this.config.api+'/personalized').then(function(res){
      if(res.data.code==200){
        _this.result=res.data.result
      }
    })
  }
}
</script>

<style>
.personal-content{
  width: 100%;
}
.personal{
  width: 100%;
}
.personal-li{
  width: 2.26rem;
  height: 3.1rem;
  float: left;
  margin: 0 0.1rem 0.2rem;
}
.personal-li img{
  display: inline-block;
  width: 100%;
  height: 2.3rem;
}
.personal-li p{
  font-size: 12px;
  color: #333;
  text-align: justify;
}
</style>
