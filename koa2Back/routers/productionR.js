var router = require('koa-router')();
var productController=require('../controller/productionC')

router.post("/addOrEditProduct" , productController.addOrEditProduct)
router.post("/delProduct" , productController.delProduction)
router.post("/findProductByProductId" , productController.findProductById)
router.post("/getProductList" , productController.getProductList)
router.post("/upAndDown" , productController.upAndDown)
router.post("/findSpecByProductId" , productController.findSpecByProductId)
module.exports=router