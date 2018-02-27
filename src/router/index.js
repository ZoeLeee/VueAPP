import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import floodInfo from '@/components/flood-info.vue'
import floodLore from '@/components/flood-lore.vue'
import dynamicDetail from '@/components/dynamic-detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children:[
        {
          path: '/',
          name: 'info',
          redirect:'/info',
        },
        {
          path: '/info',
          component: floodInfo,
        },
        {
          path: '/lore',
          name: 'lore',
          component: floodLore,
        },
      ]
      
    },
    {
      path:'/dyDetail/:did/:type',
      component:dynamicDetail
    }
  ]
})
