var productModel=require('../model/productionM');
var response=require('../utils/public')

let Data={
    code:1,
    Data:'',
    msg:''
}
exports.addOrEditProduct= async (ctx)=>{
    let {classId ,isForSale,productTitle,swiperImg,memberPrice,price,childrenProduct,productDetail,sendMoney,stock,Type,video}=ctx.request.body;
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
        video,
    
    ]
    if(Type==1)
    {
        if(!ctx.request.body.productId)
        {
            return ctx.body=response.reponseData(0,null,'商品Id不能为空')
        }
        value.push(ctx.request.body.productId)
        
    }
  await  productModel.addOrEditProduct(value,Type).then(res=>{
        ctx.body=response.reponseData(1,null,'操作成功')
    }).catch(err=>{
        ctx.body=response.reponseData(0,null,err)
    })
}
exports.delProduction=async (ctx)=>{
    let {productId}=ctx.request.body;
    if(!productId)
    {
      return  ctx.body=response.reponseData(0,null,'商品id不能为空')
    }
    let hasPro;
    await productModel.findProductByProductId(productId).then(res=>{
        hasPro=res 
    })
    if(hasPro.length==0)
    {
         return   ctx.body=response.reponseData(0,null,'该商品已不存在')  
    }
    await productModel.delProduct(productId).then(res=>{
        ctx.body=response.reponseData(1,null,'删除成功')
    }).catch(err=>{
        ctx.body=response.reponseData(0,null,err)
    })
}
exports.findProductById= async (ctx)=>{
    let {productId}=ctx.request.body;
    let productData=null;
    await productModel.findProductByProductId(productId).then(res=>{
        if(res.length==0)
        {
            return  ctx.body=response.reponseData(0,null,'找不到该商品')
        }else
        {
            ctx.body=response.reponseData(1,res,'成功')
        }
    })
}
exports.getProductList=async (ctx)=>{
    let {classId=0,pageIndex=1,pageSize=10,isForSale=1}=ctx.request.body
    let value=[
        classId,
        pageIndex-1, 
        pageSize,
        isForSale,
    ]
    let totalItems;
    await productModel.totalItems(value).then(res=>{
        totalItems=res.length
    })
    if(totalItems==0)
    {
        let Data={
            List:[],
            totalItems,
            totalPages:parseInt(totalItems/pageSize)+1
        }
        return ctx.body=response.reponseData(1,Data,'获取成功')
    }
    await productModel.getProductList(value).then(res=>{
        let Data={
            List:res,
            totalItems,
            totalPages:parseInt(totalItems/pageSize)+1 
        }
        return ctx.body=response.reponseData(1,Data,'获取成功')
    }).catch(()=>{
        return ctx.body=response.reponseData(1,null,'异常啦')
    })
}
exports.upAndDown=async(ctx)=>{
    let {productId,Type}=ctx.request.body;
    if(!productId)
    {
        return ctx.body=response.reponseData(0,null,'商品id不能为空')
    }
    let value=[
        Type,
        productId
    ]
    await productModel.upAndDown(value).then(res=>{
        return ctx.body=response.reponseData(1,null,'操作成功')
    }).catch(()=>{
        ctx.body=response.reponseData(0,null,'异常啦')
    })
}