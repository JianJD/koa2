var router=require('koa-router')();
var query=require('../mysqlLib/pool')
var request=require('request')
const wxConfig={
    APPID:'wxb68699ee0229042e',
    SECRET:'ca82d62e5efc42192dedeff50be56a9e'
}
router.post("/wxlogin", async (ctx,next)=>{
    console.log(ctx.request.body)
    
    let { userName, code,header  } = ctx.request.body
   
     
       let  Data= request.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${wxConfig.APPID}&secret=${wxConfig.SECRET}&js_code=${code}&grant_type=authorization_code`,async function(err,res,body){
            if(!err){
                return  {
                        code:1,
                        Data:body,
                        msg:'注册成功'
                        }
                    }else{
                        return  {
                            code:0,
                            Data:null,
                            msg:'注册失败'
                        } 
                    }
            
                })
   let lastData= await Data;
   ctx.body=lastData
    console.log(123)
    
})



 module.exports=router