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
    list:[]
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
  onReachBottom(){
    if(that.data.formData.pageIndex<that.data.totalPages)
    {
      that.data.formData.pageIndex+=1;
      that.getPro()
    }
  }
})
