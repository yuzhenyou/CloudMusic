<template>
  <div class="login">
      <div class="backs" @click="back"> 
        <img src="../../static/img/back.png" alt="">
      </div>
      <div class="title">登录账号</div>
      <div class="login-content">
          <!-- <label class="login-label">手机号</label> -->
          <input class="login-input" type="text" v-model="phone" placeholder="手机号码">
      </div>
      <div class="login-content">
          <!-- <label class="login-label">密码</label> -->
          <input class="login-input" type="text" v-model="password" placeholder="密码">
      </div>
      <div class="login-btn">
        <button class="btn" @click="login">登录</button>
      </div>
  </div>

</template>

<script>
export default {
  data(){
    return{
      phone:'',
      password:''
    }
  },
  methods:{
    login(){
      var _this=this
      this.$http.get(this.config.api+'/login/cellphone',{
        params:{
          phone:_this.phone,
          password:_this.password
        }
      }).then(function(res){
        if(res.data.code==200){
          _this.$store.commit('setUserData',res.data);
          _this.$router.replace('/');
          window.sessionStorage.setItem('userData',JSON.stringify(res.data));
        }else{
          _this.$message(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    back(){
      history.go(-1)
    }
  }
}
</script>

<style scoped>
.login{
  width: 100%;
  height: 100%;
  position: relative;
}
.title{
  width: 100%;
  height: 1rem;
  line-height:1rem;
  text-align: center;
  background: rgba(0,0,0, 1); 
  color: #f4ea2a;
  font-size: 16px;
  margin-bottom: 2rem;
}
.login-content{
  margin: 0.5rem 0;
  display: flex;
  justify-content: center;
}
.login-label{
  display: block;
  width: 1rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: justify;
}
.login-input{
  width: 4rem;
  height: 0.6rem;
  border: 0;
  border-bottom: 1px solid #ddd;
  outline: none;
  text-indent: 0.1rem; 
}
.login-btn{
  display: flex;
  justify-content: center;
}
.btn{
  width: 4rem;
  height: 0.6rem;
  border: 0;
  background: #000;
  color: #f4ea2a;
  border-radius: 0.1rem;
  outline: none;
}
</style>
