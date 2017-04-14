<template>
    <div class="content">
      <ul>
        <li class="list" v-for="item in datas" :key="item.name" @click="setPicUrl(item.name)">
          {{item.name}}
          <router-link class="point" :to="{path:'/songs',query: {type:'search',s:item.name}}">
          </router-link>
        </li>
      </ul>
    </div> 
</template>

<script>
export default {
  name: 'index',
  data:function(){
    return {
      datas:[
        {name:'周杰伦'},
        {name:'张国荣'},
        {name:'薛之谦'},
        {name:'林俊杰'},
        {name:'陈奕迅'},
        {name:'张学友'},
        {name:'李荣浩'},
        {name:'李玉刚'},
        {name:'张靓颖'},
        {name:'张宇'},
        {name:'莫文蔚'},
        {name:'Beyond'},
        {name:'A-Lin'},
        {name:'王菲'},
        {name:'王杰'},
        {name:'Psy'},
        {name:'莫文蔚'},
        {name:'S.H.E'},
        {name:'汪峰'},
        {name:'许嵩'},
        {name:'张杰'},
        {name:'许巍'},
        {name:'赵雷'},
        {name:'王力宏'},
        {name:'邓紫棋'},
        {name:'蔡健雅'},
        {name:'谢安琪'},
        {name:'庄心妍'},
        {name:'Bruno Mars'},
        {name:'Alan Walker'},
        {name:'Charlie Puth'},
        {name:'Hans Zimmer'},
        {name:'James Horner'},
        {name:'Adele'},
        {name:'Taylor Swift'},
        {name:'Carly Rae Jepsen'},
      ]

    }
  },
  methods:{
    setPicUrl:function(){
      this.$store.commit('setPicUrl','');
      this.$store.commit('setPicName','');
    },
    pause(){
      this.$store.commit('setIsPlay',false);
    }
  }
}
</script>


<style scoped>
ul{
  padding-bottom:17%;
}
.list{
  width:100%;
  height:40px;
  line-height:40px;
  padding-left:5%;
  position:relative;
  border-bottom:1px solid #ccc;
}
.list .point{
  display:block;
  width:100%;
  height:40px;
  position:absolute;
  top:0;
  left:0;
}

</style>





