var mysql = require('mysql');
var query=require('./pool');

//   创建user表
let newUser =
  `create table if not exists usersShop(
     userId INT NOT NULL AUTO_INCREMENT,
     openId VARCHAR(100) DEFAULT NULL COMMENT '微信openid',
     userName VARCHAR(100) NOT NULL COMMENT '用户名',
     header VARCHAR(255) NULL COMMENT '头像',
     registerTime VARCHAR(100) NOT NULL COMMENT '注册时间',
     PRIMARY KEY ( userId )
    );`
    // 创建订单表
let order =
  `create table if not exists orderTable(
    orderId INT NOT NULL AUTO_INCREMENT,
    userId VARCHAR(100) NOT NULL COMMENT '用户ID',
    productId VARCHAR(100) NOT NULL COMMENT '商品id',
    addressInfo TEXT NOT NULL COMMENT '地址信息',
    orderStatus INT DEFAULT 0 COMMENT '订单状态 0 未付款 1已付款 2待发货  3已完成',
    productInfo TEXT(0) DEFAULT NULL COMMENT '商品内容',
    creatAt DATETIME  NULL DEFAULT CURRENT_TIMESTAMP COMMENT  '创建时间',
    payAt VARCHAR(100) DEFAULT NULL  COMMENT '付款时间',
    sendAt VARCHAR(100) DEFAULT NULL  COMMENT '发货时间',
    completeAt VARCHAR(100) DEFAULT NULL  COMMENT '完成时间',
    expressCode VARCHAR(20) DEFAULT NULL  COMMENT '快递单号',
    exPressCompany CHAR(20) DEFAULT NULL  COMMENT '快递公司',
    orderMoney DOUBLE DEFAULT NULL  COMMENT '商品金额',
    sendMoney DOUBLE DEFAULT NULL  COMMENT '运费',
    wxOrderId VARCHAR(255) DEFAULT NULL COMMENT '微信订单id',
    isApplyRefund INT DEFAULT 0 COMMENT '是否已经申请退款 0 否 1是',
    isRefund INT DEFAULT 0 COMMENT '是否已经退款',
    totalMoney DOUBLE DEFAULT NULL  COMMENT '订单总金额',
    PRIMARY KEY ( orderId )
        );`
    // 产品表
  let production=
  `create table if not exists production(
    productId INT NOT NULL AUTO_INCREMENT COMMENT '商品id',
    classId CHAR(10) DEFAULT NULL COMMENT '商品类别ID',
    isForSale INT DEFAULT 1 COMMENT '是否上架',
    productTitle VARCHAR(20) NOT NULL COMMENT '商品标题',
    swiperImg VARCHAR(255) NOT NULL COMMENT '商品轮播图',
    memberPrice DOUBLE NOT NULL COMMENT '商品会员价格',
    price DOUBLE NOT NULL COMMENT '商品原价',
    childrenProduct VARCHAR(255) DEFAULT NULL COMMENT '多规格',
    productDetail TEXT NOT NULL COMMENT '商品详情',
    saleNum INT DEFAULT 0 COMMENT '销量',
    sendMoney DOUBLE  DEFAULT NULL  COMMENT '运费',
    stock INT NOT NULL COMMENT '库存',
    video VARCHAR(100) DEFAULT NULL COMMENT '商品视频介绍',
    creatAt DATETIME  NOT NULL   COMMENT '商品创建时间',
    updateAt DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '商品更新时间',
    PRIMARY KEY ( productId )
  );`;
  let productionSpec=
  `create table if not exists productionspec(
    specId INT NOT NULL AUTO_INCREMENT COMMENT '商品规格id',
    productId VARCHAR(255) DEFAULT NULL COMMENT '商品ID',
    specImg VARCHAR(255) DEFAULT NULL COMMENT '商品规格图片',
    color VARCHAR(20) DEFAULT NULL COMMENT '商品颜色',
    price float NOT NULL COMMENT '规格价格',
    stock INT NOT NULL COMMENT '规格库存',
    size VARCHAR(255) DEFAULT NULL COMMENT '商品大小',
    PRIMARY KEY ( specId )
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
    createAt DATETIME NOT NULL  COMMENT '地址创建时间',
    updateAt DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '地址更新时间',
    isDefault TINYINT DEFAULT 0 COMMENT '是否是默认地址',
    PRIMARY KEY ( addressId )
  )`;
  // 创建商品分类表
  let classTable=
  `create table if not exists productClass(
    classId INT NOT NULL AUTO_INCREMENT,
    className CHAR(12) NOT NULL COMMENT '类别名称',
    createAt DATETIME NOT NULL  COMMENT '类别创建时间',
    updateAt DATETIME  DEFAULT CURRENT_TIMESTAMP COMMENT '类别更新时间',
    PRIMARY KEY (classId)
  );`;
  let  shopCar=
  `create table if not exists shopcar(
    shopCarId INT NOT NULL AUTO_INCREMENT COMMENT '购物车主键id',
    userId VARCHAR(255) NOT NULL COMMENT '用户id',
    specId VARCHAR(255) NOT NULL COMMENT '规格id',
    num INT NOT NULL COMMENT '商品数量',
    productId VARCHAR(255) NOT NULL COMMENT '商品id',
    createAt DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (shopCarId)
  );`;
  let  admin=
  `create table if not exists admin(
    adminId INT NOT NULL AUTO_INCREMENT COMMENT 'admin主键id',
    phone VARCHAR(255) NOT NULL COMMENT '用户手机',
    password VARCHAR(255) NOT NULL COMMENT '用户密码',
    loginTime datetime NOT NULL COMMENT '最后的登录时间',
    PRIMARY KEY (adminId)
  );`;
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
createTable(classTable)
createTable(shopCar)
createTable(productionSpec)
createTable(admin)