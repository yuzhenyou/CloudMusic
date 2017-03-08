<template>
  <div id="app">
    <div class='header'>
      <div class='header-main'>
        <div class="header-menu">
          <div class="menu">
            <img src="../static/img/menu.png">
          </div>
        </div>
        <div class="header-nav">
          <div class="main">
            <img src="../static/img/main2.png">
          </div>
          <div class="music">
            <img src="../static/img/music.png">
          </div>
          <div class="user">
            <img src="../static/img/user.png">
          </div>
        </div>
        <div class="header-search">
          <div class="search">
            <img src="../static/img/search.png">
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <player></player>
  </div>
</template>

<script>
import player from './components/player'
import index from './components/index'
export default {
  name: 'app',
  data(){
    return{
      data:''    
    }
  },
  computed: {
    value() {
      return this.$store.state.counter;
    }
  },
  methods: {
    increment() {
      this.$store.commit('sum', 2)
    },
    show(){
      console.log(this.value);
    }
  },
  components:{
    index,
    player
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
ul li{
  list-style:none;
}
a{
  text-decoration:none;
  color:#666;
}
html,body{
  width:100%;
  height:100%;
}
#app{
  width:100%;
  height:100%;
}
.content{
  padding-top:60px;
}
.LrcList{
  width:100%;
  height:40px;
  line-height:40px;
  text-align:center;
}
.header{
  width:100%;
  height:60px;
  position:fixed;
  top:0;
  z-index:20;
  opacity:1;
  background:#f44336;
  box-shadow:0px 1px 5px #ccc;
}
.header-main{
  height:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:0 18px;
}
.header-menu{
  width:10%;
  height:100%;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
}
.header-nav{
  width:40%;
  height:100%;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
}
.header-search{
  width:10%;
  height:100%;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
}
.menu,
.search{
  width:25px;
  height:25px;
}
.main,
.music{
  width:30px;
  height:30px;
}
.user{
  width:30px;
  height:33px;
}
.menu img,
.main img,
.music img,
.user img,
.search img{
  display:block;
  width:100%;
  height:100%;
}

</style>
