var request = require('request');
var userMoel=require('../model/userM');
var time=require('../utils/public')
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
        let time1=time.timeFormat() ;
        let value=[userInfo.openid,userName,header,time1]
        let returnData={}
        delete userInfo.session_key;
        returnData.openId=userInfo.openid;
        returnData.userName=userName;
        returnData.header=header
        await userMoel.addUser(value).then(res=>{
            console.log('新增会员成功')
        })
        await userMoel.findUserById(userInfo.openid).then(res=>{
            ctx.body={
                code:1,
                Data:res,
                msg:'注册成功'
            }
        })
    }else{
   
        ctx.body={
            code:1,
            Data:isHasUser,
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


