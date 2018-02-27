<template>
  <div>
    <router-view></router-view>
    <!-- 底部切换栏 -->
    <mt-tabbar :fixed=true ref="bottomNav">
      <mt-tab-item id="info" href="#/info">
        <i  slot="icon" class="icon iconfont icon-fangxunxinxi"></i>
        汛情信息
      </mt-tab-item>
      <mt-tab-item id="lore" href="#/lore">
        <i to="/lore" slot="icon" class="icon iconfont icon-fangxunzhishi"></i>
        防汛知识
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Tabbar, TabItem } from 'mint-ui';
  import { TabContainer, TabContainerItem } from 'mint-ui';
  //汛情信息组件
  import floodInfo from './flood-info.vue';
  //防汛知识组件
  import floodLore from './flood-lore.vue';
  
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);

  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
 
  export default {
    data(){
      return {
        selected:"info",
      }
    },
    components:{floodInfo,floodLore},
    mounted(){
      
    }
  }
</script>

<style scoped>
  a:focus,a:hover{
    text-decoration: none;
  }
  
</style>