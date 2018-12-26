var router = require('koa-router')();
var query = require('../mysqlLib/pool')
exports.addOrEditProduct=(value,Type)=>{
    let sql='';
    if(Type==0)//新增商品
    {
         sql = `INSERT INTO production SET classId=?,isForSale=?,productTitle=?,swiperImg=?,memberPrice=?,price=?,childrenProduct=?,productDetail=?,sendMoney=?,stock=?;`;
         return query (sql,value)
    }else //编辑商品
    {
        sql = `UPDATE production SET classId=?,isForSale=?,productTitle=?,swiperImg=?,memberPrice=?,price=?,childrenProduct=?,productDetail=?,sendMoney=?,stock=? WHERE productId=?;`;
        return query (sql,value)
    }
    
}
exports.delProduct=(productId)=>{
    let sql=`DELETE FROM production WHERE productId="${productId}";`
    return query(sql)
}