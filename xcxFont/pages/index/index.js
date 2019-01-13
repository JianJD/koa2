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
        wx.stopPullDownRefresh()
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
        
      }
    }) 
  },
  go(e){
    console.log(e)
    wx.navigateTo({
      url: `/pages/productDetail/productDetail?productId=${that.data.list[e.detail.index].productId}`,
    })
  },
 onPullDownRefresh(){
   that.data.list=[]
   that.data.formData.pageIndex=1
   that.onLoad()
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
    getApp().ajaxResetS('/findProductByProductId', { productId: e.detail }, res => {
      console.log(res)
      if (res.data.Code == 1) {
        let Data = res.data.Data[0]
        that.setData({
          specArr: JSON.parse(Data.childrenProduct).spec,
          detail: JSON.parse(Data.childrenProduct).detail,
          stock:Data.stock,
          memberPrice: Data.memberPrice,
          price:Data.price,
          sendMoney:Data.sendMoney,
          price: Data.price,
          url: JSON.parse(Data.swiperImg)[0].url,
          isShowChoose:true,
          productId:Data.productId,
          productTitle: Data.productTitle
        })
        wx.hideLoading()
      }
    })
  },
  addShopCar(e){

    let data = e.detail
    data.productTitle = that.data.productTitle
    data.sendMoney = that.data.sendMoney
    data.productId = that.data.productId
    getApp().ajaxResetS('/addShopCar', {
      num: e.detail.num,
      userId: getApp().globalData.userId,
      productId: that.data.productId,
      specJson: JSON.stringify(data)
    }, res => {
      if (res.data.Code == 1) {
        wx.showToast({
          title: '成功',
        })
        that.setData({
          isShowChoose: false
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
