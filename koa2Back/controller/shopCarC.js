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
    let data=[
        productId,
        userId
    ]
    let isHas=false;
    let shopCarId;
    // 判断商品是否已经存在购物车
    await shopCarModel.findByProductId(data).then(res=>{
        if(res.length!=0)
        {
            isHas=true;
            shopCarId=res[0].shopCarId
        }
    })
    console.log(isHas)
    if(isHas)
    {
        
        await shopCarModel.changeShopCarNum(shopCarId,0).then(res=>{
            console.log('更新')
            return ctx.body=response.reponseData(1,null,'更新成功')
        })
    }else{
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
    let {shopCarId,num}=ctx.request.body;
    if(!shopCarId)
    {
        return response.reponseData(0,null,'购物车id不能为空');
    }
    if(!num)
    {
        return response.reponseData(0,null,'商品数量不能为空');
    }
    await shopCarModel.changeShopCarNum([num,shopCarId]).then(res=>{
        return ctx.body=response.reponseData(1,null,'成功');
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
            totalPage: parseInt(totalItems/ pageSize)+1,
            List:res
        }
        return ctx.body=response.reponseData(1,Data,'成功');
    })
}
exports.ShopCarNum=async (ctx)=>{
    let {userId}=ctx.request.body
    await shopCarModel.findTotalItems([userId]).then(res=>{
        totalItems=res[0].totalItems;
        let Data={
            num:totalItems
        }
        ctx.body=response.reponseData(1,Data,'成功');  
    }) 
}