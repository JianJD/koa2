var query=require('../mysqlLib/pool')
exports.addOrEditClass=function(value,Type){
    if(Type==0)
    {
        let sql=`INSERT INTO productClass SET className=?,createAt=Now(),updateAt=Now();`
        return query(sql,value)
    }else
    {
        let sql=`UPDATE productClass SET  className=?,updateAt=Now() WHERE classId=?;`
        return query(sql,value)  
    }
    
}
// 删除类别
exports.delClass=function(classId){
    let sql=`DELETE FROM productClass WHERE classId='${classId}';`
    return query(sql)
}
// 验证类别名称是否存在
exports.hasClassName=function(name){
    let sql=`SELECT * FROM productClass WHERE className='${name}';`
    return query(sql) 
}
exports.getClassList=function(name){
    let sql=`SELECT * FROM productClass;`
    return query(sql) 
}
// 删除分类的时候把原来分类的商品归到全部下面
exports.changInitProductClass=(value)=>{
    let sql=`update production set classId=0 where classId=?;`
    return query(sql,value)
}
