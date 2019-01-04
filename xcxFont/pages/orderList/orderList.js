// pages/orderList/orderList.js
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
  options: {
    addGlobalClass: true,
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

    delOrder(e){
      let data = {
        orderId: e.currentTarget.dataset.id,
        index: e.currentTarget.dataset.idx
      }
      this.triggerEvent('del', data)
    },
    pay(e) {
      let data = {
        orderId: e.currentTarget.dataset.id,
        index: e.currentTarget.dataset.idx
      }
      this.triggerEvent('pay', data)
    },
    orderCompelete(e) {
      console.log(e)
      let data = {
        orderId: e.currentTarget.dataset.id,
        index: e.currentTarget.dataset.idx
      }
      this.triggerEvent('ordercompelete', data)
    },
    goDetail(e) {
      console.log(e)
      let data = {
        orderId: e.currentTarget.dataset.id,
      }
      this.triggerEvent('go', data)
    },
  }
  
})
