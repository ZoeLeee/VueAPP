<template>
  <div>
    <nav ref="navLore">
      <div @click="tabContainer('lore')">
        <a href="javascript:;">
          <i class="icon iconfont icon-fangxunzhishi"></i>
        </a>
        <div>防汛知识</div>
      </div>
      <div @click="tabContainer('plan')">
        <a href="javascript:;">
          <i class="icon iconfont icon-fangxunyuan"></i>
        </a>
        <div>防汛预案</div>
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
      <!-- 内容显示区 -->
      <mt-tab-container v-model="actived" ref="loreList">
        <mt-tab-container-item id="lore">
          <mt-cell v-for="item of loreLists" :key="item.id" 
          :title="item.title" 
          :label="item.createTime | covertTime"
          :to="'/dyDetail/'+item.id+'/lore'" 
          is-link></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="plan">
          <mt-cell v-for="item of planLists" :key="item.id" 
          :title="item.title" 
          :label="item.createTime | covertTime"
          :to="'/dyDetail/'+item.id+'/plan'" 
          is-link></mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </mt-loadmore>
  </div>
</template>

<script>

  import Vue from 'vue';
  import { TabContainer, TabContainerItem } from 'mint-ui';
  import { Cell } from 'mint-ui';
  import { Loadmore } from 'mint-ui';
  import { Spinner } from 'mint-ui';
  Vue.component(Cell.name, Cell);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  Vue.component(Loadmore.name, Loadmore);
  Vue.component(Spinner.name, Spinner);
  
  export default {
    data(){
      return {
        actived:"lore",
        loreLists:[],
        planLists:[],
        // 若为真，则 bottomMethod 不会被再次触发
        allLoaded:false,
        topStatus: '',
        bottomStatus:'',
        loreCurrentPage:1,
        planCurrentPage:1 
      }
    },
    methods:{
      tabContainer(cid){
        if(cid != this.actived){
          this.actived=cid;
        }
      },
      loadTop(){
        if(this.actived=="lore"){
          this.$http({
            method: 'get',
            url: 'http://test.jmeet.cc/api/knowledge/queryByType.do?type=1&currentPage=1'
          }).then(response => {
            if(response){
              if(response.data.data.list){
                this.loreCurrentPage=1;
                this.loreLists=response.data.data.list;  
              }
              this.$refs.loadmore.onTopLoaded();
            }
          });
        }else if(this.actived=="plan"){
          this.$http({
            method: 'get',
            url: 'http://test.jmeet.cc/api/knowledge/queryByType.do?type=2&currentPage=1'
          }).then(response => {
            // console.log(response);
            if(response){
              if(response.data.data.list){
                this.planCurrentPage=1;
                this.planLists=response.data.data.list;
              }
              this.$refs.loadmore.onTopLoaded();
            }
          });
        }   
      },
      loadBottom(){
        if(this.actived=="lore"){
          this.loreCurrentPage++;
          this.$http({
            method: 'get',
            url: 'http://test.jmeet.cc/api/knowledge/queryByType.do?type=1&currentPage='+this.loreCurrentPage
          }).then(response => {
            // console.log(response);
            if(response){
              if(response.data.data.list){
                for(let list of response.data.data.list){
                  this.loreLists.push(list)
                }
              }
              this.$refs.loadmore.onBottomLoaded();
            }
          });
          // 预案详情板块
        } else if (this.actived=="plan"){
          this.planCurrentPage++;
          this.$http({
            method: 'get',
            url: 'http://test.jmeet.cc/api/knowledge/queryByType.do?type=2&currentPage='+this.planCurrentPage
          }).then(response => {
            // console.log(response);
            if(response){
              if(response.data.data.list){
                for(let list of response.data.data.list){
                  this.planLists.push(list)
                }
              }
              this.$refs.loadmore.onBottomLoaded();
            }
          });
          
        } 
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
        let topNavHeight=this.$refs.navLore.getBoundingClientRect().height;
        // 底部固定导航栏高度
        // console.log(document.querySelector(".mint-tabbar").getBoundingClientRect().height);
        let bottomNavHeight=document.querySelector(".mint-tabbar").getBoundingClientRect().height;
        //列表高度,减去边距20px;
        let listHeight=window.screen.height-topNavHeight-bottomNavHeight;
     
        document.querySelector(".mint-tab-container").style.height=listHeight-20+"px";
        document.querySelector(".mint-loadmore").style.marginTop=topNavHeight+20+"px"
      }
    },
    mounted(){
      this.loadTop();
      this.setListHeight();
    },
    watch:{
      actived:function(){
        this.loadTop();
      },
    }
  }
</script>

<style scoped>
  a:focus,a:hover{
    text-decoration: none;
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
    width: 50%;
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
  .mint-cell{
    border-bottom: 1px solid #E6E6E6;
  }
  .mint-tab-container{
    overflow: auto;
  }
</style>