var router=require('koa-router')();
var shopCarController=require('../controller/shopCarC')
router.post('/addShopCar',shopCarController.addShopCar)
router.post('/delShopCar',shopCarController.delShopCar)
router.post('/changeShopCarNum',shopCarController.changeShopCarNum)
router.post('/shopCarListForPage',shopCarController.shopCarListForPage)
module.exports=router