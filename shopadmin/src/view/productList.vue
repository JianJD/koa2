<!--  -->
<template>
  <div>
      <div class="mgb20">商品分类</div>
      <RadioGroup v-model="formData.classId" class="mgb20">
        <Radio :label="item.classId" v-for="item in classList" :key='item.classId'>
            <span>{{item.className}}</span>
        </Radio>
    </RadioGroup>
    <div class="mgb20">是否上架</div>
      <RadioGroup v-model="formData.isForSale" class="mgb20">
        <Radio :label="1" >
            <span>已上架</span>
        </Radio>
        <Radio :label="0" >
            <span>已下架</span>
        </Radio>
    </RadioGroup>
       <Table border  :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="img">
            <img :src="imgUrl+item2.url" alt="" class="img" v-for="item2 in JSON.parse(row.swiperImg)" :key='item2.url'>
        </template>
         <template slot-scope="{ row }" slot="isForSale">
            <div>{{row.isForSale==1?'已上架':'已下架'}}</div>
        </template>
        <template slot-scope="{ row ,index }" slot="edit">
           <Button type="error" size='small' icon='ios-trash-outline' @click='delProduct(index)'>删除</Button>
           <Button type="primary" size='small' icon='md-create' @click="edit(index)">编辑</Button>
           <Button type="warning" size='small' icon='md-arrow-up' v-if="row.isForSale==0" @click="upAndDow(index,1)">上架</Button>
            <Button type="warning" size='small' icon='md-arrow-down' v-if="row.isForSale==1" @click="upAndDow(index,0)">下架</Button>
        </template>
       </Table>
       <div class="mgt20 txt-center"><Page :total="total" :page-size="10" @on-change='changePage'/></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        imgUrl:this.imgUrl,
        columns: [
            {
                title: '产品名称',
                key: 'productTitle',
                width:150
            },
             {
                title: '产品类别',
                key: 'className',
                width:100
            },
            {
                title: '产品库存',
                key: 'stock',
                width:100,
                align:'center'
            },
            {
                title: '产品图片',
                key: 'swiperImg',
                slot:'img'
            },
            {
                title: '产品会员价',
                key: 'memberPrice',
                 width:100,
                 align:'center'
            },
            {
                title: '产品原价',
                key: 'price',
                 width:100,
                 align:'center'
            },
            {
                title: '销售量',
                key: 'saleNum',
                 width:100,
                 align:'center'
            },
            {
                title: '是否上架',
                key: 'isForSale',
                slot:'isForSale',
                 width:100,
                 align:'center'
            },
            {
                title: '操作',
                slot:'edit'
            }

        ],
        list:[],
        classList:[],
        formData:{
            classId:0,
            pageIndex:1,
            pageSize:10,
            isForSale:1
        },
        total:0
    };
  },
  created() {
      this.getClassList()
      this.getProductList()
  },

  methods: {
      changePage(res){
          this.formData.pageIndex=res;
          this.getProductList()
      },
    //   删除商品
    delProduct(idx){
        this.api.delProduct({productId:this.list[idx].productId}).then(res=>{
            if(res.data.Code==1)
            {
                this.list.splice(idx,1)
                if(this.list.length==0)
                {
                    this.getProductList()
                }
                this.$Message.success('删除成功')
            }
        })
    },
    // 获取商品列表
    getProductList(){
        this.api.getProductList(this.formData).then(res=>{
            if(res.data.Code==1)
            {
                this.list=res.data.Data.List;
                this.total=res.data.Data.totalPages*10
            }
        })
    },
    // 获取商品分类
      getClassList(){
        this.api.getClassList('').then(res=>{
          console.log(res)
          if(res.data.Code==1)
          {
              res.data.Data.unshift({
                  classId:0,
                  className:'全部'
              })
            this.classList=res.data.Data
          }
        })
      }, 
    //   商品上下架
    upAndDow(idx,Type){
        this.api.upAndDown({productId:this.list[idx].productId,Type}).then(res=>{
            if(res.data.Code==1)
            {
                this.getProductList()
            }
        })
    },
    // 编辑商品
    edit(idx)
    {
        this.$router.push({
            path:'/createProduct',
            query:{
                productId:this.list[idx].productId
            }
        })
    }
  },
  watch: {
      'formData.classId'(){
          this.formData.pageIndex=1;
          this.list=[]
         this.getProductList() 
      },
      'formData.isForSale'(){
          this.formData.pageIndex=1;
          this.list=[]
         this.getProductList()
      }
  },
}

</script>
<style  scoped>
.img{width: 50px;height: 50px;margin-right: 10px}
</style>