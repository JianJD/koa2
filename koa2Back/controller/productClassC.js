var proClassModel=require('../model/productClassM');
var response=require('../utils/public')
exports.addOrEditClass=async(ctx)=>{
    let {className,Type,classId}=ctx.request.body;
    if(!className)
    {
      return  ctx.body=response.reponseData(0,null,'类别名称不能为空')
    }
    
    let hasClassName=false
    await proClassModel.hasClassName(className).then(res=>{
        hasClassName=res.length==0?false:true
    })
    if(hasClassName)
    {
        return ctx.body=response.reponseData(0,null,'名称已存在')
    }else
    {
        if(Type==0)
        {
            let value=[className];
            await proClassModel.addOrEditClass(value,Type).then(res=>{
                ctx.body=response.reponseData(1,null,'保存成功')
            }).catch(err=>{
                ctx.body=response.reponseData(0,null,err)
            })
        }
        else if(Type==1)
        {
            let value=[className,classId];
            await proClassModel.addOrEditClass(value,Type).then(res=>{
                ctx.body=response.reponseData(1,null,'修改成功')
            }).catch(err=>{
                ctx.body=response.reponseData(0,null,err)
            })
        }
        
    }
    
}
exports.delClass=async (ctx)=>{
    let {classId}=ctx.request.body;
    if(!classId)
    {
        return ctx.body=response.reponseData(0,null,'类别id不能为空')
    }else
    {
        await proClassModel.delClass(classId).then(res=>{
            return ctx.body=response.reponseData(1,null,'删除成功')
        })
    }
}