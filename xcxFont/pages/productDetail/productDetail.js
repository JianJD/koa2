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
    imgUrl: getApp().globalData.ajaxUrl,
    specArr:[],
    isShowChoose:false,
    num:1
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
    
    getApp().ajaxResetS('/findSpecByProductId', { productId: options.productId }, res => {
      console.log(res)
      if (res.data.Code == 1) {
        that.setData({
          specArr: res.data.Data
        })
        
      }
    })
  },
  num(e){
    that.data.num=e.detail
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


  chooseColor(e){
    console.log(e)
    that.data.specId=e.detail.specId;
    that.data.specPrice = that.data.specArr[e.detail.index].price
  },
  addShopCar(){
    if (!that.data.specId)
    {
      that.setData({
        isShowChoose:true
      })
      return
    }
    getApp().ajaxResetS('/addShopCar',{
      num:that.data.num,
      userId:getApp().globalData.userId,
      productId:that.data.productInfo.productId,
      specId:that.data.specId
    },res=>{
      if(res.data.Code==1)
      {
        Toast('成功')
        that.ShopCarNum()
      }
    })
  },
  createOrder(){
    if (!that.data.specId) {
      that.setData({
        isShowChoose: true
      })
      return
    }
    let data=JSON.parse(JSON.stringify(that.data.productInfo))
    data.num=that.data.num;
    data.specId=that.data.specId
    data.specPrice = that.data.specPrice
    wx.setStorage({
      key: 'productInfo',
      data: [data],
    })
    wx.navigateTo({
      url: '/pages/createOrder/createOrder',
    })
    return

    
  },
 
  goshopcar(){
    wx.switchTab({
      url: '/pages/shopCar/shopCar',
    })
  } 
  
})