<template>
  <div class="nav">
      <div class="nav-list"  v-for="item in navList" :key="item.name">
         
      </div>
  </div>
</template>
<script>
export default {
  data (){
      return{
          navList:[
              
          ]
      }
  }
}
</script>
<style scoped>
.nav{
    width: 100%;
    height: 1.2rem;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: -1px -1px 5px rgba(0,0,0,0.1);
    background: #fff;
    z-index: 10;
}
.nav-list{
    width: 1rem;
    height: 0.8rem;
    display: flex;
    justify-content: center;
    flex-flow: wrap;
}
.nav-icon{
    width: 0.5rem;
    height: 0.5rem;
}
.nav-name{
    width: 100%;
    text-align: center;
}
.nav-img{
    display: inline-block;
    width: 100%;
    height: 100%;
}
</style>
