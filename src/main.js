// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// 引入css文件
import './assets/css/base.css';
import './assets/css/demo.css';
import './assets/css/iconfont.css';
import 'mint-ui/lib/style.css';
//给Date对象添加日期格式化方法
Date.prototype.format = function(fmt) { 
  var o = { 
      "M+" : this.getMonth()+1,                 //月份 
      "d+" : this.getDate(),                    //日 
      "h+" : this.getHours(),                   //小时 
      "m+" : this.getMinutes(),                 //分 
      "s+" : this.getSeconds(),                 //秒 
      "q+" : Math.floor((this.getMonth()+3)/3), //季度 
      "S"  : this.getMilliseconds()             //毫秒 
  }; 
  //如:yyyy
  if(/(y+)/.test(fmt)) {
          fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  }
  //yyyy-MM-dd hh:mm:ss
  for(var k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
  return fmt; 
}  

Vue.config.productionTip = false
Vue.prototype.$http= axios
//全局方法
Vue.filter('covertTime', function (value) {
  // console.log(Date(value));
  return new Date(Date(value)).format("yyyy-MM-dd hh:mm:ss");
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
