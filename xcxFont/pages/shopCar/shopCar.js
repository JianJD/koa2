// pages/shopCar/shopCar.js
var that;
import Toast from '../compoents/toast/toast';
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
    money:0
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
        that.data.list[e.currentTarget.dataset.idx].num=e.detail
        console.log(res)
        countMoney()
      }
    })
  },
  boxChange(e){
   let idx=e.currentTarget.dataset.idx
    that.data.list[idx].check=!that.data.list[idx].check;
    that.setData({
      list:that.data.list
    })
    countMoney()
  },
  isCheck(e){
    that.setData({
      checked:e.detail
    })
    if (e.detail)
    {
      for (let item of that.data.list) {
        item.check = true
      }
      that.setData({
        list: that.data.list
      })
    }else
    {
      for (let item of that.data.list) {
        item.check = false
      }
      that.setData({
        list: that.data.list
      })
    }
    countMoney()
  },
  submit(){
    let arr = []
    for (let item of that.data.list) {
      if (item.check) {
        arr.push(item.shopCarId)
      }
    }
    if(arr.length==0)
    {
      Toast('请先选择商品')
      return
    }
    if(that.data.isDel)
    {
      
      getApp().ajaxResetS('/delShopCar',{shopCarId:arr.toString()},res=>{
        if(res.data.Code==1)
        {
          Toast('删除成功')
          let arr1=that.data.list.filter(item=>{return item.check==false})
          that.setData({
            list:arr1
          })
          if(that.data.list.length==0)
          {
            that.data.pageIndex=1;
            that.getShopCar()
          }
        }
      })
    }else
    {
     
    }
  },
  submit(){
    let arr=that.data.list.filter(item=>{return item.check})
    if(arr.length==0)
    {
      Toast('请先选择商品')
      return
    }
    wx.setStorage({
      key: 'productInfo',
      data: arr,
    })
    wx.navigateTo({
      url: '/pages/createOrder/createOrder',
    })
  }
})
function countMoney(){
  let money=0;
  for(let item of that.data.list )
  {
    if(item.check)
    {
      money+=item.memberPrice*item.num
    }
  }
  that.setData({
    money:money*100
  })
}