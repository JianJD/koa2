var router = require('koa-router')();
var productController=require('../controller/productionC')

router.post("/addOrEditProduct" , productController.addOrEditProduct)
router.post("/delProduct" , productController.delProduction)
router.post("/findProductByProductId" , productController.findProductById)
module.exports=router