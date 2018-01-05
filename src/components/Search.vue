<template>
  <div class="searchs">
    <div class="search-details">
        <div class="search-title">
          <div class="back" @click="back"></div>
          <i class="search-icon"></i>
          <input class="search-input" type="text" v-model="searchVal" ref="search" >
          <div class="search-btn" @click="search">搜索</div>
        </div>
        <div class="search-main">
          <div class="search-main-title">
              <ul class="search-ul">
                <li class="search-li" v-for="(item,index) in searchResult.songs" :key="item.id" @click="setUrl(item.id)" :style="{color:item.id==activeId?'#f54b37':'#333'}">
                  <i class="search-index">{{index+1}}</i>
                  <p class="search-name">
                    <span  v-text="item.name"></span>-<span class="search-singer-name" v-text="item.artists[0].name" :style="{color:item.id==activeId?'#f54b37':'#666'}"></span>
                  </p>
                </li>
              </ul>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      show:true,
      searchVal:'',
      searchResult:'',
      songsName:''
    }
  },
  computed: {
    ...mapGetters([
      'userData',
      'activeId'
    ])
  },
  methods:{
    back (){
      history.go(-1);
    },
    search(){
      var _this=this;
      this.$http.get(this.config.api+'/search',{
        params:{
          keywords:_this.searchVal
        }
      }).then(function(res){
        if(res.data.code==200){
          _this.searchResult=res.data.result;
        };
      })
    },
    setUrl(id){
      var _this=this;
      //获取歌曲地址
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
    }
  },
  directives: {
    // focus(el){
    //   el.focus();
    // }
  },
  mounted(){
    
  }
}
</script>
<style scoped>
.searchs{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  position: relative;
  padding-bottom: 1rem; 
}
.search-title{
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #eee;
  position: relative;
  position: fixed;
  top: 0;
  left: 0;
}
.search-details{
  width: 100%;
  background: #fff;
  padding-top: 1rem;
}
.search-input{
  display: inherit;
  width: 6rem;
  height: 0.6rem;
  border: none;
  outline: none;
  text-indent: 0.6rem;
  border-radius:0.3rem; 
  background: #ddd;
}
.back{
  width: 0.7rem;
  height: 0.4rem;
  line-height: 1rem;
  text-align: center;
  float: left;
  font-size: 30px;
  background: url(../../static/img/back.png) no-repeat 0.1rem center;
  background-size: 80%;
}
.search-icon{
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  background: url(../../static/img/search1.png) no-repeat 0.1rem center;
  background-size: 80%;
  position: absolute;
  top: 0.2rem;
  left: 0.75rem;
}
.search-btn{
  width: 0.75rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  float: right;
  font-size: 13px;
  color: #333;
}
.search-main-title{

  font-size: 15px;
  margin: 0.2rem 0;
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
  text-align: center
}
.search-name{
  float: left;
  width: 6.5rem;
  height: 0.7rem;
  line-height: 0.7rem;
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
