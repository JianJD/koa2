// pages/productDetail/productDetail.js
var WxParse = require('../../wxParse/wxParse.js');
import Toast from '../compoents/toast/toast';
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo:'',
    imgUrl: getApp().globalData.ajaxUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.ShopCarNum()
    getApp().ajaxResetS('/findProductByProductId', { productId: options.productId},res=>{
      console.log(res)
      if(res.data.Code==1)
      {
        res.data.Data[0].swiperImg=JSON.parse(res.data.Data[0].swiperImg)
        that.setData({
          productInfo: res.data.Data[0]
        })
        let article = res.data.Data[0].productDetail
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
  },

  ShopCarNum(){
    getApp().ajaxResetS('/ShopCarNum',{
      userId:getApp().globalData.userId
    },res=>{
      console.log(res)
      if(res.data.Code==1)
      {
        that.setData({
          num:res.data.Data.num
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  addShopCar(){
    getApp().ajaxResetS('/addShopCar',{
      num:1,
      userId:getApp().globalData.userId,
      productId:that.data.productInfo.productId
    },res=>{
      if(res.data.Code==1)
      {
        Toast('成功')
        that.ShopCarNum()
      }
    })
  },
  createOrder(){
    let data=JSON.parse(JSON.stringify(that.data.productInfo))
    data.num=1
    wx.setStorage({
      key: 'productInfo',
      data: [data],
    })
    wx.navigateTo({
      url: '/pages/createOrder/createOrder',
    })
    return

    
  },
 
   
  
})