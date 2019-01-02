// pages/shopCar/shopCar.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:getApp().globalData.ajaxUrl,
    pageIndex:1,
    list:[],
    totalPages:0,
    checked:false,
    checkColor:'#4b0',
    isDel:false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    that.getShopCar()
  },
  toggle(){
    that.setData({
      isDel: !that.data.isDel,
      checkColor: that.data.isDel?"#4b0":"#ff5101",
      
    })
  },
  getShopCar(){
    getApp().ajaxResetS('/shopCarListForPage',{
      userId:getApp().globalData.userId,
      pageSize:10,
      pageIndex: that.data.pageIndex
    },res=>{
      if(res.data.Code==1)
      {
        for(let item of res.data.Data.List)
        {
          item.swiperImg = JSON.parse(item.swiperImg)
        }
        that.setData({
          list:that.data.list.concat(res.data.Data.List),
          totalPages:res.data.Data.totalPage
        })
      }
    })
  },
  changeNum(e){
    getApp().ajaxResetS('/changeShopCarNum',{
      shopCarId:that.data.list[e.currentTarget.dataset.idx].shopCarId,
      num:e.detail
    },res=>{
      if(res.data.Code==1)
      {
        console.log(res)
      }
    })
  },
  onChange(event){
    console.log(event)
    this.setData({
      result: event.detail
    });
  },
  isCheck(e){
    console.log(e)
    that.setData({
      checked:e.detail
    })
  }
})