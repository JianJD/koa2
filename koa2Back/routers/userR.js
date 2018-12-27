var router = require('koa-router')();
var userController=require('../controller/userC');

router.post("/wxlogin", userController.login)
module.exports=router