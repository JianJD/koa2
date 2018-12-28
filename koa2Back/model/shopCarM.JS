var query=require('../mysqlLib/pool');
// 加入购物车
exports.addShopCar=function(value){
    let sql = `INSERT INTO shopcar SET userId=?,num=?,productId=?,createAt=now();`;
    return query(sql,value)
}
// 删除购物车
exports.delShopCar=function(value){
    let sql = `DELETE FROM shopcar WHERE shopCarId in (${value});`;
    return query(sql)
}
// 修改购物车数量
exports.changeShopCarNum=function(value,Type){
    let sql='';
    if(Type==0)
    {
        sql= `UPDATE shopcar SET num=num+1 WHERE shopCarId=?;`;
    }else
    {
        sql= `UPDATE shopcar SET num=num-1 WHERE shopCarId=?;`;
    }
    return query(sql,value)
}
// 查询购物车列表
exports.shopCarListForPage=function(value){
    
    let sql = `SELECT
	a.shopCarId,
	a.userId,
	a.productId,
	b.classId,
	b.isForSale,
	b.productTitle,
	b.swiperImg,
	b.memberPrice,
	b.price,
	b.productDetail,
	b.saleNum,
	b.stock
	
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