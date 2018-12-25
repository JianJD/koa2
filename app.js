    var Koa=require('koa');
    var app=new Koa();
    // 处理post请求参数
    const bodyParser = require('koa-bodyparser');
    // 文件上传中间件
    const koaBody = require('koa-body');
    var path=require('path')
    // koa静态资源托管
    const static = require('koa-static')
    var router=require('koa-router')
    var user=require('./api/user')
    var upload=require('./api/upload')
    // 访问的时候不需要加static文件夹名称
    var staticPath='./static'
    app.use(static(path.join(__dirname, staticPath)))
    app.use(bodyParser({
        formLimit: '1mb'
    }))
    //   文件上传中间件
    app.use(koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
        }
    }));
    // 使用路由
    app.use(upload.routes())
    app.use(user.routes())
    app.listen(3000,function(){
        console.log('this server is running at localhost:3000')
    })