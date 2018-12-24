var router=require('koa-router')();
var userModel=require('../mysqlLib/mysql')
var path=require('path')
var fs=require('fs')
router.get('/', async (ctx,next)=>{
    ctx.body=`<div>123</div>`
})
router.post('/addUser',async (ctx,next)=>{
    let { name, password,avator  } = ctx.request.body
   await userModel.addUser([name,password,avator,'2018/12/24']).then(function(res){
        console.log('success')
        ctx.response.body={
            code:1,
            msg:'成功'
        }
    }).catch((err)=>{
        console.log('失败了')
        console.log(err)
    })
})
router.post('/users',async (ctx,next)=>{
  
   await userModel.users().then(function(res){
        console.log(res)
        ctx.response.body={
            code:1,
            data:res,
            msg:'成功'
        }
    }).catch((err)=>{
        console.log('失败了')
        console.log(err)
    })
})
router.post('/uploadfiles', async (ctx, next) => {
    // 上传多个文件
    const file = ctx.request.files.file; // 获取上传文件
    let arr=[]
      // 创建可读流
      const reader = fs.createReadStream(file.path);
      // 获取上传文件扩展名
      let date=new Date();
      var FileExt = file.name.replace(/.+\./, "").toLowerCase();   //正则表达式获取后缀
      let fileName=`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
      let filePath = path.join(__dirname, '../upload/') + `/${fileName}.${FileExt}`;
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
      arr.push('/upload/'+fileName)
    
   return ctx.body ={
       code:1,
       urls:arr
   };
  });

module.exports=router