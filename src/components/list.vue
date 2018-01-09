<template>
  <div class="list" v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)">
    <div class="list-title" ref="list">
      <canvas id="c1"></canvas>
      <div class="list-title-content">
        <div class="list-title-back">
          <div class="backs" @click="back"> 
            <img src="../../static/img/back.png" alt="">
          </div>
        <div class="list-title-name">
          歌单
        </div>
      </div>
        <div class="list-title-img">
          <img :src="list.playlist.coverImgUrl"  ref="listImg">
        </div>
        <div class="list-title-des" v-text="list.playlist.name">
        </div>
      </div>
    </div>
    <div class="search-main-title">
        <ul class="search-ul clearfix">
          <li class="search-li" v-for="(item,index) in list.playlist.tracks" :key="item.id" @click="setUrl(item.id)" :style="{color:item.id==activeId?'#f54b37':'#333'}">
            <i class="search-index">{{index+1}}</i>
            <p class="search-name">
              <span  v-text="item.name"></span>-<span class="search-singer-name" v-text="item.ar[0].name" :style="{color:item.id==activeId?'#f54b37':'#666'}"></span>
            </p>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name:'list',
  data(){
    return{
      loading:true
    }
  },
  computed: {
    ...mapGetters([
      'list',
      'activeId'
    ]),
  },
  created(){
    var _this=this;
    var query=this.$route.query;
    this.$http.get(this.config.api+'/playlist/detail',{
      params:{
        id:query.id
      }
    }).then(function(res){
      if(res.data.code==200){
        _this.$store.commit('setList',res.data);
      };
    })
  },
  watch:{
    'list':{
      handler:'canvas',
      deep:true
    }
  },
  mounted(){
    
  },
  methods:{
    back(){
      history.go(-1)
    },
    setUrl(id){
      var _this=this;
      //获取歌曲地址
      this.$store.commit('setLrc','');
      this.$store.commit('setActiveId',id);
      this.$http.get(this.config.api+'/music/url',{
        params:{
          id:id,
          br:'320000'
        }
      }).then(function(res){
        if(res.data.code==200){
          _this.$store.commit('setUrl',res.data.data[0].url);
        };
      })
      //获取歌词
      this.$http.get(this.config.api+'/lyric',{
        params:{
          id:id
        }
      }).then(function(res){
        if(res.data.code==200){
          var str=_this.parseLyric(res.data.lrc.lyric);
          _this.$store.commit('setLrc',str); 
        };
      })
      //获取歌曲信息
      this.$http.get(this.config.api+'/song/detail',{
        params:{
          ids:id
        }
      }).then(function(res){
        if(res.data.code==200){
          _this.$store.commit('setSongsInfo',res.data.songs[0])
        };
      })
    },
    canvas(n,o){
      var _this=this;
      if(o.playlist.first){
        var canvas = document.getElementById("c1");
        var context = canvas.getContext("2d");
        var w=this.$refs.list.getBoundingClientRect().width
        var h=this.$refs.list.getBoundingClientRect().height
        canvas.height=250;
        canvas.width=w;
        var img = new Image();
        img.src=this.list.playlist.coverImgUrl;
        img.onload = function(){
            context.drawImage(img,0,0,2,2,0,0,w,250);
            _this.loading=false;
        }
      }
    }
  }
}
</script>

<style>
.list{
  width: 100%;
}
.list-title{
  width: 100%;
  height: 250px;
  position: relative;
}
.list-title-back{
  width: 80%;
  height: 50px;
  margin: 0 auto;
}
.list-title-name{
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  text-align: center;
  font-family: 'microsoft yahei';
  color: rgb(255, 255, 255);
  text-shadow:5px 2px 6px #000;
  /* -webkit-text-stroke-width:0.7px;
	-webkit-text-stroke-color:#fff; */
}
.list-title-content{
  width: 100%;
  height: 250px;
  position: absolute;
  top: 0;
  left: 0;
}
.list-title-img{
  width: 130px;
  height: 130px;
  margin: 30px 30px;
  float: left;
}
.list-title-img img{
  margin:-1px;
  border:none;
}
img[src=""]{
  opacity: 0;
}
.list-title-des{
  width: 3rem;
  height: 130px;
  float: left;
  margin: 30px 0;
  color: rgb(255, 255, 255);
  text-shadow:5px 2px 6px #000;
}
.search-ul{
  padding-bottom:0.8rem; 
}
.search-li{
  width: 100%;
  height: 0.7rem;
  float: left;
}
.search-index{
  float: left;
  width: 0.5rem;
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
  font-size: 10px;
}
.search-main-title{
  font-size: 15px;
  margin: 0.2rem 0;
}
.search-name{
  float: left;
  width: 6.5rem;
  height: 0.7rem;
  line-height: 0.7rem;
  text-indent: 0.1rem;
  border-bottom: 1px solid #eee;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap; 
}
.search-singer-name{
  font-size: 9px;
  color: #666;
}
</style>
