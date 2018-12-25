var router=require('koa-router')();
var query=require('../mysqlLib/pool')
// var request=require('request')
const wxConfig={
    APPID:'wxb68699ee0229042e',
    SECRET:'ca82d62e5efc42192dedeff50be56a9e'
}
router.post("/wxlogin", async (ctx,next)=>{
    console.log(123456)
    let { userName, code,header  } = ctx.request.body
    return
    request.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${wxConfig.APPID}&secret=${wxConfig.SECRET}&js_code=${code}&grant_type=authorization_code`,function(err,res,body){
      return  ctx.body={
            data:res
        }
    })
    
})



 module.exports=router