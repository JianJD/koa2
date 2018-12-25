var mysql = require('mysql');
var query=require('./pool')
//   创建user表
let newUser =
  `create table if not exists usersShop(
     userId INT NOT NULL AUTO_INCREMENT,
     openId VARCHAR(100) DEFAULT NULL COMMENT '微信openid',
     userName VARCHAR(100) NOT NULL COMMENT '用户名',
     header VARCHAR(100) NULL COMMENT '头像',
     registerTime VARCHAR(100) NOT NULL COMMENT '注册时间',
     PRIMARY KEY ( userId )
    );`
    // 创建订单表
let order =
  `create table if not exists orderTable(
    orderId INT NOT NULL AUTO_INCREMENT,
    userId VARCHAR(100) NOT NULL COMMENT '用户ID',
    orderSatus INT DEFAULT 0 COMMENT '订单状态 0 未付款 1已付款 2待发货  3已完成',
    orderDetail TEXT(0) DEFAULT NULL COMMENT '商品内容',
    creatAt DATETIME  NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
    payAt VARCHAR(100) DEFAULT NULL  COMMENT '付款时间',
    sendAt VARCHAR(100) DEFAULT NULL  COMMENT '发货时间',
    completeAt VARCHAR(100) DEFAULT NULL  COMMENT '完成时间',
    expressCode VARCHAR(20) DEFAULT NULL  COMMENT '快递单号',
    exPressCompany CHAR(20) DEFAULT NULL  COMMENT '快递公司',
    orderMoney DOUBLE DEFAULT NULL  COMMENT '商品金额',
    sendMoney DOUBLE DEFAULT NULL  COMMENT '运费',
    totalMoney DOUBLE DEFAULT NULL  COMMENT '订单总金额',
    PRIMARY KEY ( orderId )
        );`
    // 产品表
  let production=
  `create table if not exists production(
    productId INT NOT NULL AUTO_INCREMENT COMMENT '商品id',
    productTitle VARCHAR(20) NOT NULL COMMENT '商品标题',
    swiperImg VARCHAR(255) NOT NULL COMMENT '商品轮播图',
    memberPrice DOUBLE NOT NULL COMMENT '商品会员价格',
    price DOUBLE NOT NULL COMMENT '商品原价',
    childrenProduct VARCHAR(255) NOT NULL COMMENT '多规格',
    productDetail TEXT NOT NULL COMMENT '商品详情',
    saleNUm INT DEFAULT 0 COMMENT '销量',
    sendMoney DOUBLE  DEFAULT NULL  COMMENT '运费',
    stock INT NOT NULL COMMENT '库存',
    video VARCHAR(100) DEFAULT NULL COMMENT '商品视频介绍',
    PRIMARY KEY ( productId )
  );`;
  //收货地址表
  let addressReceive=
  `create table if not exists addressReceive(
    addressId INT  NOT NULL AUTO_INCREMENT,
    userId VARCHAR(100) NOT NULL COMMENT '用户表外键',
    receiver VARCHAR(20) NOT NULL COMMENT '收件人',
    receiverPhone VARCHAR(15) NOT NULL COMMENT '收件人手机号码',
    receiverProvince VARCHAR(20) NOT NULL COMMENT '收件人省份',
    receiverCity VARCHAR(20) NOT NULL COMMENT '收件人市',
    receiverArea VARCHAR(20) NOT NULL COMMENT '收件人区',
    receiverAddress VARCHAR(255) NOT NULL COMMENT '收件人具体地址',
    isDefault TINYINT DEFAULT 0 COMMENT '是否是默认地址',
    PRIMARY KEY ( addressId )
  )`;
let createTable = (sql) => {
  return query(sql, []).then(res => {
  }).catch(err => {
    console.log(err)
  })
}

// 建表
createTable(newUser)
createTable(order)
createTable(production)
createTable(addressReceive)
exports.addUser = function (value) {
  let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
  return query(_sql, value).then(res => {

  }).catch(err => {

  })
}
