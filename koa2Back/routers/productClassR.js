var router=require('koa-router')();
var productController=require('../controller/productClassC')
router.post('/addOrEditClass',productController.addOrEditClass)
router.post('/delClass',productController.delClass)
module.exports=router