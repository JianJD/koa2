import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home'
import layout from '@/components/layout'
import createProduct from '@/view/createProduct'
import productList from '@/view/productList'
import addClass from '@/view/addClass'
import orderManger from '@/view/orderManger'
import shopManger from '@/view/shopManger'
import aboutUs from '@/view/aboutUs'
import addArticle from '@/view/addArticle'
import articleList from '@/view/articleList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      redirect:'/shopManger',
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
        {
          path: '/shopManger',
          name: 'shopManger',
          component: shopManger,
          meta:{
            title:'店铺营销'
          }
        },
        {
          path: '/aboutUs',
          name: 'aboutUs',
          component: aboutUs,
          meta:{
            title:'关于我们'
          }
        },
        {
          path: '/addArticle',
          name: 'addArticle',
          component: addArticle,
          meta:{
            title:'文章管理'
          }
        },
        {
          path: '/articleList',
          name: 'articleList',
          component: articleList,
          meta:{
            title:'文章列表'
          }
        },
      ]
    },
  ]
})
