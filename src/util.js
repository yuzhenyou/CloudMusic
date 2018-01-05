export default{
  install(Vue,options)
  {
    Vue.prototype.formatSeconds=function(value) {
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
    },
    Vue.prototype.parseLyric=function (text) {
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
  }
}