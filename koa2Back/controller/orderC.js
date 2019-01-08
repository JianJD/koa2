var orderM=require('../model/orderM');
var response=require('../utils/public');
var proModel=require('../model/productionM');
var addressModel=require('../model/addressM')
var specM=require('../model/productSpecM')
exports.createOrder=async(ctx)=>{
    let {userId,productId,addressId,proNum,specId,sendMoney,orderMoney,totalMoney} = ctx.request.body;
    if(!userId)
    {
        return ctx.body=response.reponseData(0,null,'userid不能为空');
    }
    if(!productId)
    {
        return ctx.body=response.reponseData(0,null,'产品id不能为空')
    }
    if(!addressId)
    {
        return ctx.body=response.reponseData(0,null,'地址id不能为空')
    }
    if(!specId)
    {
        return ctx.body=response.reponseData(0,null,'specId不能为空')
    }
    if(!sendMoney)
    {
        return ctx.body=response.reponseData(0,null,'sendMoney不能为空')
    }
    if(!orderMoney)
    {
        return ctx.body=response.reponseData(0,null,'orderMoney不能为空')
    }
    if(!totalMoney)
    {
        return ctx.body=response.reponseData(0,null,'totalMoney不能为空')
    }
    let addressInfo;
    await addressModel.findAddressById(addressId).then(res=>{
        addressInfo=JSON.stringify(res[0])
    })
    let productInfo;
    //根据规格id进行查询规格信息
    let specInfo;
    await specM.findSpecBySpecId(specId).then(res=>{
        specInfo=res
    })
    // 组合规格id和数量
    let orderNum=proNum.split(',');
    let specIds=specId.split(',');
    let productIds=productId.split(',')
    let idAndNum=[];
    for(let i=0;i<orderNum.length;i++)
    {
        let obj={
            specId:specIds[i],
            orderNum:orderNum[i],
            productId:productIds[i]
        }
        idAndNum.push(obj)
    }
    // 获取商品信息
    await proModel.findProductByProductId(productId).then(res=>{
        
        for(let i=0;i<idAndNum.length;i++)
        {
            for(let j=0;j<res.length;j++)
            {
                
                
                if(idAndNum[i].productId==res[j].productId)
                {
                    
                    idAndNum[i].productInfo=res[j]
                    idAndNum[i].specInfo=specInfo[i]
                }
            }
        }
        productInfo=JSON.stringify(idAndNum)
    })
    let value=[
        userId,
        productId,
        addressInfo,
        productInfo,
        sendMoney,
        orderMoney,
        totalMoney
    ]

   await orderM.createOrder(value).then(res=>{
       let data={
           orderId:res.insertId
       }
    ctx.body=response.reponseData(1,data,'成功')
   }).catch(()=>{
    return ctx.body=response.reponseData(0,null,'存储过程异常')
    })
//    await orderM.findOrderByUserId([userId]).then(res=>{
//     return ctx.body=response.reponseData(1,res[0],'成功')   
//     })
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
            item.productInfo.swiperImg=JSON.parse(item.productInfo.swiperImg)
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
        return ctx.body=response.reponseData(1,Data,'成功')
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
exports.orderListAdmin=async(ctx)=>{
    let {orderStatus=1,pageIndex=0,pageSize=10}=ctx.request.body;
    await orderM.totalItemsAdmin([orderStatus]).then(res=>{
        totalItems=res[0].totalItems
    })
    if(totalItems==0)
    {
        let Data={
            totalItems,
            totalPage: parseInt(totalItems/ pageSize)+1,
            List:[]
        }
        return ctx.body=response.reponseData(1,Data,'成功')
    }
    await orderM.orderListAdmin([orderStatus,parseInt(pageIndex)-1,parseInt(pageSize)]).then(res=>{
        let Data={
            totalItems,
            totalPage: parseInt(totalItems/ pageSize)+1,
            List:res
        }
        return ctx.body=response.reponseData(1,Data,'成功');
    })
}

