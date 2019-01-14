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
    pageIndex: 1,
    totalPages:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    that.data.pageIndex=1
    that.data.list=[]
    that.getOrderList()
  },

  tab(e) {
    if (that.data.orderStatus == e.currentTarget.dataset.index)
    {
      return
    }
    // that.data.orderStatus=e.currentTarget.dataset.index
    that.setData({
      orderStatus: e.currentTarget.dataset.index
    })
    that.data.pageIndex=1
    that.data.list=[]
    that.getOrderList()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    that.onShow()
    wx.stopPullDownRefresh()
   
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  loadMore: function () {
    if (that.data.pageIndex < that.data.totalPages)
      {
        that.data.pageIndex++;
        that.getOrderList()
      }else
      {
        // wx.showToast({
        //   title: '没有了哦',
        // })
      }
    
  },
  getOrderList() {
    getApp().ajaxResetS('/orderList', {
      userId: getApp().globalData.userId,
      orderStatus: that.data.orderStatus,
      pageIndex: that.data.pageIndex,
      pageSize: 10
    },res=>{
      wx.stopPullDownRefresh()
      if(res.data.Code==1)
      {
        let totalPages = res.data.Data.totalPage
        let data=res.data.Data.List;
        for(let item of data)
        {
          item.productInfo = JSON.parse(item.productInfo)
          
        }
       that.setData({
         list:that.data.list.concat(data),
         totalPages: totalPages
       })
        
      }
    })
  },
  del(e){

    getApp().ajaxResetS('/delOrder',{
      orderId:e.detail.orderId
    },res=>{
      console.log(res)
      if(res.data.Code==1)
      {
        that.data.list.splice(e.detail.index, 1)
        if(that.data.list.length==0)
        {
          that.data.pageIndex=1;
          that.getOrderList()
        }else
        {
          that.setData({
            list:that.data.list
          })
        }
      }
    })
  },
  go(e){
    console.log(e)
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?orderId=${e.detail.orderId}`,
    })
  },
  done(e){
    getApp().ajaxResetS('/orderComplete',{
      orderId: e.detail.orderId
    },res=>{
      if(res.data.Code==1)
      {
        that.data.list.splice(e.detail.index,1)
        that.setData({
          list:that.data.list
        })
        if(that.data.list2.length==0)
        {
          that.data.pageIndex=1;
          that.getOrderList()
        }
      }
    })
  },
  pay(e){
    let idx = e.detail.index;
    let orderId = e.detail.orderId;
    let money=new Number()
    money = that.data.list[idx].totalMoney;
   
    getApp().pay(money, orderId,function(res){
      console.log(res)
    })
  }
})