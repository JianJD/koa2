var response=require('../utils/dateFormat');
var addressModel=require('../model/addressM');
exports.createAddress=async (ctx)=>{
    let {userId,receiver,receiverPhone,receiverProvince,receiverCity,receiverArea,receiverAddress,isDefault,Type,addressId}=ctx.request.body;
    if(!userId)
    {
        return ctx.body=response.reponseData(0,null,'userId不能为空')
    }
    if(!receiver)
    {
        return ctx.body=response.reponseData(0,null,'收件人不能为空')
    }
    if(!receiverPhone)
    {
        return ctx.body=response.reponseData(0,null,'收件人手机不能为空')
    }
    if(!receiverProvince)
    {
        return ctx.body=response.reponseData(0,null,'收件人省份不能为空')
    }
    if(!receiverCity)
    {
        return ctx.body=response.reponseData(0,null,'收件人市区不能为空')
    }
    if(!receiverArea)
    {
        return ctx.body=response.reponseData(0,null,'收件人区/县不能为空')
    }
    if(!receiverAddress)
    {
        return ctx.body=response.reponseData(0,null,'收件人详细地址不能为空')
    }
    if(isDefault==undefined||isDefault==null)
    {
        return ctx.body=response.reponseData(0,null,'是否默认不能为空')
    }
    let time=response.timeFormat()
    let value=[
        userId,
        receiver,
        receiverPhone,
        receiverProvince,
        receiverCity,
        receiverArea,
        receiverAddress,
        isDefault,
        
    ]
    if(Type==1)
    {
        if(!addressId)
        {
            return ctx.body=response.reponseData(1,null,'addressId不能为空')   
        }
        value.push(addressId)
    }
    await addressModel.createdAddress(value,Type).then(res=>{
        if(Type==0)
        {
            return ctx.body=response.reponseData(1,null,'新增成功')
        }else
        {
            return ctx.body=response.reponseData(1,null,'修改成功') 
        }
    })
}
exports.delAddress= async (ctx)=>{
    let {addressId}=ctx.request.body;
    if(!addressId)
    {
       return ctx.body=response.reponseData(0,null,'addressId不能为空')
    }
    await addressModel.delAddress(addressId).then(res=>{
        ctx.body=response.reponseData(1,null,'删除成功')
    })
}
exports.findAddress=async (ctx)=>{
    let {userId}=ctx.request.body
    if(!userId)
    {
        return ctx.body=response.reponseData(0,null,'userId不能为空')
    }else
    {
        await addressModel.findAddressByUserId(userId).then(res=>{
            ctx.body=response.reponseData(1,res,'获取成功')
        }).catch(()=>{
            ctx.body=response.reponseData(0,res,'获取失败')
        })
    }
}