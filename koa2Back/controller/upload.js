
var path=require('path')
var fs=require('fs')
var router=require('koa-router')();

router.post('/uploadfiles', async (ctx, next) => {
    // 上传多个文件
    const file = ctx.request.files.file; // 获取上传文件
      // 创建可读流
      const reader = fs.createReadStream(file.path);
      // 获取上传文件扩展名
      let date=new Date();
      var FileExt = file.name.replace(/.+\./, "").toLowerCase();   //正则表达式获取后缀
      let fileName=`${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
      let filePath = path.join(__dirname, '../static/upload/') + `/${fileName}.${FileExt}`;
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
    let url=`/upload/${fileName}.${FileExt}`
    
   return ctx.body ={
            code:1,
            Data:url
        };
  });
 
  module.exports=router