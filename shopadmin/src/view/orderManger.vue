<template>
  <div>
   <div class="mgb20">订单状态</div>
      <RadioGroup v-model="status" class="mgb20">
        <Radio :label="item.orderStatus" v-for="item in orderStatus" :key='item.orderStatus'>
            <span>{{item.name}}</span>
        </Radio>
    </RadioGroup>
     <Table border  :columns="columns" :data="list" :stripe='true' size='small' >
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
          <div v-for='(item,index) in JSON.parse(row.productInfo) ' :key='index' class="flexCls pro_box">
            <img :src="imgUrl+item.imgUrl[0].url" alt="" class="img inline" />
            <div class="inline flexCls-1">
              <div class="title_pro">{{item.productTitle}}</div>
               <div  v-for="item2 in item.detailSpec" :key="item2.name" class="specCls"><span class="col999">{{item2.name}}:</span>{{item2.value}}</div>
               <div class="num">数量：X{{item.num}}</div>
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
           <Button type="primary" size='small' icon='md-create' @click="send(index)" v-if="row.orderStatus==1">发货</Button>
        </template>
       </Table>
       <div class="mgt20 txt-center"><Page :total="total" @on-change='changePage' :page-size='10'/></div>
        
         <Modal v-model="showSend" title="发货">
           <Form ref="formData" :model="formData" inline>
              <FormItem prop="company" label='快递公司'>
              <Select v-model="formData.company" style="width:200px">
                  <Option v-for="(item,index) in express" :value="item.code" :key="index">{{ item.txt }}</Option>
              </Select>
              </FormItem>
              <FormItem prop="code" label='快递单号'>
                  <Input type="text" v-model="formData.code" placeholder="请输入快递单号"></Input>
              </FormItem>
           </Form>
           <div slot="footer">
          <Button type="text" size="large" @click="close">取消</Button>
          <Button type="primary" size="large" @click="confirm">确定</Button>
        </div>
         </Modal>
  </div>
</template>

<script>
  import express from '@/assets/js/express'
  export default {
    data () {
      return {
        express:express.arr,
        showSend:false,
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
                width:400,
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
                slot:'edit',
                 width:260,
            }

        ],
        orderStatus:[
          {
            orderStatus:0,
            name:'待付款'
          },
          {
            orderStatus:1,
            name:'待发货'
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
        pageIndex:1,
        formData:{
          company:'',
          code:''
        },
        sendIndex:null,
        total:0
      };
    },

    components: {},

    computed: {},
    mounted() {
      this.getOrderList()
    },

    methods: {
      changePage(res){
        this.pageIndex=res;
        this.getOrderList()
      },
      confirm(){
        this.api.sendForOrder({
          orderId:this.list[this.sendIndex].orderId 
        }).then(res=>{
          if(res.data.Code==1)
          {
            this.list.splice(idx,1)
            this.showSend=false
            if(this.list.length==0)
            {
              this.getOrderList()
            }
          }
        })
      },
      close(){
        this.showSend=false
      },
      getOrderList(){
        this.api.getOrderList({
          pageIndex:this.pageIndex,
          pageSize:10,
          orderStatus:this.status
        }).then(res=>{
          if(res.data.Code==1)
          {
            this.list=res.data.Data.List
            this.total=parseInt(res.data.Data.totalPage)*10
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
        this.sendIndex=idx;
        this.showSend=true
        
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
.title_pro{font-weight: bold;}
.specCls{font-size: 10px;color: #999;background: #f1f1f1;margin-bottom: 2px;display: inline-block;margin-right: 20px;padding: 2px 5px;border-radius: 5px;}
.flexCls{display: flex;}
.flexCls-1{flex: 1;}
.num{text-align: right;color: #999;}
.pro_box{padding: 10px;background: #f1f1f1;margin-bottom: 10px;}
</style>