var wxpay=require('../controller/pay')
var router=require('koa-router')();
router.post('/pay',wxpay.wxPay)
router.post('/wxPayNotify',wxpay.wxPayNotify)
module.exports=router