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
    let sql=`SELECT
	a.*
	 
FROM
	production AS a
	
WHERE
	a.productId IN ( ${productId} );`
    return query(sql) 
}
exports.getProductList=(value)=>{
    let sql=''
    if(value[0]==0)
    {
        sql=`SELECT a.*,b.className FROM production as a left join productClass as b on a.classId=b.classId where a.isForSale=${value[3]} order by a.productId desc limit ${value[1]} , ${value[2]};`;
    }else
    {
        sql=`SELECT a.*,b.className FROM production as a left join productClass as b on a.classId=b.classId where a.isForSale=${value[3]} and a.classId=${value[0]} order by a.productId desc limit ${value[1]} , ${value[2]};`;

    }
    return query(sql,value)
}
// 查询商品总个数
exports.totalItems=(value)=>{
    let sql='';
    //0表示查询全部
    if(value[0]==0)
    {
        sql=`SELECT a.*,b.className FROM production as a left join productClass as b on a.classId=b.classId where a.isForSale=${value[3]} order by a.productId desc ;`;
    }else//按照分组id查询商品
    {
        sql=`SELECT a.*,b.className FROM production as a left join productClass as b on a.classId=b.classId where a.isForSale=${value[3]} and a.classId=${value[0]} order by a.productId desc ;`;

    }
    return query(sql,value)
}
// 商品上下架
exports.upAndDown=(value)=>{
    let sql=`update production set isForSale=? where productId=?;`;
    return query(sql,value)
}