//index.js
//获取应用实例
let that;

Page({
  data: {
   classList:[],
   formData:{
     classId:0,
     pageIndex:1,
     pageSize:10,
     isForSale:1
    }, 
    currindex:0,
    list:[],
    isShowChoose:false,
    num:1,
    showBuy:false
  },
  
  onLoad: function () {
    that=this;
    getApp().ajaxResetS('/getClassList','',res=>{
      console.log(res)
      if(res.data.Code==1)
      {
        this.setData({
          classList:res.data.Data
        })
      }
    })
    that.getPro()
  },
  tab(e){
    that.data.formData.classId=that.data.classList[e.currentTarget.dataset.idx].classId;
    if (that.data.currindex != e.currentTarget.dataset.idx)
    {
      that.data.formData.pageIndex=1;
      that.data.list=[];
      that.getPro()
      that.setData({
        currindex: e.currentTarget.dataset.idx
      })
    }
  },
  getPro(){
    getApp().ajaxResetS('/getProductList', this.data.formData,res=>{
      console.log(res)
      if(res.data.Code==1)
      {
        for(let item of res.data.Data.List)
        {
          item.swiperImg = JSON.parse(item.swiperImg)
        }
        that.setData({
          list:that.data.list.concat(res.data.Data.List),
          totalPages:res.data.Data.totalPages
        })
        console.lo
      }
    }) 
  },
  go(e){
    console.log(e)
    wx.navigateTo({
      url: `/pages/productDetail/productDetail?productId=${that.data.list[e.detail.index].productId}`,
    })
  },
 
  loadMore(){
    if (that.data.formData.pageIndex < that.data.totalPages) {
      that.data.formData.pageIndex += 1;
      that.getPro()
    }
  },
  // 点击购物车图片
  car(e){
    wx.showLoading({
      title: '',
    })
    getApp().ajaxResetS('/findSpecByProductId', { productId: e.detail }, res => {
      console.log(res)
      if (res.data.Code == 1) {
        that.setData({
          specArr: res.data.Data,
          isShowChoose:true
        })
        wx.hideLoading()
      }
    })
  },
  addShopCar(e){
    getApp().ajaxResetS('/addShopCar', {
      num: that.data.num,
      userId: getApp().globalData.userId,
      productId: that.data.specArr[0].productId,
      specId: that.data.specId
    }, res => {
      if (res.data.Code == 1) {
        wx.showToast({
          title: '成功',
        })
        that.setData({
          isShowChoose:false
        })
      }
    })
  },
  chooseColor(e) {
    that.data.specId = e.detail.specId;
  },
  num(e) {
    that.data.num = e.detail
  },
})
