var query=require('../mysqlLib/pool')
exports.addOrEditArticle=(value,Type=0)=>{
    let sql=''
    if(Type==0)
    {
        sql=`INSERT INTO article SET title=?, isAboutUs=?,content=?,createAt=now(),updateAt=now();`;
    }else
    {
        sql=`update article SET title=?, isAboutUs=?,content=?,updateAt=Now() WHERE articleId=?;`;
    }
    return query(sql,value)
}
exports.delArticle=(value)=>{
    let sql=`DELETE FROM article WHERE articleId=?;`
    return query(sql,value)
}
// 新增编辑关于我们
exports.addOrEditAboutUs=(value,Type=0)=>{
    let sql=''
    if(Type==0)
    {
        sql=`INSERT INTO article SET title=?, isAboutUs=?,content=?,createAt=now(),updateAt=now();`;
    }else
    {
        sql=`update article SET title=?, isAboutUs=?,content=?,updateAt=Now() WHERE isAboutUs=1;`;
    }
    return query(sql,value)
}
// 获取文章总条数
exports.articleTotalItems=()=>{
    let sql=`SELECT count(articleId) as totalItems from article where isAboutUs=0;`
    return query(sql,[])
}
// 文章分页
exports.findArticleForPage=(pageIndex,pageSize)=>{
    let sql=`SELECT title,content,createAt,articleId from article where isAboutUs=0   order by createAt desc limit ${pageIndex-1}, ${pageSize};`
    return query(sql,[])
}
// 获取文章详情
exports.findArticleById=(value)=>{
    let sql=`SELECT title,content,createAt from article where articleId=?;`
    return query(sql,value)
}
// 获取关于我们
exports.findAboutUs=(value)=>{
    let sql=`SELECT title,content,createAt from article where isAboutUs=1;`
    return query(sql,value)
}