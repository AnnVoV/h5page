var u = navigator.userAgent, app = navigator.appVersion;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var checkMobile = function(){
  if(isAndroid || isiOS){
    return true;
  }else{
    return false;
  }
}

if(!checkMobile()){
  window.location.href="www.baidu.com";
}