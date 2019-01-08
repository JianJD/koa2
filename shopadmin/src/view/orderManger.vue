<template>
  <div>
   <div class="mgb20">订单状态</div>
      <RadioGroup v-model="status" class="mgb20">
        <Radio :label="item.orderStatus" v-for="item in orderStatus" :key='item.orderStatus'>
            <span>{{item.name}}</span>
        </Radio>
    </RadioGroup>
     <Table border  :columns="columns" :data="list">
       <template slot-scope="{ row }" slot="address">
          <div>{{JSON.parse(row.addressInfo).receiver}}
              {{JSON.parse(row.addressInfo).receiverPhone}}
              {{JSON.parse(row.addressInfo).receiverProvince}}
              {{JSON.parse(row.addressInfo).receiverCity}}
              {{JSON.parse(row.addressInfo).receiverArea}}
              {{JSON.parse(row.addressInfo).receiverAddress}}
          </div>
        </template>
        <template slot-scope="{ row }" slot="productInfo">
          <div v-for='(item,index) in JSON.parse(row.productInfo) ' :key='index'>
            <img :src="imgUrl+JSON.parse(item.productInfo.swiperImg)[0].url" alt="" class="img inline" />
            <div class="inline">
              {{item.productInfo.productTitle}}
               <div><span class="col999">分类：</span>{{item.specInfo.color}}{{item.specInfo.size}}</div>
               <div><span class="col999">数量：</span>{{item.orderNum}}</div>
            </div>
           
          </div>
        </template>
         <template slot-scope="{ row }" slot="orderStatus">
            <div v-if="row.orderStatus==0">待付款</div>
             <div v-if="row.orderStatus==1">待发货</div>
             <div v-if="row.orderStatus==2">待收货</div>
              <div v-if="row.orderStatus==3">已完成</div>
        </template>
        <template slot-scope="{ row ,index }" slot="edit">
           <Button type="error" size='small' icon='ios-trash-outline' v-if="row.orderStatus==0" @click='delOrder(index)'>删除</Button>
           <Button type="primary" size='small' icon='md-create' @click="send(index)">发货</Button>
           
        </template>
       </Table>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        list:[],
        imgUrl:this.imgUrl,
        columns: [
            {
                title: '客户名称',
                key: 'userName',
                width:100
            },
            {
                title: '收货地址',
                key: 'addressInfo',
                width:200,
                slot:'address',
                align:'left'
            },
            {
                title: '商品信息',
                key: 'productInfo',
                slot:'productInfo',
                  width:500,
            },
           
            {
                title: '订单价格',
                key: 'totalMoney',
                 width:100,
                 align:'center'
            },
          
            {
                title: '订单状态',
                key: 'orderStatus',
                slot:'orderStatus',
                 width:100,
                 align:'center'
            },
            {
                title: '操作',
                slot:'edit'
            }

        ],
        orderStatus:[
          {
            orderStatus:1,
            name:'代发货'
          },
          {
            orderStatus:2,
            name:'已发货'
          },
          {
            orderStatus:3,
            name:'已完成'
          },
        ],
        status:0,
        pageIndex:1
      };
    },

    components: {},

    computed: {},
    mounted() {
      this.getOrderList()
    },

    methods: {
      getOrderList(){
        this.api.getOrderList({
          pageIndex:this.pageIndex,
          pageSize:10,
          orderStatus:this.status
        }).then(res=>{
          if(res.data.Code==1)
          {
            this.list=res.data.Data.List
          }
        })
      },
      delOrder(idx){
        this.api.delOrder({
          orderId:this.list[idx].orderId
        }).then(res=>{
          if(res.data.Code==1)
          {
            this.list.splice(idx,1)
            if(this.list.length==0)
            {
              this.getOrderList()
            }
          }
        })
      },
      send(idx){
        this.api.sendForOrder({
          orderId:this.list[idx].orderId 
        }).then(res=>{
          if(res.data.Code==1)
          {
            this.list.splice(idx,1)
            if(this.list.length==0)
            {
              this.getOrderList()
            }
          }
        })
      }
    },

    watch: {
      status(){
        this.getOrderList()
      }
    }

  }

</script>
<style  scoped>
.inline{display: inline-block;vertical-align: top;}
.img{width: 50px;height: 50px;margin-right: 10px;}

</style>