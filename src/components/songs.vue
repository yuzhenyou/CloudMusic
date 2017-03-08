<template>
    <div class="content">
      <div class="singer">
        <img class="pic" :src="this.picUrl">
        <div @click="back" class="back">
          <img src='../../static/img/backed.png'>
          <p class="singerName">{{this.picName}}</p>
        </div>
      </div>
      <ol>
        <li class="list" v-for="(item,index) in datas" :key="item.name" :class="{active:item.id==nowId}">
          <span class="index">{{index+1}}</span>
          <div class="point" :data-id="item.id" @click="play(item.id,item.name,{id:item.id,now:index}),setCurrent(index)">{{item.name}}</div>
        </li>
      </ol>
    </div> 
</template>

<script>
import axios from 'axios'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'index',
  data:function(){
    return {
      datas:''
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'title',
      'url',
      'code',
      'widthline',
      'currentTime',
      'duration',
      'isPlay',
      'index',
      'picUrl',
      'picName',
      'now',
      'nowId',
      'currentIndex',
      'playList'
    ])
  },
  created () {
      this.fetchData();
  },
  watch: {
      '$route': ['fetchData']
  },
  methods:{
      play(id,name,item){
        var _this=this;
        this.$store.commit('setLrcs','');
        this.$store.commit('setlyric','');
        this.$store.commit('setLrc','');
        this.$store.commit('settitle',name);
        this.$store.commit('setid',id);
        this.$store.commit('setPlayList',item);
        this.$store.commit('setNowId',id);
        axios.get('http://localhost:8088/song',{
          params: {
            "type":'song',
            id:id,
            br:128000 
          }
        }).then(function(res){
          _this.$store.commit('seturl',res.data.data[0].url);
        });
        axios.get('http://localhost:8088/song',{
          params: {
            "type":'lyric',
            id:id,
            br:128000 
          }
        }).then(function(res){
          _this.$store.commit('setlyric',res.data.lrc.lyric);
        });
      },
      setCurrent(index){
         this.$store.commit('setNow',index);
      },
      back(){
        history.go(-1)
      },
      fetchData:function() {
          var query=this.$route.query;
          var _this=this;
          axios.get('http://localhost:8088/content',{
            params: {
              "type":'search',
              "s": query.s,
              "limit":100
            }
          }).then(function(res){
            _this.datas=res.data.result.songs;

          });
          axios.get('http://localhost:8088/singer',{
            params: {
              "type":'search',
              "search_type":100,
              "s":query.s
            }
          }).then(function(res){
            var picUrl='';
            var picName='';
            picUrl=res.data.result.artists[0].picUrl;
            picName=res.data.result.artists[0].name;
            _this.$store.commit('setPicName',picName);
            _this.$store.commit('setPicUrl',picUrl);
          });
      }
  }
}
</script>


<style scoped>
*{
  margin:0;
  padding:0;
}
body{
  overflow-x:hidden; 
}
.content{
  width:100%;
  padding-top:60px;
}
ol{
  padding-bottom:17%;
  overflow-x:hidden; 
}
.active{
  color:red;
}
.list{
  width:100%;
  height:40px;
  line-height:40px;
  position:relative;
  list-style-type:none;
}
.index{
  display:block;
  width:40px;
  height:40px;
  line-height:40px;
  font-weight:bold;
  float:left;
  text-align:center;
}
.list .point{
  display:block;
  margin-left:40px;
  border-bottom:1px solid #dfdfdf;
  width:100%;
  height:40px;
  position:absolute;
  top:0;
  left:0;
}
.singer{
  width:100%;
  height:320px;
  position:relative;
  top:-1px;
  overflow:hidden; 
}
.singer img{
  border:0;
  display:block;
  width:100%;
  height:100%;
}
.back{
  width:100%;
  height:30px;
  position:absolute;
  top:10px;
  left:10px;
}
.back img{
  float:left;
  width:35px;
  height:30px;
  margin-right:20px;
}
.singerName{
  width:3350px;
  height:35px;
  line-height:35px;
  color:#fff;
  font-size:20px;
}

</style>





