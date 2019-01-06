var wxpay=require('../controller/pay')
var router=require('koa-router')();
router.post('/pay',wxpay.wxPay)
module.exports=router