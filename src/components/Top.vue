<template>
      <!-- 导航栏 -->
     <div class="nav">
        <div class="user">
          <router-link to="/mine">
            <img :src="avatarUrl" alt="">
          </router-link>
        </div>
        <div class="menu">
          <div class="mine">我的</div>
          <div class="home">首页</div>
          <div class="find">发现</div>
        </div>
        <!-- 搜索 -->
        <div class="search">
          <router-link to="/search">
            <img src="../../static/img/search.png" alt="">
          </router-link>
        </div>
     </div>     
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {

        avatarUrl:'../../static/img/user.png'

    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  methods:{
    
  },
  mounted(){
    if(!this.userData.first){
      this.avatarUrl=this.userData.profile.avatarUrl;
    }
  }
}
</script>

<style>
.nav{
  width: 100%;
  height: 1rem;
  background: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index:100;
}
.user{
  width: 0.6rem;
  height: 0.6rem;
}
.user img{
  border-radius: 0.3rem;
}
.menu{
  width: 3rem;
  height: 1rem;
  line-height: 1rem;
}
.menu div{
  width: 1rem;
  float: left;
  color: #f4ea2a;
  font-family: 'microsoft yahei';
  text-align: center;
}
.search{
  width: 0.6rem;
  height: 0.6rem;
}
</style>
