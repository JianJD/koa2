var wxpay = require('../utils/wxpay');
var responseR = require('../utils/public');
var request = require('request');
var congfig=require('../config/config')
var xmlreader = require("xmlreader");
var orderM=require('../model/orderM')
exports.wxPay = async (ctx) => {
    let {
        code,
        money,
        orderNum,
        openid
    } = ctx.request.body;
    
    if (!code) {
        return ctx.body=responseR.reponseData(0, null, '微信code不能为空')
    }
    if (!money) {
        return ctx.body=responseR.reponseData(0, null, 'money不能为空')
    }
    if (!orderNum) {
        return ctx.body=responseR.reponseData(0, null, 'orderNum不能为空')
    }
    let wxurl='http://wxpay.wxutil.com/pub_v2/pay/notify.v2.php';
console.log( ctx.req.connection.remoteAddress)
    let mch_id = congfig.wxConfig.mch_id;//商户号
    let mchkey=congfig.wxConfig.mchkey//商户号秘钥
    let nonce_str = wxpay.createNonceStr();
    let timestamp = wxpay.createTimeStamp();
    let body = '123';
    let out_trade_no = timestamp;
    let total_fee = wxpay.getmoney(money);
    let spbill_create_ip =ctx. req.connection.remoteAddress.replace('::ffff:','');
    let notify_url = wxurl;
    let trade_type = 'JSAPI';
    let appid=congfig.wxConfig.APPID;
    let sign = wxpay.paysignjsapi(orderNum,openid,appid,body,mch_id,nonce_str,notify_url,out_trade_no,spbill_create_ip,total_fee,trade_type,mchkey);
    // console.log('签名'+sign)
  
var formData  = "<xml>";
    formData  += "<appid>"+appid+"</appid>";  //appid
    formData  += "<attach><![CDATA["+orderNum+"]]></attach>";
    formData  += "<body><![CDATA["+body+"]]></body>";
    formData  += "<mch_id>"+mch_id+"</mch_id>";  //商户号
    formData  += "<nonce_str>"+nonce_str+"</nonce_str>"; //随机字符串，不长于32位。
    formData  += "<notify_url>"+notify_url+"</notify_url>";
    formData  += "<openid>"+openid+"</openid>";
    formData  += "<out_trade_no>"+out_trade_no+"</out_trade_no>";
    formData  += "<spbill_create_ip>"+spbill_create_ip+"</spbill_create_ip>";
    formData  += "<total_fee>"+total_fee+"</total_fee>";
    formData  += "<trade_type>"+trade_type+"</trade_type>";
    formData  += "<sign>"+sign+"</sign>";
    formData  += "</xml>";
    // console.log(formData)
    var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';//统一下单地址
    await getWxorderId(url,formData).then(res=>{
        // console.log(res)
        xmlreader.read(res.toString("utf-8"), function (errors, res) {
               if (null !== errors) {
                   return ctx.body=responseR.reponseData(0,null,'未知错误')
               }
               if(res.xml.return_code.text()=='FAIL')
               {
                   return ctx.body=responseR.reponseData(0,null,res.xml.return_msg.text())
               }
               var prepay_id = res.xml.prepay_id.text();
               //将预支付订单和其他信息一起签名后返回给前端
               let paySign = wxpay.paysignjsapifinal(appid,mch_id,prepay_id,nonce_str,timestamp,mchkey);
               let data= {
                   code:1,
                   Data:{
                       appid:appid,
                       paySign,
                       package:`prepay_id=${prepay_id}`,
                       nonce_str:nonce_str,
                       timeStamp:timestamp,
                       signType:'MD5'
                   }
               }
               ctx.body=responseR.reponseData(1,data,res.xml.return_msg.text())
           })
    })
 
}
exports.wxPayNotify=async(ctx)=>{
    xmlreader.read(ctx.request.body.toString("utf-8"),async function (errors, res) {
        console.log(ctx)
        if(!errors){
            if(res.xml.return_code.text()=='SUCCESS')
            {
                let value=[
                    1,
                    res.xml.attach.text(),
                    res.xml.transaction_id.text()
                ]
              await  orderM.payOrder(value).then(msg=>{
                return  ctx.body=responseR.reponseData(1,msg,'SUCCESS')
              })
            }
        }
    }) 
}





function getWxorderId(url,formData) {
    return new Promise ((resolve, reject)=>{
        request({url:url,method:'POST',body:formData}, function (err, res, body) {
            if (!err) {
                resolve(body)
                } else {
                    reject(err)
                }
            })
    })
  

}