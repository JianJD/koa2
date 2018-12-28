<template>
  <div>
   <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-nav" v-for="(item,index) in list" :key='index'>
            <MenuItem name="1" v-if="!item.children">
              <Icon type="ios-paper" />
                {{item.txt}}
            </MenuItem>
               <Submenu name="2" v-for='(item2,index2) in item.children' :key='index2' v-if="item.children">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        {{item.title}}
                    </template>
                   <MenuItem :name="item2.path">
                     {{item.txt}}
                  </MenuItem> 
              </Submenu>
        </div>
    </Menu>
  </div>
</template>

<script>
export default {
    name:'Headernav',
  data() {
    return {
        list:[
            {
                path:'/',
                title:'商品管理',
                txt:'发布商品',
                icon:'ios-keypad',
                children:[
                    {
                        txt:'发布商品',
                        path:'/createProduct',
                    }
                   
                ]
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
<style lang='' scoped>
</style>