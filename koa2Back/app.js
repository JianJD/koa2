var Koa=require('koa');
var app=new Koa();
// 处理post请求参数
const bodyParser = require('koa-bodyparser');
// 文件上传中间件
const koaBody = require('koa-body');
var path=require('path')
// koa静态资源托管
const static = require('koa-static')
var user=require('./routers/userR')
var product=require('./routers/productionR')
var upload=require('./controller/upload')
var productClassR=require('./routers/productClassR')
var addressR=require('./routers/addressR')
var orderR=require('./routers/orderR')
var shopCarR=require('./routers/shopCarR')
var articleR=require('./routers/articleR')
var wxpay=require('./routers/pay')
var sql=require('./mysqlLib/mysql')
// 访问的时候不需要加static文件夹名称
var staticPath='./static'
app.use(static(path.join(__dirname, staticPath)))
    //   文件上传中间件
    app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
app.use(bodyParser())
// 使用路由
app.use(upload.routes())
app.use(wxpay.routes())
app.use(user.routes())
app.use(product.routes())
app.use(productClassR.routes())
app.use(addressR.routes())
app.use(shopCarR.routes())
app.use(orderR.routes())
app.use(articleR.routes())
app.listen('3001','192.168.1.105',function(){
    console.log('this server is running at localhost:3001')
})
// app.listen(3001,function(){
//     console.log('this server is running at localhost:3001')
// })