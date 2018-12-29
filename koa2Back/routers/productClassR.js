var router=require('koa-router')();
var productController=require('../controller/productClassC')
router.post('/addOrEditClass',productController.addOrEditClass)
router.post('/delClass',productController.delClass)
router.post('/getClassList',productController.getClassList)
module.exports=router