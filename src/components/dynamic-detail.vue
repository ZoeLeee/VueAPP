<template>
  <div>
    <!-- 详情标题部分 -->
    <div class="detail-title">
      <h1>{{dynamiclistDetail.title}}</h1>
      <p>发布单位：{{dynamiclistDetail.deptName
}}</p>
      <p>{{dynamiclistDetail.createTime | covertTime}}</p>
    </div>
    <!-- 详情内容部分 -->
    <div class="detail-content" v-html="dynamiclistDetail.content"></div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        dynamiclistDetail:[]
      }
    },
    mounted(){
      console.log(this.$route.params);
      this.getDynamiclist(this.$route.params.did)
    },
    methods:{
      getDynamiclist(did){
        if(this.$route.params.type=="info"){
          this.$http({
            method: 'get',
            url: 'http://test.jmeet.cc/api/dynamic/detail.do?id='+did
          }).then(response => {  
            if(response){
              this.dynamiclistDetail=response.data.data;
            }         
          });
        }else{
          this.$http({
            method: 'get',
            url: 'http://test.jmeet.cc/api/knowledge/detail.do?id='+did
          }).then(response => {  
            if(response){
              this.dynamiclistDetail=response.data.data;
            }         
          });
        }
      }
    }
    
  }
</script>

<style scoped>
  .detail-title{
    background: #fff;
    padding: 1.5rem;
    color:#999999;
    margin-bottom:1.5rem; 
  }
  h1{
    font-size: 1.8rem;
    color: #333333;
  }
  p{
    margin-top: 1.5rem;
  }
  .detail-content{
    background: #fff;
    margin: 1.4rem;
    height: 300px;
  }
</style>