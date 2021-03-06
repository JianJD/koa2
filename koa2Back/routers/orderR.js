var orderController=require('../controller/orderC');
var router=require('koa-router')();
router.post('/createOrder',orderController.createOrder)
router.post('/orderComplete',orderController.orderComplete)
router.post('/sendForOrder',orderController.sendForOrder)
router.post('/delOrder',orderController.delOrder)
router.post('/findOrderInfoByOrderId',orderController.findOrderInfoByOrderId)
router.post('/orderList',orderController.orderList)
router.post('/orderListAdmin',orderController.orderListAdmin)
router.post('/checkOrderAndMoney',orderController.checkOrderAndMoney)
module.exports=router