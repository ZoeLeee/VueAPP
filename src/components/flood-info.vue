<template>
  <div>
    <!-- 导航模块 3列2行-->
    <nav ref="navInfo">
      <div>
        <a href="">
          <i class="icon iconfont icon-chengshiqixiang"></i>
        </a>
        <div>城市气象</div>
      </div>
      <div>
        <a href="">
          <i class="icon iconfont icon-tianqishikuang"></i>
        </a>
        <div>天气实况</div>
      </div>
      <div>
        <a href="">
          <i class="icon iconfont icon-taifenglujing"></i>
        </a>
        <div>台风路径</div>
      </div>
      <div>
        <a href="">
          <i class="icon iconfont icon-qixiangleida"></i>
        </a>
        <div>气象雷达</div>
      </div>
      <div>
        <a href="">
          <i class="icon iconfont icon-weixingyuntu"></i>
        </a>
        <div>卫星云图</div>
      </div>
      <div>
        
      </div>
    </nav>
    <mt-loadmore :autoFill='false' :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"    ref="loadmore"  @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
      <!-- 上拉刷新样式 -->
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <mt-spinner type="triple-bounce" class=""  color="#26a2ff" v-show="topStatus === 'loading'"></mt-spinner>
      </div>
      <!-- 下拉刷新样式 -->
      <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↑</span>
        <mt-spinner type="triple-bounce" class=""  color="#26a2ff" v-show="bottomStatus === 'loading'"></mt-spinner>  
      </div>
      <div class="dynamic-list" ref="dyList">
        <mt-cell title="防汛动态">
          <i slot="icon" class="icon iconfont icon-fangxundongtai"></i>
        </mt-cell>    
        <mt-cell v-for="item of dynamiclists" :key="item.id" 
          :title="item.title" 
          :label="item.createTime | covertTime"
          :to="'/dyDetail/'+item.id+'/info'" 
          is-link></mt-cell>     
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Cell } from 'mint-ui';
  import { Loadmore } from 'mint-ui';
  import { Spinner } from 'mint-ui';
  import unity from '@/unity/unity';
  Vue.component(Cell.name, Cell);
  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Spinner.name, Spinner);

  export default {
    data(){
      return {
        // 动态列表
        dynamiclists:[],
        // 若为真，则 bottomMethod 不会被再次触发
        allLoaded:false,
        //下拉状态
        topStatus: '',
        //上拉状态
        bottomStatus:'',
        currentPage:1     
      }
    },
    methods:{
      loadTop(){
          this.$http({
            method: 'get',
            url: 'http://test.jmeet.cc/api/dynamic/query.do?currentPage=1'
          }).then(response => {
            // console.log(response);
            if(response){
              if(response.data.data.list){
                this.currentPage=1;
                this.dynamiclists=response.data.data.list;
              }
              this.$refs.loadmore.onTopLoaded();
            }
          });
      },
      loadBottom(){
        this.currentPage++;
        this.$http({
          method: 'get',
          url: 'http://test.jmeet.cc/api/dynamic/query.do?currentPage='+this.currentPage,
        }).then(response => {
          // console.log(this.dynamiclists);
          if(response){
            if(response.data.data.list){
              for(let list of response.data.data.list){
                this.dynamiclists.push(list)
              }
            }
            this.$refs.loadmore.onBottomLoaded();
          }
        });
      },
      handleTopChange(status) { 
        this.topStatus = status;
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      // 适配列表部分高度
      setListHeight(){
    
        // 顶部导航栏高度
        // console.log(this.$refs.navInfo.getBoundingClientRect().height);
        let topNavHeight=this.$refs.navInfo.getBoundingClientRect().height;
        // 底部固定导航栏高度
        // console.log(document.querySelector(".mint-tabbar").getBoundingClientRect().height);
        let bottomNavHeight=document.querySelector(".mint-tabbar").getBoundingClientRect().height;
        //列表高度,减去边距20px;
        let listHeight=window.screen.height-topNavHeight-bottomNavHeight;
        this.$refs.dyList.style.height=listHeight-20+"px";
        document.querySelector(".mint-loadmore").style.marginTop=topNavHeight+20+"px"
      }
    },
    mounted(){
      this.loadTop();
      this.setListHeight();
    }
  }   
</script>

<style scoped>
  a:focus,a:hover{
    text-decoration: none;
  }
  .text-center{
    margin: 0 auto;
  }
  /* 导航部分样式 */
  nav{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    z-index: 10
  }
  nav>div{  
    width: 33.33333333%;
    text-align: center;
    padding: 2.5rem 2.3rem;
    border:1px solid #E6E6E6;
    flex-grow: 1;
    background: #fff;
  }
  nav>div:first-child>a{
    color: #79B7FF;
  }
  nav>div:nth-child(2)>a{
    color: #2D77D0;
  }
  nav>div:nth-child(3)>a{
    color: #F09333;
  }
  nav>div:nth-child(4)>a{
    color: #22B13F;
  }
  nav>div:nth-child(5)>a{
    color: #25BFB7;
  }
  /* 动态列表样式 */
  .dynamic-list{
    
  }
  .dynamic-list>a:first-child{
    color:#2D77D0;
    font-size: 1.8rem;
  }
  .dynamic-list>a:first-child .iconfont{
    font-size: 3.5rem;
  }
  .mint-cell{
    border-bottom: 1px solid #E6E6E6;
  }
  .mint-loadmore{
    margin-top: 19rem;
  }
</style>