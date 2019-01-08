// pages/orderDetail/orderDetail.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    imgUrl:getApp().globalData.ajaxUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      that=this;
    that.data.orderId = options.orderId;
    that.getDetail()
  },
getDetail(){
  getApp().ajaxResetS('/findOrderInfoByOrderId',{
    orderId: that.data.orderId
  },res=>{
    console.log(res)
    if(res.data.Code==1)
    {
      that.setData({
        addressData:res.data.Data.addressInfo,
        list:res.data.Data.productInfo,
        allData: res.data.Data
      })
      let money=0
     
      that.setData({
        info:res.data.Data
      })
    }
  })
}
  
})