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
            <div v-for="(item , index) in spec" :key='index' class="item">
                <Form  :model="item"  :label-width="80" >
                  <FormItem label="规格名称" prop="specName">
                    <Input v-model="item.specName"  placeholder="请输入规格名称"></Input>
                 </FormItem>
                  <FormItem label="规格值" prop="specName">
                    <div v-for="(item2,index2) in item.specAttr" :key='index2' class="mgt10">
                        <Input v-model="item2.specValue" placeholder="请输入规格值" ></Input>
                        <Icon type="md-add-circle" size='20' @click='addSpecAttrValue(index)' v-if="index2==item.specAttr.length-1"/>
                        <Icon type="md-close-circle" size='20' v-if="item.specAttr.length>1" @click='reduceAttrValue(index,index2)'/>
                    </div>
                 </FormItem>
                </Form> 
               <Icon type="ios-close-circle" size='25' v-if="spec.length>0" @click='reduceSpec(index)'/>
            </div>

              <Button type="success" :style="{display:'block',margin:'10px 0 0 0'}" @click="addSpecNew">添加规格</Button>
          </FormItem>
             <FormItem label="规格参数" prop="children">
               <div class="mgb20">
                 <span style="margin-left:20px;font-size:12px;color:#999;margin-right:20px;">批量设置</span>
                 <Input v-model="samePrice" placeholder="售价" style="width:100px !important" class="mgl20"/>
                 <Input v-model="sameStock" placeholder="库存" style="width: 100px !important" class="mgl20"/>
                  <upload :uploadList='sameImgurl' @success='sameImgurlFn' :one='true' class="inline mgl20"></upload>
                 <Button type="success" @click="setSameSpec">应用</Button>
               </div>
                <Row type='flex'>
                    <Col span="5" class-name='bor'>规格总览</Col>
                    <Col span="7" class-name='bor'>售价</Col>
                     <Col span="7" class-name='bor'>库存</Col>
                      <Col span="5" class-name='bor'>图片</Col>
                </Row>
                  <Row type='flex' v-for="(item ,index) in lastSpec" :key='index'>
                    <Col span="5" class-name='bor hei74'>{{item.specAttrKeyName}}</Col>
                    <Col span="7" class-name='bor hei74'>
                       <Input v-model="item.price"  placeholder="请输入规格价格"></Input>
                     </Col>
                    <Col span="7" class-name='bor hei74'>
                       <Input v-model="item.stock"  placeholder="请输入规格库存"></Input>
                    </Col>
                     
                      <Col span="5" class-name='bor hei74'>
                         <upload :uploadList='item.imgUrl' @success='specuploadSuccess'  :index="index" :one='true'></upload>
                      </Col>
                </Row>

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
import { setTimeout } from 'timers';
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
        samePrice:'',//同一设置规格价格
        sameStock:'',//同一设置规格库存
        sameImgurl:[],
        classList:[],
        specDialog:false,
        specData:{
          specImg:[],
          size:'',
          stock:new Number(),
          color:'',
          price:''
        },
        spec:[
        
        ],//多规格
       
        lastSpec:[],
        
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
            let spec=JSON.parse(data.childrenProduct)
            console.log(spec)
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
            this.spec=spec.spec
            let that=this
            setTimeout(()=>{
              that.lastSpec=spec.detail
            },1000)
            
          }
        })
      }
      this.getClassList()
    },

    methods: {
     
      // 添加规格名称
      addSpecNew(){
        this.spec.push({
          specName:'',
            specAttr:[
              {
                specValue:'',
              }
            ]
        })
        
      },
     
      // 删除规格值
      reduceSpec(index){
        this.spec.splice(index,1)
      },
      // 添加规格值
      addSpecAttrValue(index1){
        this.spec[index1].specAttr.push({
          specValue:''
        })
      },
      // 删除规格值
      reduceAttrValue(index1,index2){
        this.spec[index1].specAttr.splice(index2,1)
      },
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
        let obj={
          spec:this.spec,
          detail:this.lastSpec
        }
        data.childrenProduct=JSON.stringify(obj)
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
      },
      // 批量设置
      setSameSpec(){
        console.log(123)
        let samePrice=this.samePrice;
        let sameStock=this.sameStock;
        let sameImgurl=this.sameImgurl
        for(let item of this.lastSpec)
        {
          if(samePrice!='')
          {
            item.price=samePrice
          }
          if(sameStock!='')
          {
            item.stock=sameStock
          }
          if(sameImgurl.length!=0)
          {
            item.imgUrl=sameImgurl
          }
        }
      },
      getID(){
        return  Number(Math.random().toString().substr(3) + Date.now()).toString(36)
      }, 
       getValuesByArray(arr1,arr2,specName){
          var arr = [];
          for(var i=0;i<arr1.length;i++){
                var v1 = arr1[i]._id||''
              
              for(var j=0;j<arr2.length;j++){
                var v2 = j;
                let obj={
                  _id:`${v1?`${v1}#`:''}${v2}`,
                  specAttrKeyName:`${arr1[i].specAttrKeyName?arr1[i].specAttrKeyName+'#':''}${arr2[j].specValue}`,
                  specName:arr1[i].specName?arr1[i].specName+'#'+specName:specName,
                  price:'',
                  stock:'',
                  imgUrl:[]
                }
                arr.push(obj);
              };
          };
          return arr;
      },
      // 详细规格上传图片
      specuploadSuccess(res){
        this.lastSpec[res.index].imgUrl=res.url
      },
      // 设置相同的规格图片
      sameImgurlFn(res){
        this.sameImgurl=res
      }
    },

    watch: {
      'spec':{
        handler(newval){
          console.log(newval)
            let that=this
            that.columns=[];
            let len=newval.length;
            if(len==0)
            {
               this.lastSpec=[]
              return
            }
            let arr=[""]
            // 对数据进行组合
            if(len>0)
            {
                for(let i=0;i<newval.length;i++)
              {
                //  console.log(newval[i].specAttr)
                  arr = that.getValuesByArray(arr,newval[i].specAttr,newval[i].specName);
              }
            }else{
              arr[0]._id=0;
              arr[0].attrName=newval[0].specName;
              arr[0].attrKeyName=newval[0].specAttr[0].specValue;
              arr[0].imgUrl=[];
              arr[0].price='';
              arr[0].stock=''
            }
            
            console.log(arr)
            this.lastSpec=arr
            return
           
        },
        deep:true
        
      }
    },

  }

</script>
<style scoped>
.ivu-form-inline .ivu-form-item{
  width: 300px;
}
.ivu-input-wrapper{width: 50% !important;}
.specImg{width: 50px;height: 50px;}
.inline{display: inline-block;vertical-align: top;}
.ivu-form-item-label{text-align: left;}
.item{position: relative;}
.item .ivu-icon-ios-close-circle{position: absolute;left: 55%;top: 0;}
.mgt10{margin-bottom: 10px;}
.mgl20{margin-right: 15px;}
</style>