import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);


export const store=new Vuex.Store({
	state:{

		id:0,
		url:'',
		title:'',
		code:'',
		widthline:0,
		currentTime:0,
		duration:0,
		isPlay:false,
		picUrl:'',
		picName:'',
		index:0,
		currentIndex:0,
		now:-1,
		nowId:-1,
		playList:[],
		lyric:'',
		Lrc:[],
		Lrcs:'',
		paused:"../../static/img/playing.png"
	},
	getters:{
		id:state=>state.id,
		title:state=>state.title,
		url:state=>state.url,
		code:state=>state.code,
		widthline:state=>state.widthline,
		currentTime:state=>state.currentTime,
		duration:state=>state.duration,
		isPlay:state=>state.isPlay,
		picUrl:state=>state.picUrl,
		picName:state=>state.picName,
		index:state=>state.index,
		now:state=>state.now,
		nowId:state=>state.nowId,
		playList:state=>state.playList,
		currentIndex:state=>state.currentIndex,
		lyric:state=>state.lyric,
		Lrc:state=>state.Lrc,
		Lrcs:state=>state.Lrcs,
		paused:state=>state.paused,

	},
	mutations:{
		setid:(state,id)=>{state.id=id},
		settitle:(state,name)=>{state.title=name},
		seturl:(state,url)=>{state.url=url},
		setwidthline:(state,widthline)=>{state.widthline=widthline},
		setcurrentTime:(state,currentTime)=>{state.currentTime=currentTime},
		setduration:(state,duration)=>{state.duration=duration},
		setIsPlay:(state,isPlay)=>{state.isPlay=isPlay},
		setPicUrl:(state,picUrl)=>{state.picUrl=picUrl},
		setPicName:(state,picName)=>{state.picName=picName},
		setNow:(state,now)=>{state.now=now},
		setNowId:(state,nowId)=>{state.nowId=nowId},
		setlyric:(state,lyric)=>{state.lyric=lyric},
		setLrcs:(state,Lrcs)=>{state.Lrcs=Lrcs},
		setPaused:(state,paused)=>{state.paused=paused},
		setLrc:(state,Lrc)=>{
			state.Lrc=Lrc;
			var Lrcs='';
	        for(var i=0;i<Lrc.length;i++){
	            Lrcs+='<li data-id='+i+' class="LrcList">'+Lrc[i][1]+'</li>';
	        }
	          state.Lrcs=Lrcs;
		},
		setPreCurrentIndex:(state,currentIndex)=>{
			state.currentIndex--;
		      if (state.currentIndex <0) {
		        state.currentIndex = state.playList.length-1
		      }
		},
		setCurrentIndex:(state,currentIndex)=>{
			state.currentIndex++;
		      if (state.currentIndex >= state.playList.length) {
		        state.currentIndex = 0
		      }
		},
		setPlayList:(state,item)=>{
			var pushed=false;
			state.playList.forEach(function(e,i){
				if(item.id==e.id){
					pushed=true;
					state.currentIndex = i;
				}
			})
			if(!pushed){
				state.currentIndex = state.playList.length;
				state.playList.push({'id':item.id,'name':state.title,'current':state.currentIndex,'old':item.now});
			}
			
		},
		removePlayList:(state,index)=>{
			state.playList.splice(index,1);
			if(state.playList==0){
				state.url='';
				state.title='';
				state.widthline=0;
				state.isPlay=false;
				state.paused='../../static/img/pasued.png';
				state.Lrcs='';
			}
		}
	},
	actions:{
		pre:({state,commit})=>{
	        var id,title;
	        commit('setPreCurrentIndex');
	        id=state.playList[state.currentIndex].id;
	        title=state.playList[state.currentIndex].name;
	        commit('setNowId',id);
	        axios.get('http://localhost:8088/song',{
              params: {
                "type":'song',
                id:id,
                br:128000 
              }
            }).then(function(res){
              commit('seturl',res.data.data[0].url);
              commit('settitle',title);
            });
            axios.get('http://localhost:8088/song',{
	          params: {
	            "type":'lyric',
	            id:id,
	            br:128000 
	          }
	        }).then(function(res){
	          commit('setlyric','');
	          commit('setlyric',res.data.lrc.lyric);
	        });

		},
		next:({state,commit})=>{
	        var id,title;
	        commit('setCurrentIndex');
	        id=state.playList[state.currentIndex].id;
	        title=state.playList[state.currentIndex].name;
	        commit('setNowId',id);
	        axios.get('http://localhost:8088/song',{
              params: {
                "type":'song',
                id:id,
                br:128000 
              }
            }).then(function(res){
              commit('seturl',res.data.data[0].url);
              commit('settitle',title);
            });
            axios.get('http://localhost:8088/song',{
	          params: {
	            "type":'lyric',
	            id:id,
	            br:128000 
	          }
	        }).then(function(res){
	          commit('setlyric','');
	          commit('setlyric',res.data.lrc.lyric);
	        });

		}

	}
})