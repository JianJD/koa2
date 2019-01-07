// pages/sku/sku.js
import Toast from '../compoents/toast/toast';
Component({
  /**
   * 组件的属性列表
   */
  options:{
    addGlobalClass: true,
  },
  properties: {
    isShowChoose:{
      type:Boolean,
      value:false
    },
    listData:{
      type:Array,
      value:[]
    },
    showBuy:{
      type: Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: getApp().globalData.ajaxUrl,
    img:'',
    colorIndex:null,
    num:1,
    stock:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close(){
      this.setData({
        isShowChoose:false
      })
    },
    chooseColor(e){
      let that=this
      let idx = e.currentTarget.dataset.idx;
      
      if (that.data.colorIndex!=null)
      {
        that.data.listData[that.data.colorIndex].isColorChoose=false
      }
      that.data.colorIndex = idx
      that.data.listData[idx].isColorChoose = !that.data.listData[idx].isColorChoose
      this.setData({
        img: that.data.listData[idx].specImg,
        listData:that.data.listData,
        price: that.data.listData[idx].price,
        stock: that.data.listData[idx].stock
      })
      let data={
        specId: that.data.listData[idx].specId,
        index: that.data.colorIndex
      }
      that.triggerEvent('chooseColor', data  )
    },
    chooseSize(e) {
      let that = this
      let idx = e.currentTarget.dataset.idx
      that.data.listData[idx].isSizeChoose = !that.data.listData[idx].isSizeChoose
      this.setData({
        listData: that.data.listData
      })
      that.triggerEvent('chooseSize', that.data.listData[idx].specId)
    },
    addCar(){
      let that=this
      if (that.data.colorIndex==null)
      {
        
       wx.showToast({
         title: '请先选择分类',
       })
        return
      }
      that.triggerEvent('addCar', that.data.listData[that.data.colorIndex].specId)
    },
    Buy() {
      let that = this
      if (that.data.colorIndex == null) {
        wx.showToast({
          title: '请先选择分类',
        })
        return
      }
      that.triggerEvent('buy', that.data.listData[that.data.colorIndex].specId)
    },
    onChange(e){
      let that=this;
      that.data.num=e.detail
      that.triggerEvent('num', that.data.num)
    }
  }
})
