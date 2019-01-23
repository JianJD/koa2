var query=require('../mysqlLib/pool');
// 下单
exports.createOrder=function(value){
    let sql = `INSERT INTO orderTable SET userId=?,productId=?,addressInfo=?,productInfo=?,sendMoney=?,orderMoney=?,totalMoney=?,creatAt=Now(),orderStatus=0;`
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
                    left join usersShop as b
                    on a.userId=b.openId
                WHERE
                    orderStatus =? 
                ORDER BY
                    orderId DESC limit ?,?;`;
    return query(sql,value)
}
// 获取今日订单数
exports.findOrderNumToday=()=>{
    let sql=`SELECT
        count(orderId) as toDayOrderNum
    FROM
        orderTable 
    WHERE
        TO_DAYS( creatAt ) = TO_DAYS( now( ) )
        AND (orderStatus = 1 
            OR orderStatus = 2 
            OR orderStatus = 3);`
        return query(sql,[])
}
// 获取历史订单数
exports.findOrderNumHistory=()=>{
    let sql=`SELECT
        count(orderId) as historyOrderNum
    FROM
        orderTable 
    WHERE
         orderStatus = 1 
            OR orderStatus = 2 
            OR orderStatus = 3;`
        return query(sql,[])
}
// 获取今日盈利的钱数
exports.findOrderMoneyToday=()=>{
    let sql=`SELECT
            SUM( totalMoney ) AS toDayMoney 
        FROM
            orderTable 
        WHERE
            TO_DAYS( creatAt ) = TO_DAYS( now( ) ) 
            AND (orderStatus = 1 
            OR orderStatus = 2 
            OR orderStatus = 3);`
        return query(sql,[])
}
// 获取历史金额
exports.findOrderMoneyHistory=()=>{
    let sql=`SELECT
            SUM( totalMoney ) AS historyMoney 
        FROM
            orderTable 
        WHERE
            orderStatus = 1 
            OR orderStatus = 2 
            OR orderStatus = 3;`
        return query(sql,[])
}

