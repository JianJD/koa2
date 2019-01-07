var query=require('../mysqlLib/pool');
// 下单
exports.createOrder=function(value){
    let sql = `INSERT INTO orderTable SET userId=?,productId=?,addressInfo=?,productInfo=?,creatAt=Now(),orderStatus=0;`
    return query(sql,value)
}
// 更新订单状态
exports.updateOrderStatus=function(value){
    let sql='';
    if(value[0]==2)
    {   
         sql = `UPDATE orderTable SET orderStatus=?,sendAt=Now() WHERE orderId=?`
    }
    if(value[0]==3)
    {
         sql = `UPDATE orderTable SET orderStatus=?,completeAt=Now() WHERE orderId=?`
    }
    return query(sql,value)
}
exports.payOrder=function(value){
    let  sql = `UPDATE orderTable SET orderStatus=?,payAt=Now(), wxOrderId=? WHERE orderId=?`
    return query(sql,value)
}
// 删除订单
exports.delOrder=function(value){
    let sql = `DELETE FROM  orderTable WHERE orderId=?`
    return query(sql,value)
}
// 查看订单
exports.findOrderInfoByOrderId=(value)=>{
    let sql = `SELECT * FROM  orderTable WHERE orderId=?`
    return query(sql,value)
}
// 订单列表
exports.orderList=(value)=>{
    let sql = `SELECT
	                * 
                FROM
                    orderTable 
                WHERE
                    userId =? 
                    AND orderStatus =? 
                ORDER BY
                    orderId DESC limit ?,?;`;
    return query(sql,value)
}
// 查询订单总个数
exports.totalItems=(value)=>{
    let sql = `SELECT
                    COUNT( orderTable.orderId ) AS totalItems 
                FROM
                    orderTable 
                WHERE
                    userId =? 
                    AND orderStatus =? ;`;
    return query(sql,value)
}
exports.findOrderByUserId=(value)=>{
    let sql=`select orderId from orderTable where userId=? order by orderId desc limit 0,1; `;
    return query(sql,value)
}
// 查询订单总个数
exports.totalItemsAdmin=(value)=>{
    let sql = `SELECT
                    COUNT( orderTable.orderId ) AS totalItems 
                FROM
                    orderTable 
                WHERE
                    orderStatus =? ;`;
    return query(sql,value)
}
// 管理员订单列表
exports.orderListAdmin=(value)=>{
    let sql = `SELECT
	                a.*,b.userName,b.header 
                FROM
                    orderTable as a
                    left join usersshop as b
                    on a.userId=b.openId
                WHERE
                    orderStatus =? 
                ORDER BY
                    orderId DESC limit ?,?;`;
    return query(sql,value)
}
