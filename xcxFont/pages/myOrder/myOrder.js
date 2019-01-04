// pages/myOrder/myOrder.js
var that;
var index0=1 ,index1=1,index2=1,index3=1;
var pages0 = 0, pages1 = 0, pages2 = 0, pages3 = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list0: [],
    list1: [],
    list2: [],
    list3: [],
    imgUrl: getApp().globalData.ajaxUrl,
    orderStatus: 0,
    pageIndex: 1,
    scrollTop: 0
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
    that.data.orderStatus=e.detail.index
    that.data.pageIndex=1
    switch (that.data.orderStatus){
      case 0:{
        that.data.list0=[]
        break
      }
      case 1: {
        that.data.list1 = []
        break
      }
      case 2: {
        that.data.list2 = []
        break
      }
      case 3: {
        that.data.list3 = []
        break
      }
    }
    that.getOrderList()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      switch (that.data.orderStatus)
      {
        case 0:{
          if(index0<pages0)
          {
            index0++;
            that.data.pageIndex=index0
            that.getOrderList()
          }
          break
        }
        case 1: {
          if (index1 < pages1) {
            index1++;
            that.data.pageIndex = index1
            that.getOrderList()
          }
          break
        }
        case 2: {
          if (index2 < pages2) {
            index2++;
            that.data.pageIndex = index2
            that.getOrderList()
          }
          break
        }
        case 3: {
          if (index3< pages3) {
            index3++;
            that.data.pageIndex = index3
            that.getOrderList()
          }
          break
        }
      }
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
        let totalPages=res.data.Data.totalPages
        let data=res.data.Data.List;
        for(let item of data)
        {
          item.productInfo = JSON.parse(item.productInfo)
          for(let item2 of item.productInfo)
          {
            item2.swiperImg = JSON.parse(item2.swiperImg)
          }
        }
        switch (that.data.orderStatus){
          case 0:{
            that.setData({
              list0: that.data.list0.concat(data),
            })
            pages0 = totalPages
            break
          }
          case 1: {
            that.setData({
              list1: that.data.list1.concat(data)
            })
            pages1 = totalPages
            break
          }
          case 2: {
            that.setData({
              list2: that.data.list2.concat(data)
            })
            pages2 = totalPages
            break
          }
          case 3: {
            that.setData({
              list3: that.data.list3.concat(data)
            })
            pages3 = totalPages
            break
          }
        }
        
      }
    })
  },
  del(e){

    getApp().ajaxResetS('/delOrder',{
      orderId:e.detail.orderId
    },res=>{
      if(res.data.Code==1)
      {
        switch (that.data.orderStatus)
        {
          case 0:{
            that.data.list0.splice(e.detail.index, 1)
            if (that.data.list0.length == 0) {
              that.data.pageIndex = 1;
              that.getOrderList()
            }
            break
          }
          case 1: {
            that.data.list1.splice(e.detail.index, 1)
            if (that.data.list1.length == 0) {
              that.data.pageIndex = 1;
              that.getOrderList()
            }
            break
          }
          case 2: {
            that.data.list2.splice(e.detail.index, 1)
            if (that.data.list2.length == 0) {
              that.data.pageIndex = 1;
              that.getOrderList()
            }
            break
          }
          case 3: {
            that.data.list3.splice(e.detail.index, 1)
            if (that.data.list3.length == 0) {
              that.data.pageIndex = 1;
              that.getOrderList()
            }
            break
          }
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
        that.data.list2.splice(e.detail.index,1)
        that.setData({
          list2:that.data.list2
        })
        if(that.data.list2.length==0)
        {
          index2=1
          that.data.pageIndex=1;
          that.getOrderList()
        }
      }
    })
  }
})