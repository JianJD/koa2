var router = require('koa-router')();
var query = require('../mysqlLib/pool')
var userController=require('../controller/user')

router.post("/wxlogin", userController.login)
module.exports=router