import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);
import util from '../util'
Vue.use(util);

var _this=new Vue();

export const store=new Vuex.Store({
	state:{
    fontSize:0,
    reloads:false,
    userData: JSON.parse(window.sessionStorage.getItem('userData'))||{
      profile:{
        avatarUrl:'../../static/img/user.png',
        nickname:'',
        
      },
      account:{
        createTime:'',
      },
      first:true
    },
    url:'',
    songsInfo:{
      id:'',
      name:'歌曲名称',
      ar:[
        {name:'专辑'}
      ],
      al:{
        name:'歌手',
        picUrl:'../../static/img/music.png'
      }
    },
    activeId:0,
    Lrc:'',
    Lrcs:'',
    playList:[],
    currentIndex:0,
    api:'http://192.168.51.46:3000',
    list:{
      playlist:{
        name:'',
        coverImgUrl:'',
        first:true
      }
    }
  },
  getters:{
    userData:state=>state.userData,
    reloads:state=>state.reloads,
    url:state=>state.url,
    songsInfo:state=>state.songsInfo,
    activeId:state=>state.activeId,
    Lrc:state=>state.Lrc,
    Lrcs:state=>state.Lrcs,
    playList:state=>state.playList,
    currentIndex:state=>state.currentIndex,
    list:state=>state.list,
  },
  mutations:{
    setUserData:(state,data)=>{state.userData=data},
    setReload:(state,data)=>{state.reloads=data},
    setUrl:(state,data)=>{state.url=data},
    setList:(state,data)=>{state.list=data},
    setPreCurrentIndex:(state,data)=>{
			state.currentIndex--;
		      if (state.currentIndex <0) {
		        state.currentIndex = state.playList.length-1
		      }
		},
    setCurrentIndex:(state,data)=>{
      state.currentIndex++;
      if (state.currentIndex >= state.playList.length) {
        state.currentIndex = 0
      }
    },
    setSongsInfo:(state,data)=>{
      state.songsInfo=data;
      var check=false;
      state.playList.forEach(function(e,i){
        if(data.id==e.id){
          check=true;
        }
      })
      if(!check){
        state.currentIndex = state.playList.length;
        state.playList.push(state.songsInfo);
      }
       
    },
    removePlayList:(state,index)=>{
			state.playList.splice(index,1);
			if(state.playList==0){
				state.songsInfo={
          id:'',
          name:'歌曲名称',
          ar:[
            {name:'专辑'}
          ],
          al:{
            name:'歌手',
            picUrl:'../../static/img/music.png'
          }
        }
			}
		},
    setActiveId:(state,data)=>{state.activeId=data},
    setPlayList:(state,data)=>{
      state.playList.push(state.songsInfo);
    },
    setLrc:(state,Lrc)=>{
      if(Lrc){
        state.Lrc=Lrc;
        var all='';
        for(var i=0;i<Lrc.length;i++){
            all+='<li data-id='+i+' class="LrcList">'+Lrc[i][1]+'</li>';
        }
        state.Lrcs=all;
      }
    },
  },
  actions:{
    pre:({state,commit})=>{
      var id,title;
      commit('setPreCurrentIndex');
      state.Lrc="";
      id=state.playList[state.currentIndex].id;
      title=state.playList[state.currentIndex].name;
      //获取歌曲地址
      commit('setActiveId',id);
      axios.get(state.api+'/music/url',{
        params:{
          id:id,
          br:'320000'
        }
      }).then(function(res){
        if(res.data.code==200){
          commit('setUrl',res.data.data[0].url);
        };
      })
      //获取歌词
      axios.get(state.api+'/lyric',{
        params:{
          id:id
        }
      }).then(function(res){
        if(res.data.code==200){
          var str=_this.parseLyric(res.data.lrc.lyric);
          commit('setLrc',str); 
        };
      })
      //获取歌曲信息
      axios.get(state.api+'/song/detail',{
        params:{
          ids:id
        }
      }).then(function(res){
        if(res.data.code==200){
          commit('setSongsInfo',res.data.songs[0])
        };
      })

    },
    next:({state,commit})=>{
      var id,title;
      commit('setCurrentIndex');
      state.Lrc="";
      id=state.playList[state.currentIndex].id;
      title=state.playList[state.currentIndex].name;
      //获取歌曲地址
      commit('setActiveId',id);
      axios.get(state.api+'/music/url',{
        params:{
          id:id,
          br:'320000'
        }
      }).then(function(res){
        if(res.data.code==200){
          commit('setUrl',res.data.data[0].url);
        };
      })
      //获取歌词
      axios.get(state.api+'/lyric',{
        params:{
          id:id
        }
      }).then(function(res){
        if(res.data.code==200){
          var str=_this.parseLyric(res.data.lrc.lyric);
          commit('setLrc',str); 
        };
      })
      //获取歌曲信息
      axios.get(state.api+'/song/detail',{
        params:{
          ids:id
        }
      }).then(function(res){
        if(res.data.code==200){
          commit('setSongsInfo',res.data.songs[0])
        };
      })
    }
  }
})