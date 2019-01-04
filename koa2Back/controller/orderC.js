var orderM=require('../model/orderM');
var response=require('../utils/public');
var proModel=require('../model/productionM');
var addressModel=require('../model/addressM')
exports.createOrder=async(ctx)=>{
    let {userId,productId,addressId,proNum} = ctx.request.body;
    if(!userId)
    {
        return ctx.body=response.reponseData(0,null,'userid不能为空');
    }
    if(!productId)
    {
        return ctx.body=response.reponseData(0,null,'产品id不能为空不能为空')
    }
    if(!addressId)
    {
        return ctx.body=response.reponseData(0,null,'地址id不能为空不能为空')
    }
    let addressInfo;
    await addressModel.findAddressById(addressId).then(res=>{
        addressInfo=JSON.stringify(res[0])
    })
    let productInfo;
    await proModel.findProductByProductId(productId).then(res=>{
        console.log(res)
        let arrProNum=proNum.split('#')
        for(let i=0;i<arrProNum.length;i++)
        {
            res[i].orderNum=parseInt(arrProNum[i]) 
        }
        productInfo=JSON.stringify(res)
    })
    let value=[
        userId,
        productId,
        addressInfo,
        productInfo
    ]

   await orderM.createOrder(value).then(res=>{
       return ctx.body=response.reponseData(1,null,'成功')
   })

}
// 待发货->待收货
exports.sendForOrder=async (ctx)=>{
    let {orderId} = ctx.request.body;
    if(!orderId)
    {
        return ctx.body=response.reponseData(0,null,'orderid不能为空')
    }
    let value=[
        2,
        orderId,
    ]
    await orderM.updateOrderStatus(value).then(res=>{
        return ctx.body=response.reponseData(1,null,'success')
    })
}
// 待收货->已完成
exports.orderComplete=async (ctx)=>{
    let {orderId} = ctx.request.body;
    if(!orderId)
    {
        return ctx.body=response.reponseData(0,null,'orderid不能为空')
    }
    let value=[
        3,
        orderId,
    ]
    await orderM.updateOrderStatus(value).then(res=>{
        return ctx.body=response.reponseData(1,null,'success')
    })
}
// 删除订单
exports.delOrder=async(ctx)=>{
    let {orderId} = ctx.request.body;
    if(!orderId)
    {
        return ctx.body=response.reponseData(0,null,'orderid不能为空')
    }
    let value=[
        orderId,
    ]
    await orderM.delOrder(value).then(res=>{
        return ctx.body=response.reponseData(1,null,'删除成功')
    })
}
// 查询订单信息
exports.findOrderInfoByOrderId=async(ctx)=>{
    let {orderId} = ctx.request.body;
    console.log(orderId)
    if((orderId==undefined||orderId==''))
    {
        return ctx.body=response.reponseData(0,null,'orderid不能为空')
    }
    let value=[
        orderId,
    ]
    await orderM.findOrderInfoByOrderId(value).then(res=>{
        let Data=res[0];
        Data.addressInfo=JSON.parse(Data.addressInfo)
        Data.productInfo=JSON.parse(Data.productInfo)
        for(let item of Data.productInfo)
        {
            item.swiperImg=JSON.parse(item.swiperImg)
        }
        return ctx.body=response.reponseData(1,Data,'获取成功')
    })
}
// 查看订单列表
exports.orderList=async(ctx)=>{
    let {userId,orderStatus=0,pageIndex=0,pageSize=10}=ctx.request.body;
    if(!userId)
    {
        return ctx.body=response.reponseData(0,null,'userId不能为空')
    }
    let totalItems;
    await orderM.totalItems([userId,orderStatus]).then(res=>{
        totalItems=res[0].totalItems
    })
    if(totalItems==0)
    {
        let Data={
            totalItems,
            totalPage: parseInt(totalItems/ pageSize)+1,
            List:[]
        }
        return ctx.body=response.reponseData(0,Data,'成功')
    }
    await orderM.orderList([userId,orderStatus,parseInt(pageIndex)-1,parseInt(pageSize)]).then(res=>{
        let Data={
            totalItems,
            totalPage: parseInt(totalItems/ pageSize)+1,
            List:res
        }
        return ctx.body=response.reponseData(1,Data,'成功');
    })
}

