var request = require('request');
var userMoel=require('../model/userM');
var response=require('../utils/public')
var config=require('../config/config')
var crypto = require('crypto');//md5加密
const wxConfig = config.wxConfig
exports.login= async(ctx)=>{
    let {code ,userName,header}=ctx.request.body
    let isHasUser;
    let userInfo= await getOpenId(code)
    await userMoel.findUserById(userInfo.openid).then(res=>{
        isHasUser=res
    })
    if(isHasUser.length==0)
    {
        let time1=response.timeFormat() ;
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
            ctx.body=response.reponseData(1,returnData,'注册成功')
        })
    }else{
   
        ctx.body=response.reponseData(1,isHasUser,'登录成功')
    }
}
exports.adminLogin=async(ctx)=>{
    let {phone,password}=ctx.request.body;
    if(!phone)
    {
        return ctx.body=response.reponseData(0,null,'手机账号不能为空')
    }
    if(!password)
    {
        return ctx.body=response.reponseData(0,null,'密码不能为空')
    }
    let adminInfo=null;
    await userMoel.adminLogin([phone]).then(res=>{
        adminInfo=res[0]
    })
    if(!adminInfo)
    {
        return ctx.body=response.reponseData(0,null,'账号不存在')
    }
     
    let b=crypto.createHash('md5').update(password,'utf8').digest('hex').toUpperCase()

    if(adminInfo.password!=b)
    {
        return ctx.body=response.reponseData(0,null,'密码错误')
    }else
    {
        ctx.body=response.reponseData(1,null,'登录成功') 
        userMoel.updateLoginTime([adminInfo.adminId])
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


