<template>
  <div class="discuss" v-if="show">
    <div class="discuss-title">
      <div class="backs" @click="back"> 
        <img src="../../static/img/back.png" alt="">
      </div>
      评论({{discuss.total}})
    </div>
    <div class="discuss-content">
      <div class="discuss-content-title">精彩评论</div>
      <ul class="discuss-ul">
        <li class="discuss-li" v-for="(item,index) in discuss.hotComments" :key="index">
          <div class="discuss-li-title">
            <div class="discuss-li-img">
              <img :src="item.user.avatarUrl" alt="">
            </div>
            <div class="discuss-li-name">
              <p class="discuss-li-t" v-text="item.user.nickname"></p>
              <p class="discuss-li-p" v-text="new Date(item.time).toLocaleDateString().substr(0,10).replace(/\//g,'-')"></p>
            </div>
          </div>
          <div class="discuss-li-info" v-text="item.content"></div>
        </li>
        <div class="discuss-content-title">最新评论</div>
        <li class="discuss-li" v-for="(item,index) in discuss.comments" :key="index+1000">
          <div class="discuss-li-title">
            <div class="discuss-li-img">
              <img :src="item.user.avatarUrl" alt="">
            </div>
            <div class="discuss-li-name">
              <p class="discuss-li-t" v-text="item.user.nickname"></p>
              <p class="discuss-li-p" v-text="new Date(item.time).toLocaleDateString().substr(0,10).replace(/\//g,'-')"></p>
            </div>
          </div>
          <div class="discuss-li-info" v-text="item.content"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      show:true,
      discuss:'',
      hotUser:[]
    }
  },
  created(){
    var _this=this;
    //获取评论地址
    var query=this.$route.query;
    this.$http.get(this.config.api+'/comment/music',{
      params:{
        id:query.id
      }
    }).then(function(res){
      if(res.data.code==200){
        _this.discuss=res.data;
      };
    })
  },
  watch:{
    'discuss':{
      handler:'getHotUser',
      deep:true
    }
  },
  methods:{
    getHotUser(){
      
    },
    back(){
      // this.$store.commit('setList',{playlist:{
      //   name:'',
      //   coverImgUrl:'',
      //   first:true
      // }});
      this.$router.go(-1);
      
    }
  }
}
</script>

<style>
.discuss{
  width: 100%;
  min-height: 100%;
  background: #fff;
  position: relative;
  z-index: 120;
}
.discuss-li{
  border-bottom: 1px solid #eee;
}
.discuss-title{
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: rgba(0, 0, 0, 1);
  color: #f4ea2a;
  text-align: center;
  font-size: 15px;
  font-family: 'microsoft yahei';
  position: fixed;
  top: 0;
  left: 0;
}
.discuss-content{
  width: 100%;
  padding-top: 1rem;
}
.discuss-content-title{
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-indent: 0.1rem;
  background: #eee;
  color: #666;
}
.discuss-li-title{
  width: 100%;
  height: 1rem;
  margin-top: 0.2rem; 
}
.discuss-li-img{
  width: 0.8rem;
  height: 0.8rem;
  float: left;
  margin: 0 0.1rem;
}
.discuss-li-img img{
  border-radius:0.4rem; 
}
.discuss-li-name p{
  
}
.discuss-li-info{
  width: 100%;
  box-sizing: border-box;
  padding: 0.32rem 0 0.2rem 1rem;
}
</style>
