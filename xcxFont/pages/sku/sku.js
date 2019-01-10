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
    },
    detail:{
      type:Array,
      value:[]
    },
    img:{
      type:String,
      value:''
    },
    price:{
      type:[String,Number],
      value:'',
    },
    stock:{
      type: [String, Number],
      value:''
    },
    productInfo:{
      type:String,
      value:''
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
    stock:'',
    _id:[],
    returnData:{}
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
      let idx2 = e.currentTarget.dataset.idx2;
      let arr=[]
      // 点击一个就默认变成false
      for (let item of that.data.listData[idx].specAttr)
      {
        item.isChoose = false
      }
      that.data.listData[idx].specAttr[idx2].isChoose = !that.data.listData[idx].specAttr[idx2].isChoose
      for(let i=0;i<that.data.listData.length;i++)
      {
        for (let j = 0; j < that.data.listData[i].specAttr.length;j++)
        {
          if (that.data.listData[i].specAttr[j].isChoose)
          {
            arr.push(j)
            break
          }
        }
      }
      that.setData({
        listData:that.data.listData
      })
      that.data._id=arr
      let _ids =arr.join('#')
      let chooseJosn=''
      if(arr.length==that.data.listData.length)
      {
        for(let item of that.data.detail)
        {
          if (item._id == _ids)
          {
            chooseJosn=item
            break
          }
        }
      }
      if (chooseJosn=='')
      {
        that.setData({
          listData: that.data.listData
        })
        that.triggerEvent('chooseColor', false)
      }else
      {
        that.setData({
          listData: that.data.listData,
          img:chooseJosn.imgUrl[0].url,
          price:chooseJosn.price,
          stock:chooseJosn.stock,
          returnData: chooseJosn
        })
        that.triggerEvent('chooseColor', true)
      }
     
      console.log(chooseJosn)
    
     
    },
  
    addCar(){
      let that=this
      if(that.data._id.length<that.data.listData.length)
      {
        wx.showToast({
          title: '请先选择分类',
        })
        return
      }
      that.data.returnData.num=that.data.num
      that.data.returnData.productId = that.data.productId
      that.triggerEvent('addCar',that.data.returnData)
    },
    Buy() {
      let that = this
      if (that.data._id.length < that.data.listData.length) {
        wx.showToast({
          title: '请先选择分类',
        })
        return
      }
      that.data.returnData.num = that.data.num
      that.data.returnData.productId = that.data.productId
      that.triggerEvent('buy', that.data.returnData)
    },
    onChange(e){
      let that=this;
      that.data.num=e.detail
      that.triggerEvent('num', that.data.num)
    },
    
  }
})
