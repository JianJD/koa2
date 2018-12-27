var router=require('koa-router')()
var addressController=require('../controller/addressC')
router.post('/createAddress',addressController.createAddress)
router.post('/delAddress',addressController.delAddress)
router.post('/findAddressByUserId',addressController.findAddress)
module.exports=router;