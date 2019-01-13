// pages/orderDetail/orderDetail.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    imgUrl: getApp().globalData.ajaxUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.data.orderId = options.orderId;
    that.getDetail()
  },
  getDetail() {
    getApp().ajaxResetS('/findOrderInfoByOrderId', {
      orderId: that.data.orderId
    }, res => {
      console.log(res)
      if (res.data.Code == 1) {
        that.setData({
          addressData: res.data.Data.addressInfo,
          list: res.data.Data.productInfo,
          allData: res.data.Data
        })
        let money = 0

        that.setData({
          info: res.data.Data
        })
      }
    })
  },
  pay() {
    getApp().pay(that.data.allData.totalMoney, that.data.allData.orderId, function (res) {
      that.data.allData.orderStatus = 1;
      that.setData({
        allData: that.data.allData
      })
    })
  },
  done(e) {
    getApp().ajaxResetS('/orderComplete', {
      orderId: that.data.allData.orderId
    }, res => {
      if (res.data.Code == 1) {
        that.data.allData.orderStatus = 3;
        that.setData({
          allData: that.data.allData
        })
      }
    })
  },

})