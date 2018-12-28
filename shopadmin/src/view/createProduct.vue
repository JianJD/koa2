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
          <FormItem label="是否上架" prop="isForSale">
               <i-switch v-model="formValidate.isForSale" size="large">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
               </i-switch>
          </FormItem>
            <FormItem label="商品轮播图" prop="isForSale">
                <upload></upload>
          </FormItem>
          <Button type="success" :style="{display:'block',margin:'0 auto'}">保存</Button>
        </Form>
       
  </div>
</template>

<script>
  import upload from '../components/upload'
  export default {
    data () {
      return {
        formValidate:{
          name:'',
        }
      };
    },

    components: {
      upload
    },

    computed: {},
    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style scoped>
.ivu-form-inline .ivu-form-item{
  width: 300px;
}
.ivu-input-wrapper{width: 50% !important;}
</style>