var router = require('koa-router')();
var userController=require('../controller/user');

router.post("/wxlogin", userController.login)
module.exports=router