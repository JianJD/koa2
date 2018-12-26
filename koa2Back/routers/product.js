var router = require('koa-router')();
var productController=require('../controller/production')
router.post("/addOrEditProduct" , productController.addOrEditProduct)
module.exports=router