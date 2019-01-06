import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home'
import layout from '@/components/layout'
import createProduct from '@/view/createProduct'
import productList from '@/view/productList'
import addClass from '@/view/addClass'
import orderManger from '@/view/orderManger'
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
        {
          path: '/addClass',
          name: 'addClass',
          component: addClass,
          meta:{
            title:'添加分类'
          }
        },
        {
          path: '/orderManger',
          name: 'orderManger',
          component: orderManger,
          meta:{
            title:'订单管理'
          }
        },
      ]
    },
  ]
})
