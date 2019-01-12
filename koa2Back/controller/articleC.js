var articleM=require('../model/articleM')
var response=require('../utils/public')
// 新增或编辑文章
exports.addOrEditArticle=async (ctx)=>{
    let {title,content,Type=0,articleId=0}=ctx.request.body;
    if(!title)
    {
        return ctx.body=response.reponseData(0,null,'文章标题不能为空')
    }
    if(!content)
    {
        return ctx.body=response.reponseData(0,null,'文章内容不能为空')
    }
    if(Type==undefined||Type==null)
    {
        return ctx.body=response.reponseData(0,null,'操作类型不能为空')
    }
    if(Type==1&&(articleId==0||articleId==''||articleId==undefined||articleId==null))
    {
        return ctx.body=response.reponseData(0,null,'文章id不能为空')
    }
    let value=[]
    if(Type==0)
    {
         value=[
            title,
            0,
            content
        ]
    }
    if(Type==1)
    {
         value=[
            title,
            0,
            content,
            articleId
        ]
    }
    
    await articleM.addOrEditArticle(value,Type).then(res=>{
        return ctx.body=response.reponseData(1,null,'操作成功')
    }).catch(()=>{
        return  ctx.body=response.reponseData(0,null,'存储过程异常')
    })
}
// 删除
exports.delArticle=async (ctx)=>{
    let {articleId}=ctx.request.body;
    if(!articleId)
    {
        return ctx.body=response.reponseData(0,null,'文章Id不能为空')
    }
   
    let value=[
        articleId
    ]
    await articleM.delArticle(value).then(res=>{
        return ctx.body=response.reponseData(1,null,'操作成功')
    }).catch(()=>{
        return  ctx.body=response.reponseData(0,null,'存储过程异常')
    })
}
// 新增编辑关于我们
exports.addOrEditAboutUs=async (ctx)=>{
    let {content,Type=0}=ctx.request.body;
    if(!content)
    {
        return response.reponseData(0,null,'内容不能为空')
    }
    let value=[
        '关于我们',
        1,
        content
    ]
    await articleM.addOrEditAboutUs(value,Type).then(res=>{
        return ctx.body=response.reponseData(1,null,'操作成功')
    }).catch(()=>{
        return ctx.body=response.reponseData(0,null,'存储过程异常')
    })
}
// 获取关于我们
exports.findAboutUs=async (ctx)=>{
 await   articleM.findAboutUs().then(res=>{
        return ctx.body=response.reponseData(1,res,'获取成功')
    })
}
// 获取文章详情
exports.findArticleById=async (ctx)=>{
    let {articleId}=ctx.request.body;
    if(!articleId)
    {
        return ctx.body=response.reponseData(0,null,'文章id不能为空')
    }
    let value=[
        articleId
    ]
   await articleM.findArticleById(value).then(res=>{
        return ctx.body=response.reponseData(1,res,'获取成功')
    })
}
// 文章分页
exports.findArticleForPage=async(ctx)=>{
    let {pageIndex=1,pageSize=10}=ctx.request.body;
    let totalItems=0;
    let totalPages=0
    await articleM.articleTotalItems().then(res=>{
        totalItems=res[0].totalItems
    })
   await articleM.findArticleForPage(pageIndex,pageSize).then(res=>{
        let obj={
            totalItems,
            totalPages:parseInt(totalItems/pageSize)+1,
            List:res
        }
        return ctx.body=response.reponseData(1,obj,'success')
    })
}