var query=require('../mysqlLib/pool');
// 下单
exports.createOrder=function(value){
    let sql = `INSERT INTO orderTable SET userId=?,productId=?,addressInfo=?,productInfo=?,creatAt=Now(),orderSatus=0;`
    return query(sql,value)
}
// 更新订单状态
exports.updateOrderStatus=function(value){
    let sql='';
    if(value[0]==2)
    {   
         sql = `UPDATE orderTable SET orderSatus=?,sendAt=Now() WHERE orderId=?`
    }
    if(value[0]==3)
    {
         sql = `UPDATE orderTable SET orderSatus=?,completeAt=Now() WHERE orderId=?`
    }
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
