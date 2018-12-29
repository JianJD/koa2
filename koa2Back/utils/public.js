var query = require('../mysqlLib/pool')
exports.timeFormat = function () {
    let date = new Date();
    let h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    let m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    let s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    let time = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${h}:${m}:${s}`;
    return time
}
exports.reponseData = function (Code, Data, msg) {
    return {
        Code,
        Data,
        msg
    }
}
exports.totalItems = function () {
    let sql = `SELECT
     count( a.shopCarId ) AS totalItems 
    FROM
        shopcar AS a
    LEFT JOIN production AS b ON a.productId = b.productId 
    WHERE
    a.userId =? 
    ORDER BY
    a.shopCarId DESC;`;
}


