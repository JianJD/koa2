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
      this.triggerEvent('car', e.currentTarget.dataset.id)
      return
     
    }
  }
})
