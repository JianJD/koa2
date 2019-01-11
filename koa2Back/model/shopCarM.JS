var query=require('../mysqlLib/pool');
// 加入购物车
exports.addShopCar=function(value){
    let sql = `INSERT INTO shopcar SET userId=?,num=?,productId=?, specJson=? ,createAt=now();`;
    return query(sql,value)
}
// 删除购物车
exports.delShopCar=function(value){
    let sql = `DELETE FROM shopcar WHERE shopCarId in (${value});`;
    return query(sql)
}
// 修改购物车数量
exports.changeShopCarNum=function(value,Type){
    let sql= `UPDATE shopcar SET specJson=? WHERE shopCarId=?;`;
    
    return query(sql,value)
}
// 修改购物车数量
exports.findShopCarById=function(value){
    let sql= `SELECT specJson from shopcar where shopCarId=?`;
    
    return query(sql,value)
}
// 查询购物车列表
exports.shopCarListForPage=function(value){
    
    let sql = `SELECT
	a.shopCarId,
	a.userId,
    a.productId,
    a.specJson,
    a.num,
	b.classId,
	b.isForSale,
	b.productTitle,
    b.sendMoney
    
FROM
	shopcar AS a
    LEFT JOIN production AS b ON a.productId = b.productId 
WHERE
	a.userId =? 
ORDER BY
	a.shopCarId DESC 
	LIMIT ?,?;`;
    return query(sql,value)
}
// 查询总个数
exports.findTotalItems=function(value){

  let sql =  `SELECT
                    count( a.shopCarId ) AS totalItems 
                FROM
                    shopcar AS a
                LEFT JOIN production AS b ON a.productId = b.productId 
                WHERE
                 a.userId =? 
                ORDER BY
                a.shopCarId DESC;`;
     return query(sql,value)
}
// 根据商品id查数据
exports.findByProductId=(value)=>{
    let sql=`select shopCarId , num,specJson from shopcar where productId=? AND userId=?;`
    return query(sql,value)
}