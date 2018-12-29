import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home'
import layout from '@/components/layout'
import createProduct from '@/view/createProduct'
import productList from '@/view/productList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: layout,
      children:[
        {
          path: '/productList',
          name: 'productList',
          component: productList,
          meta:{
            title:'商品管理'
          }
        },
        {
          path: '/createProduct',
          name: 'createProduct',
          component: createProduct,
          meta:{
            title:'发布商品'
          }
        },
      ]
    },
  ]
})
