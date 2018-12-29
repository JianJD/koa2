<template>
  <div class="pd20">
      <Form  ref="formValidate" :model="formValidate" label-position="top" >
          <FormItem label="商品标题" prop="productTitle">
              <Input v-model="formValidate.productTitle" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="商品会员价" prop="memberPrice">
              <Input v-model="formValidate.memberPrice"  placeholder="请输入商品会员价格"></Input>
          </FormItem>
          <FormItem label="商品原价" prop="price">
              <Input v-model="formValidate.price" placeholder="请输入商品原价"></Input>
          </FormItem>
          <FormItem label="商品库存" prop="stock">
              <Input v-model="formValidate.stock" placeholder="请输入商品原价"></Input>
          </FormItem>
          <FormItem label="商品运费" prop="sendMoney">
              <Input v-model="formValidate.sendMoney" placeholder="请输入商品原价"></Input>
          </FormItem>
          <FormItem label="商品分类" prop="classId">
              <Select v-model="formValidate.classId" style="width:200px">
                <Option v-for="item in classList" :value="item.classId" :key="item.classId">{{ item.className }}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否上架" prop="isForSale">
               <i-switch v-model="formValidate.isForSale" size="large">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
               </i-switch>
          </FormItem>
            <FormItem label="商品轮播图" prop="isForSale">
                <upload :uploadList='formValidate.swiperImg' @success='uploadSuccess'></upload>
          </FormItem>
          <FormItem label="商品详情" prop="productDetail">
            <editor :contentp='formValidate.productDetail' @success="editorSuccess"></editor>
          </FormItem>
             <Button type="success" :style="{display:'block',margin:'0 auto'}" @click="save">保存</Button>
        </Form>
       
  </div>
</template>

<script>
  import upload from '../components/upload';
  import editor from '../components/editor';
  export default {
    data () {
      return {
        formValidate:{
          productTitle:'',
          memberPrice:'',
          price:'',
          stock:'',
          sendMoney:'',
          isForSale:true,
          Type:0,
          productDetail:'',
          swiperImg:[],
          classId:0,
          childrenProduct:'123'
        },
        classList:[]
      };
    },

    components: {
      upload,
      editor
    },

    computed: {},
    mounted() {
      console.log(this.$route.query)
      if(this.$route.query.productId)
      {
        this.api.getProductInfo({productId:this.$route.query.productId}).then(res=>{
          if(res.data.Code==1)
          {
            let data=res.data.Data[0]
            this.$set(this.formValidate,'productTitle',data.productTitle)
            this.$set(this.formValidate,'memberPrice',data.memberPrice)
            this.$set(this.formValidate,'price',data.price)
            this.$set(this.formValidate,'stock',data.stock)
            this.$set(this.formValidate,'sendMoney',data.sendMoney)
            this.$set(this.formValidate,'isForSale',data.isForSale==1?true:false)
            this.$set(this.formValidate,'productDetail',data.productDetail)
            this.$set(this.formValidate,'swiperImg',JSON.parse(data.swiperImg))
            this.$set(this.formValidate,'classId',data.classId)
            this.$set(this.formValidate,'productTitle',data.productTitle)
             this.$set(this.formValidate,'productId',data.productId)
            this.$set(this.formValidate,'Type',1)
          }
        })
      }
      this.getClassList()
    },

    methods: {
      editorSuccess(res){
        this.formValidate.productDetail=res
      },
      // 上传图片上传成功事件
      uploadSuccess(res){
        this.swiperImg=res
      },
      // 获取商品分类
      getClassList(){
        this.api.getClassList('').then(res=>{
          console.log(res)
          if(res.data.Code==1)
          {
            this.classList=res.data.Data
          }
        })
      },
      // 保存
      save(){
        if(!this.formValidate.productTitle)
        {
         this.$Message.error('请输入商品标题')
         return 
        }
        if(!this.formValidate.memberPrice)
        {
         this.$Message.error('请输入商品会员价')
         return 
        }
        if(!this.formValidate.price)
        {
         this.$Message.error('请输入商品原价')
         return 
        }
        if(!this.formValidate.stock)
        {
         this.$Message.error('请输入商品库存')
         return 
        }
        if(!this.formValidate.swiperImg)
        {
         this.$Message.error('请先上传商品轮播图')
         return 
        }
        let data= JSON.parse(JSON.stringify(this.formValidate));
        data.swiperImg=JSON.stringify(data.swiperImg)
        data.isForSale=data.isForSale?1:0
        this.api.createProduct(data).then(res=>{
          console.log(res)
          if(res.data.Code==1)
          {
              this.$Message.success('保存成功')
              if(this.formValidate.Type==1)
              {
                this.$router.back(-1)
              }
          }
        })
      }
    },

    watch: {}

  }

</script>
<style scoped>
.ivu-form-inline .ivu-form-item{
  width: 300px;
}
.ivu-input-wrapper{width: 50% !important;}
</style>