<template>
    <div class="content">
      <h2>{{this.datas.title}}</h2>
      <h5>
         评分：{{this.average}}
      </h5>
      <h5>类型：{{this.genres}}</h5>
      <h5>国家：{{this.countries}}</h5>
      <div class="summary">
        <p class='summary-about'>剧情简介：{{this.datas.summary}}</p>
        <div class="summary-img">
          <img v-bind:src="this.images">
        </div>
      </div>
    </div> 
</template>

<script>
export default {
  name: 'index',
  data:function(){
    return {
      datas:'',
      average:'',
      images:'',
      genres:'',
      countries:'',
      directors:''
    }
  },
  computed: {
    value() {
      return this.$store.state.counter;
    }
  },
  created () {
      this.fetchData()
  },
  watch: {
      '$route': 'fetchData'
  },
  methods:{
      fetchData:function() {
      		var _this=this;
          _this.$root.headerTitle="文章";
          var query=_this.$route.query;
          this.$http.get('http://localhost:8088/subject/',{
            params:{
              id:query.id
            }
          }).then(function(res){
            _this.datas=res.data;
            _this.average=res.data.rating.average;
            _this.images=res.data.images.large;
            _this.genres=res.data.genres;
            _this.countries=res.data.countries;
          });
      }
  }
}
</script>


<style scoped>
h2,h5{
  margin:10px 0;
}
.content{
  width:90%;
  padding-left:10px;
}
.summary{
  width:100%;
  height:100%;
  padding-left:10px;
}
.summary-img{
  float:right;
  width:30%;
  height:150px;
  margin-left:5%;
}
.summary-img img{
  display:inline-block;
  width:100%;
  height:100%;
}
.genres{
  margin:10px 0;
  float:left;
}
.summary-about{
  width:65%;
  float:left;
  text-align:justify;
}
</style>





