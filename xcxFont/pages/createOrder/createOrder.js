// pages/createOrder/createOrder.js
var that;
import Notify from '../compoents/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: '',
    list: [],
    money: 0,
    imgUrl: getApp().globalData.ajaxUrl,
    list: [],
    productMoney: 0,
    sendMoney: 0,
    totalMoney: 0,
    totalMoneyA: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    
    wx.getStorage({
      key: 'productInfo',
      success: function (res) {
        console.log(res)
        that.setData({
          list: res.data
        }, () => {
          for (let item of that.data.list) {
            that.data.productMoney += item.memberPrice * item.num
            that.data.sendMoney = item.sendMoney
          }
          that.setData({
            productMoney: that.data.productMoney,
            sendMoney: that.data.sendMoney,
            totalMoney: that.data.productMoney + that.data.sendMoney,
            totalMoneyA: (that.data.productMoney + that.data.sendMoney) * 100
          })
        })

        wx.removeStorage({
          key: 'productInfo',
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    that.getAddress()
  },
  getAddress() {
    getApp().ajaxResetS('/findAddressByUserId', { userId: getApp().globalData.userId }, res => {
      if (res.data.Code == 1) {
        if (res.data.Data.length != 0) {
          that.setData({
            addressData: res.data.Data[0]
          })
        }
      }
    })
  },
submit(){
  if(that.data.addressData=='')
  {
    Notify('请先选择收货地址');
    return
  }
  let ids=[];
  let proNum=[];
  for (let item of that.data.list)
  {
    ids.push(item.productId)
    proNum.push(item.num)
  }
  getApp().ajaxResetS('/createOrder', {
    userId: getApp().globalData.userId,
    productId: ids.toString(),
    addressId: that.data.addressData.addressId,
    proNum: proNum.join('#')
  }, res => {
    if (res.data.Code == 1) {
     getApp().Toast('下单成功')
    }
  })
}
})