var productModel=require('../model/product');
var response=require('../utils/dateFormat')
let Data={
    code:1,
    Data:'',
    msg:''
}
exports.addOrEditProduct= async (ctx)=>{
    let {classId ,isForSale,productTitle,swiperImg,memberPrice,price,childrenProduct,productDetail,sendMoney,stock,Type}=ctx.request.body;
    if(!productTitle)
    {
        ctx.body=response.reponseData(0,null,'产品名称不能为空')
    }
    if(!swiperImg)
    {
        ctx.body=response.reponseData(0,null,'产品图不能为空')
    }
    if(!memberPrice)
    {
        ctx.body=response.reponseData(0,null,'会员价不能为空')
    }
    if(!price)
    {
        ctx.body=response.reponseData(0,null,'原价不能为空')
    }
    if(!childrenProduct)
    {
        ctx.body=response.reponseData(0,null,'产品子类不能为空')
    }
    if(!productDetail)
    {
        ctx.body=response.reponseData(0,null,'产品详情不能为空')
    }
    if(!sendMoney)
    {
        ctx.body=response.reponseData(0,null,'运费不能为空')
    }
    if(!stock)
    {
        ctx.body=response.reponseData(0,null,'库存不能为空')
    }
    if(Type==undefined||Type==null){
        ctx.body=response.reponseData(0,null,'请选择操作类型')
    }
    
    let value=[
        classId ,
        isForSale,
        productTitle,
        swiperImg,
        memberPrice,
        price,
        childrenProduct,
        productDetail,
        sendMoney,
        stock,
    ]
    if(Type==1)
    {
        value.push(ctx.request.body.productId)
    }
  await  productModel.addOrEditProduct(value,Type).then(res=>{
        ctx.body=response.reponseData(1,null,'操作成功')
    }).catch(err=>{
        ctx.body=response.reponseData(0,null,err)
    })
}