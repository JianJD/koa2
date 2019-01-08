var router = require('koa-router')();
var userController=require('../controller/userC');

router.post("/wxlogin", userController.login)
router.post("/adminLogin", userController.adminLogin)
module.exports=router