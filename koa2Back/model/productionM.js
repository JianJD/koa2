var query = require('../mysqlLib/pool')
exports.addOrEditProduct=(value,Type)=>{
    let sql='';
    if(Type==0)//新增商品
    {
         sql = `INSERT INTO production SET classId=?,isForSale=?,productTitle=?,swiperImg=?,memberPrice=?,price=?,childrenProduct=?,productDetail=?,sendMoney=?,stock=?,video=?,creatAt=Now(),updateAt=Now();`;
         return query (sql,value)
    }else //编辑商品
    {
        sql = `UPDATE production SET classId=?,isForSale=?,productTitle=?,swiperImg=?,memberPrice=?,price=?,childrenProduct=?,productDetail=?,sendMoney=?,stock=?,video=?,updateAt=Now() WHERE productId=?;`;
        return query (sql,value)
    }
    
}
// 删除商品
exports.delProduct=(productId)=>{
    let sql=`DELETE FROM production WHERE productId="${productId}";`
    return query(sql)
}
// 查询商品
exports.findProductByProductId=(productId)=>{
    let sql=`SELECT * FROM production WHERE productId in (${productId});`
    console.log(sql)
    return query(sql) 
}