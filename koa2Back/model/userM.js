var query = require('../mysqlLib/pool')
var request = require('request')
exports.findUserById=(value)=>{
    let sql = `SELECT * FROM usersShop WHERE openId='${value}';`;
    return query (sql)
}
exports.addUser=(value)=>{
    let _sql = `insert into usersShop SET openId=? ,userName=?,header=?,registerTime=?;`
    return query (_sql,value)
}
// 管理员登录
exports.adminLogin=(value)=>{
    let _sql = `SELECT phone,password,adminId from admin where phone=?;`
    return query (_sql,value)
}
// 更新最后登录时间
exports.updateLoginTime=(value)=>{
    let _sql = `UPDATE admin SET loginTime=now() where adminId=?;`
    return query (_sql,value)
}