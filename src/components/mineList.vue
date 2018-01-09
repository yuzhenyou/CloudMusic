<template>
  <div class="mineList">
    <Top></Top>
    <div class="mineList">
      <ul class="mineList-ul">
        <div class="mineList-title">创建的歌单</div>
        <li class="mineList-li" v-for='(item,index) in data.playlist' :key="index" @click="resetData" v-if="item.userId==userData.profile.userId">
          <router-link :to="{path:'/list',query:{id:item.id}}">
          <div class="mineList-li-img">
            <img :src="item.coverImgUrl" alt="">
          </div>
          <div class="mineList-li-name">
            <p class="mineList-li-t1" v-text="item.name"></p>
            <p class="mineList-li-t2"><span v-text="item.trackCount"></span><span>首</span></p>
          </div>
          </router-link>
        </li>
        <div class="mineList-title">收藏的歌单</div>
        <li class="mineList-li" v-for='(item,index) in data.playlist' :key="index" @click="resetData" v-if="item.userId!==userData.profile.userId">
          <router-link :to="{path:'/list',query:{id:item.id}}">
          <div class="mineList-li-img">
            <img :src="item.coverImgUrl" alt="">
          </div>
          <div class="mineList-li-name">
            <p class="mineList-li-t1" v-text="item.name"></p>
            <p class="mineList-li-t2"><span v-text="item.trackCount"></span><span>首</span></p>
          </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Top from '@/components/top'
export default {
name: 'mineList',
  data () {
    return {
      data: ''
    }
  },
  computed: {
    ...mapGetters([
      'list',
      'activeId',
      'userData'
    ]),
  },
  created(){
    var _this=this;
    this.$http.get(this.config.api+'/user/playlist',{
      params:{
        uid:this.userData.profile.userId
      }
    }).then(function(res){
      if(res.data.code==200){
        _this.data=res.data;
      };
    })
  },
  mounted(){
    if(this.userData.first){
      this.$router.replace('/login')
    }
  },
  methods:{
    resetData(){
      var _this=this
      _this.$store.commit('setList',{playlist:{
        name:'',
        coverImgUrl:'',
        first:true
      }});
    }
  },
  components:{
    Top
  }
}
</script>

<style>
.mineList{
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.mineList-title{
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  background: #eee;
  text-indent: 0.1rem;
}
.mineList-li{
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid #eee;
}
.mineList-li-img{
  width: 0.9rem;
  height: 0.9rem;
  float: left;
  margin: 0.05rem;
}
.mineList-li-name{
  width: 6rem;
  height: 1rem;
  padding: 0.1rem;
  box-sizing: border-box;
  float: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.mineList-li-t1{
  color: #333;
}
.mineList-li-t2 span{
  font-size: 9px;
}
</style>

