<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import storeHeader from './components/header'
export default {
  name: 'app',
  components:{storeHeader}
}
</script>

<style>
  html{
    font-size: 10px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    background: #FAF9FE;
  }
  @media screen and (min-width: 768px){
    body{
      width: 768px;
      margin: 0 auto;
    }
  }
</style>
