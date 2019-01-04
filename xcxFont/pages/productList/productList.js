// pages/productList/productList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl:getApp().globalData.ajaxUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    go(e){
      
      this.triggerEvent('go',e.currentTarget.dataset)
    },
    addShopCar(e){
      getApp().ajaxResetS('/addShopCar', {
        num: 1,
        userId: getApp().globalData.userId,
        productId:e.currentTarget.dataset.id
      }, res => {
        if (res.data.Code == 1) {
          wx.showToast({
            title: '成功',
          })
        }
      })
    }
  }
})
