<template>
    <div class="content">
      <div class="player">
        <audio :src="url" controls=""  autoplay="" id="player" preload="true" @timeupdate='timeupdate(widthline,Lrc)'  @ended="nextPlay()" @canplay="startPlay(lyric)"></audio>
        <div class="playertop">
          <p class="title" @click="showMain()">{{this.title}}</p>
          <div class="btn">
            <div class="btnlist" @click="showList">
              <img src="../../static/img/list.png">
            </div>
            <div class="btnplay" @click="togglePlay(isPlay)">
              <img v-bind:src="this.paused">
            }
            }
            </div>
            <div class="btnnext" @click="nextPlay()">
              <img src="../../static/img/next.png">
            </div>
          </div>
        </div>
        <div class="progress">
          <div class="progressw" v-bind:style="{width:widthline+'%'}"></div> 
        </div>
      </div>
      <div class="alist" v-bind:style="{top:top}" @transitionend="changeOpacity">
        <div class="hideList" @click="hideList" v-bind:style="{opacity:opacity}"></div>
        <div class="showList">
          <p class="listTitle">播放列表（{{playList.length}}）</p>
          <ul>
            <li v-for="(item,index) in playList" :class="{active:currentIndex==index}">
              <p class="listName" @click="play(item.id,item.name,item.old,{'id':item.id,now:item.old})"><span class="listIndex">{{index+1}}</span>{{item.name}}</p>
              <span class="delete" @click="pop(index,playList)">X</span>
            </li>
          </ul>
        </div> 
      </div>
      
      <div class="MainPlayer" v-bind:style="{top:mainTop}">
        <div class="showLrc">
          <ul v-html="this.Lrcs" class="lrc" v-bind:style="{top:LrcTop}"> 
          </ul>
        </div>
        <div @click="hideMain" class="back">
          <img src='../../static/img/backed.png'>
        </div>
        <div class="TimeBar"><i class="showTime showTimeStart">{{this.time}}</i><mu-slider v-model="value" class="slider" @change="showValue(widthline)"/><i class="showTime showTimeEnd">{{this.all}}</i></div>
        <div class="playBtn">
          <div class="btns">
            <div class="btnpres" @click="prePlay()">
              <img src="../../static/img/pre.png">
            </div>
            <div class="btnplays" @click="togglePlay(isPlay)">
              <img v-bind:src="this.paused">
            </div>
            <div class="btnnexts" @click="nextPlay()">
              <img src="../../static/img/next1.png">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

function formatSeconds(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
            if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
        }
    }   
        if(parseInt(theTime)<10){
           var result = "0:0"+parseInt(theTime)+"";
        }else{
           var result = "0:"+parseInt(theTime)+""; 
        }
        if(theTime1 > 0) {
          if(parseInt(theTime)<10){
            result="0"+parseInt(theTime);
          }else{
             result=parseInt(theTime);
          }
        result = "0"+parseInt(theTime1)+":"+result;
        }
        /*if(theTime2 > 0) {
        result = ""+parseInt(theTime2)+"小时"+result;
        }*/
    return result;
}
function parseLyric(text) {
    var lines = text.split('\n'),
        pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g,
        result = [];
    while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
    };
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function(v, i , a) {

        var time = v.match(pattern),

            value = v.replace(pattern, '');

        time.forEach(function(v1, i1, a1) {

            var t = v1.slice(1, -1).split(':');

            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
    });

    result.sort(function(a, b) {
        return a[0] - b[0];
    });
    return result;
}
import axios from 'axios'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'index',
  data:function(){
    return {
      datas:'',
      src:'../../static/img/playing.png',
      mainTop:100+'%',
      top:100+'%',
      opacity:0,
      show:false,
      time:'',
      all:'',
      value:0,
      showLrc:'',
      LrcTop:200+'px',
    }
  },
  watch:{
    widthline(n,o){
      this.value=n;
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
      'lyric',
      'Lrc',
      'Lrcs',
      'now',
      'currentIndex',
      'playList',
      'paused'
    ])
  },
  methods:{
      showList(){
        this.top=0;
        this.show=true;
      },
      hideList(){
        this.top=100+'%';
        this.show=false;
      },
      changeOpacity(){
        if(this.opacity==0){
          this.opacity=0.4;
        }else{
          this.opacity=0;
        } 
      },
      showlyric(lyric){
          var str=parseLyric(lyric);
          this.$store.commit('setLrc',str);
      },
      showValue(widthline){
        var player=document.querySelector('#player');
        var time;
        time=(this.value*player.duration)/100;
        player.currentTime=time;
        this.$store.commit('setwidthline',this.value);
      },
      showMain(){
        this.mainTop=0;
      },
      hideMain(){
        this.mainTop=100+'%';
      },
      play(id,name,now,item){
      var _this=this;
      this.$store.commit('settitle',name);
      this.$store.commit('setid',id);
      this.$store.commit('setPlayList',item);
      this.$store.commit('setNow',now);
      this.$store.commit('setNowId',id);
      axios.get('http://localhost:8088/song',{
          params: {
            "type":'song',
            id:id,
            br:128000 
          }
        }).then(function(res){
          _this.$store.commit('seturl',res.data.data[0].url);
          _this.hideList();
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
      pop(index,playList){
        this.$store.commit('removePlayList',index);
        this.hideList();
        if(playList.length!=0){
          this.nextPlay();
        } 
      },
      togglePlay(isPlay){
        var player=document.querySelector('#player');
        if(isPlay){
          player.pause();
          this.$store.commit('setPaused',"../../static/img/playing.png");
          this.$store.commit('setIsPlay',false)
        }else{
          player.play();
          this.$store.commit('setPaused',"../../static/img/pasued.png");
          this.$store.commit('setIsPlay',true)
        } 
      },
      startPlay(lyric){
        this.$store.commit('setIsPlay',true);
        this.$store.commit('setPaused',"../../static/img/pasued.png");
        this.showlyric(lyric);
      },
      endPlay(){
        this.$store.commit('setIsPlay',false);
        this.$store.commit('setPaused',"../../static/img/playing.png");
        this.$store.commit('setLrcs','');
      },
      prePlay(){
        this.$store.dispatch("pre");
        this.Lrcs='';
      },
      nextPlay(){
        this.$store.dispatch("next");
        this.Lrcs='';
      },
      timeupdate(widthline,Lrc){
      	var player=document.querySelector('#player');
      	var currentTime=parseInt(player.currentTime);
        var duration=parseInt(player.duration);
        this.time=formatSeconds(currentTime);
        this.all=formatSeconds(duration);
      	var widthline=(currentTime/duration)*100;
      	this.$store.commit('setwidthline',widthline);
      	this.$store.commit('setcurrentTime',player.currentTime);
      	this.$store.commit('setduration',player.duration);
        if(Lrc.length!=0){
          for(var i=0;i<Lrc.length;i++){
            if(player.currentTime>Lrc[i][0]){
              this.LrcTop=-i*40+150+'px';
              for(var j=0;j<Lrc.length;j++){
                document.querySelectorAll('.lrc li')[j].style.color="#ccc"
              }
              if(i>=1){

                document.querySelectorAll('.lrc li')[i].style.color="#66bb6a";
              }
              
            }
          }
        }
      }
  }
}

</script>


<style scoped>
.content{
  width:100%;
}
.player{
  width:100%;
  height:65px;
  box-shadow:0px -1px 5px #ccc;
  position:fixed;
  bottom:0;
  background:#fff;
}
.player audio{
  width:100%;
  display:none;
}
.playertop{
  width:100%;
  height:30px;
  margin:10px; 
}
.title{
  width:50%;
  height:40px;
  line-height:40px;
  float:left;
}
.btn{
  height:40px;
  line-height:30px;
  float:right;
  margin-right:20px;
}
.btn img{
  width:100%;
  height:100%;
}
.btn div{
  float:left;
}
.btnlist{
  width:20px;
  height:23px;
  margin:9px 20px 0 15px; 
}
.btnplay{
  width:40px;
  height:40px;
}
.btnnext{
  width:25px;
  height:25px;
  margin:9px 15px 0 15px;
}
.btnpause{
  background:#ff5722;
}
.progress{
  width:100%;
  height:2px;
  background:#fff;
  display:inline-block;
}
.progressw{
  width:100%;
  height:2px;
  background:red;
}
.alist{
  width:100%;
  height:100%;
  position:fixed;
  top:100%;
  transition:all 0.3s;
}
.hideList{
  width:100%;
  height:62%;
  background:#000;
  opacity:0;
}
.showList{
  width:100%;
  height:40%;
  background:#fff;
  overflow:auto;
  padding-bottom:10px;
}
.showList li{
  height:40px;
  line-height:40px;
  position:relative;
  border-bottom:1px solid #dfdfdf;
}
.listTitle{
  text-align:center;
  margin:5px 0;
}
.listName{
  height:40px;
  line-height:40px;
  margin-right:40px;
}
.listIndex{
  display:block;
  width:30px;
  height:30px;
  float:left;
  text-align:center;
}
.delete{
  width:30px;
  height:30px;
  line-height:30px;
  color:red;
  position:absolute;
  top:0;
  right:0;
  text-align:center;
}
.MainPlayer{
  width:100%;
  height:100%;
  position:fixed;
  top:0;
  background:rgba(0,0,0,0.9);
  transition:all 0.3s;
  z-index:30;
}
.showLrc{
  width:70%;
  height:40%;
  margin:20% auto;
  overflow:hidden;
  color:#fff;
  position:relative;
}
.lrc{
  width:100%;
  position:absolute;
  top:150px;
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
.slider{
  width:55%;
  display:inline-blcok;
  height:30px;
  margin-bottom:0;
  position:absolute;
  left:22.5%;
}
.TimeBar{
  width:100%;
  height:30px;
}
.showTime{
  width:10%;
  display:inline-block;
  text-align:center;
  height:30px;
  line-height:30px;
  position:absolute;
  color:#fff;
}
.showTimeStart{
  left:10%;
}
.showTimeEnd{
  right:10%;
}
.playBtn{
  width:70%;
  height:15%;
  margin:10px auto;
  display:flex;
  align-items:center;  
}
.btns{
  width:100%;
  height:50px;
  display:flex;
  justify-content:space-between;
  align-items:center;  
}
.btnpres,.btnnexts,.btnplays{
  width:30%;
  height:100%;
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
}
.btnplays img{
  display:block;
  width:50px;
  height:50px; 
}
.btnpres img,.btnnexts img{
  display:block;
  width:40px;
  height:40px;
}
.active{
  color:red;
}

</style>
