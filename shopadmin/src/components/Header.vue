<template>
  <div>
   <Menu mode="vertical" theme="light" active-name="1" width="auto" :class="menuitemClasses">
        <div class="layout-nav" v-for="(item,index) in list" :key='index'>
            <MenuItem :name="item.path" v-if="item.children=='undefind'" :to='item.path'>
              <Icon type="ios-paper" />
                <span>{{item.txt}}</span>
            </MenuItem>
               <Submenu name="2"  v-if="item.children!='undefind'">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                       <span>{{item.title}}</span>
                    </template>
                   <MenuItem :name="item2.path" :to='item2.path'  v-for='(item2,index2) in item.children' :key='index2'>
                    <span>{{item2.txt}}</span>
                  </MenuItem> 
              </Submenu>
        </div>
    </Menu>
  </div>
</template>

<script>
export default {
    name:'Headernav',
    props:{
        menuitemClasses:{
            type:[String,Array],
            default:''
        }
    },
  data() {
    return {
        list:[
            {
                path:'/',
                title:'商品管理',
                txt:'发布商品1',
                icon:'ios-keypad',
                children:[
                    {
                        txt:'发布商品',
                        path:'/createProduct',
                    },
                    {
                        txt:'商品列表',
                        path:'/productList',
                    },
                     {
                        txt:'产品分类',
                        path:'/addClass',
                    }
                   
                ]
            },
            
             {
             path:'/orderManger',
            title:'订单管理',
            txt:'订单管理',
            icon:'ios-keypad',  
            children:'undefind' 
            }
        ]
    };
  },

  components: {},

  computed: {},
  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style>
.ivu-menu {
    width: 100% !important;
}
.layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .collapsed-menu .ivu-icon-ios-arrow-down:before{
        display: none !important;
    }
     .collapsed-menu .ivu-menu-item{
         display: none !important;
     }
</style>