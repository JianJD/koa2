var router = require('koa-router')();
var query = require('../mysqlLib/pool')
var request = require('request')
exports.findUserById=(value)=>{
    let sql = `SELECT * FROM usersShop WHERE openId='${value}' LIMIT 1;`;
    return query (sql)
}
exports.addUeer=(value)=>{
    let _sql = `insert into usersShop SET openId=? ,userName=?,header=?,registerTime=?;`
    return query (_sql,value)
}