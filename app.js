var Koa=require('koa');
var app=new Koa();
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
var home=require('./api/home')
app.use(bodyParser({
    formLimit: '1mb'
  }))
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));

app.use(home.routes())
app.listen(3000,function(){
    console.log('this server is running at localhost:3000')
})