// pages/myOrder/myOrder.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    imgUrl: getApp().globalData.ajaxUrl,
    orderStatus: 0,
    pageIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    that.getOrderList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  tab(e) {
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  getOrderList() {
    getApp().ajaxResetS('/orderList', {
      userId: 'oaKg65G995UnaF71UTkG0tmMgM14',
      orderStatus: that.data.orderStatus,
      pageIndex: that.data.pageIndex,
      pageSize: 10
    },res=>{
      if(res.data.Code==1)
      {
        let data=res.data.Data.List;
        for(let item of data)
        {
          item.productInfo = JSON.parse(item.productInfo)
        }
        that.setData({
          list:that.data.list.concat(data)
        })
        console.log(that.data.list)
      }
    })
  }
})