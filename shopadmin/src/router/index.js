import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home'
import layout from '@/components/layout'
import createProduct from '@/view/createProduct'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: layout,
      children:[
        {
          path: '/',
          name: 'productManage',
          component: createProduct,
          meta:{
            title:'发布商品'
          }
        },

      ]
    },
  ]
})
