// var router = require('koa-router')();
// var query = require('../mysqlLib/pool')
var request = require('request')
var userMoel=require('../model/user')
const wxConfig = {
    APPID: 'wxb68699ee0229042e',
    SECRET: 'ca82d62e5efc42192dedeff50be56a9e'
}
exports.login= async(ctx)=>{
    let {code ,userName,header}=ctx.request.body
    let isHasUser;
    let userInfo= await getOpenId(code)
    await userMoel.findUserById(userInfo.openid).then(res=>{
        isHasUser=res
    })
    if(isHasUser.length==0)
    {
        let date=new Date();
        let time=`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` ;
        let value=[userInfo.openid,userName,header,time]
        await userMoel.addUeer(value).then(res=>{
            ctx.body={
                code:1,
                Date:userInfo,
                msg:'注册成功'
            }
        })
    }else{
        ctx.body={
            code:1,
            Date:isHasUser,
            msg:'登录成功'
        }
    }
}
 function getOpenId(code) {
    return new Promise ((resolve, reject)=>{
        request.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${wxConfig.APPID}&secret=${wxConfig.SECRET}&js_code=${code}&grant_type=authorization_code`,  function (err, res, body) {
            if (!err) {
                resolve(JSON.parse(body))
                } else {
                    reject(err)
                }
            })
    })
  

}


