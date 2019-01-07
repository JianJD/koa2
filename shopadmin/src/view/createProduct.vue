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
          <FormItem label="商品规格" prop="spec">
              <div v-for="(item,index) in spec" :key="index">
                <img :src="imgUrl+item.specImg" class="specImg inline"/>
                <div class="inline">库存:{{item.stock}}</div>
                <div class="inline">颜色:{{item.color}}</div>
                <div class="inline">大小:{{item.size}}</div>
                <div class="inline">价格:{{item.price}}</div>
                <Button type="error" :style="{display:'block',margin:'0 auto'}" @click="delSpec(index)" size='small'>删除</Button>
              </div>
              <Button type="success" :style="{display:'block'}" @click="openSpecDialog()">添加多规格</Button>
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
       <Modal
        v-model="specDialog"
        title="新增规格">
        <Form  ref="specData" :model="specData" label-position="top" >
            <FormItem label="规格图片" prop="isForSale">
                <upload :uploadList='specData.specImg' @success='specImg' :one='true'></upload>
            </FormItem>
            <FormItem label="规格价格" prop="price">
              <Input v-model="specData.price" placeholder="请输入规格价格"></Input>
            </FormItem>
            <FormItem label="规格库存" prop="stock">
              <Input v-model="specData.stock" placeholder="请输入规格库存"></Input>
            </FormItem>
             <FormItem label="规格颜色" prop="color">
              <Input v-model="specData.color" placeholder="请输入规格颜色"></Input>
            </FormItem>
            <FormItem label="规格大小" prop="size">
              <Input v-model="specData.size" placeholder="请输入规格大小"></Input>
            </FormItem>
          </Form>
        <div slot="footer">
          <Button type="text" size="large" @click="close">取消</Button>
          <Button type="primary" size="large" @click="addSpec">确定</Button>
        </div>

    </Modal>
  </div>
</template>

<script>
  import upload from '../components/upload';
  import editor from '../components/editor';
  export default {
    data () {
      return {
        imgUrl:this.imgUrl,
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
        classList:[],
        specDialog:false,
        specData:{
          specImg:[],
          size:'',
          stock:new Number(),
          color:'',
          price:''
        },
        spec:[]
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
          if(!this.spec.length)
        {
         this.$Message.error('请先新增产品规格')
         return 
        }
        let data= JSON.parse(JSON.stringify(this.formValidate));
        data.swiperImg=JSON.stringify(data.swiperImg)
        data.isForSale=data.isForSale?1:0
        data.spec=JSON.stringify(this.spec)
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
      },
      // 保存规格
      addSpec(){
        if(!this.specData.specImg)
        {
          this.$Message.error('请上传规格图片');
          return 
        }
        if(!this.specData.size)
        {
          this.$Message.error('请填写规格大小');
          return 
        }
        if(!this.specData.color)
        {
          this.$Message.error('请填写规格颜色');
          return 
        }
        if(!this.specData.price)
        {
          this.$Message.error('请填写规格价格');
          return 
        }
        let arr=JSON.parse(JSON.stringify(this.specData))
        arr.specImg=arr.specImg[0].url
        this.spec.push(arr)
        this.specData=new Object();
         this.specData.specImg=[];
         this.specDialog=false
      },
      // 关闭
      close(){
        this.specDialog=false;
        this.specData=new Object();
        this.specData.specImg=[]
      },
      specImg(res){
        if(this.specData.specImg.length>0)
        {
          this.specData.specImg.splice(0,1,res[0])
        }else
        {
          this.specData.specImg.push(res[0])
        }
      },
      // 删除多规格
      delSpec(idx){
        this.spec.splice(idx,1)
      },
      // 打开新增多规格弹窗
      openSpecDialog(){
        this.specDialog=true
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
.specImg{width: 50px;height: 50px;}
.inline{display: inline-block;vertical-align: top;}
</style>