var mysql = require('mysql');
var config = require('../config/config')

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT
});
// mysql连接池
let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}
//   创建user表
let users =
  `create table if not exists users(
     userId INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     pass VARCHAR(100) NOT NULL COMMENT '密码',
     avator VARCHAR(100) NULL COMMENT '头像',
     moment VARCHAR(100) NOT NULL COMMENT '注册时间',
     PRIMARY KEY ( userId )
    );`
let article =
  `create table if not exists article(
            articleId INT NOT NULL AUTO_INCREMENT,
            title VARCHAR(100) NOT NULL COMMENT '文章标题',
            avator VARCHAR(100) NOT NULL COMMENT '文章作者',
            content TEXT(0) DEFAULT NULL COMMENT '文章内容',
            creatAt INT  DEFAULT  0 COMMENT '创建时间',
            PRIMARY KEY ( articleId )
        );`
let createTable = (sql) => {
  return query(sql, []).then(res => {
  }).catch(err => {
    console.log(err)
  })
}

// 建表
createTable(users)
createTable(article)
exports.addUser = function (value) {
  let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
  return query(_sql, value).then(res => {

  }).catch(err => {

  })
}
exports.users = function (value) {
  let _sql = "select * from users;"
  return query(_sql, value)


}