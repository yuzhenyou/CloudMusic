<template>
  <div class="personal">
    <h6>推荐歌单</h6>
    <div class="personal-content">
      <ul class="personal-ul">
        
        <li class="personal-li" v-for="item in result" :key="item.name">
          <router-link :to="{path:'/list',query:{id:item.id}}">
            <img :src="item.picUrl" alt="">
            <p v-text="item.name"></p>
          </router-link>
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
    _this.$store.commit('setList',{playlist:{
      name:'',
      coverImgUrl:'',
      first:true
    }});
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
.personal-ul{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.personal-li{
  width: 2.3rem;
  height: 3.1rem;
  margin: 0.01rem 0;
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
