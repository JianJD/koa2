var shopCarModel=require('../model/shopCarM');
var response=require('../utils/public');
exports.addShopCar=async (ctx)=>{
    let {userId,num,productId}=ctx.request.body;
    if(!userId)
    {
        return response.reponseData(0,null,'userId不能为空');
    }
    if(!num)
    {
        return response.reponseData(0,null,'商品数量不能为空');
    }
    if(!productId)
    {
        return response.reponseData(0,null,'产品id不能为空');
    }
    let value=[
        userId,
        parseInt(num),
        productId
    ];
    await shopCarModel.addShopCar(value).then(res=>{
        return ctx.body=response.reponseData(1,null,'成功')
    }).catch(()=>{
        ctx.body=response.reponseData(1,null,'存储过程异常')
    })
}
exports.delShopCar=async(ctx)=>{
    let {shopCarId}=ctx.request.body;
    if(!shopCarId)
    {
        return response.reponseData(0,null,'购物车id不能为空');
    }
    
    await shopCarModel.delShopCar(shopCarId).then(res=>{
        return response.reponseData(1,null,'删除成功');
    }).catch(()=>{
        ctx.body=response.reponseData(1,null,'存储过程异常')  
    })
}
exports.changeShopCarNum=async (ctx)=>{
    let {shopCarId,Type}=ctx.request.body;
    if(!shopCarId)
    {
        return response.reponseData(0,null,'购物车id不能为空');
    }
    if(Type==undefined||Type==null)
    {
        return response.reponseData(0,null,'缺少Type操作类型');
    }
    await shopCarModel.changeShopCarNum(shopCarId,Type).then(res=>{
        return response.reponseData(1,null,'成功');
    }).catch(()=>{
        ctx.body=response.reponseData(1,null,'存储过程异常');
    })
}
exports.shopCarListForPage=async(ctx)=>{
    let {userId,pageIndex=1,pageSize=10}=ctx.request.body
    if(!userId)
    {
        return response.reponseData(0,null,'userId不能为空');
    }
    let totalItems
    await shopCarModel.findTotalItems([userId]).then(res=>{
        totalItems=res[0].totalItems
    })
    if(totalItems==0)
    {
        return ctx.body=response.reponseData(1,[],'成功');  
    }
    await shopCarModel.shopCarListForPage([userId,pageIndex-1,parseInt(pageSize)]).then(res=>{
        let Data={
            totalItems,
            totalPage: totalItems/ pageSize,
            List:res
        }
        return ctx.body=response.reponseData(1,Data,'成功');
    })
}