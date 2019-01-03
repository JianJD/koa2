// pages/createAddress/createAddress.js
import areaList from '../../utils/util.js'
import Notify from '../compoents/notify/notify';
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList: areaList,
    isDefault: true,
    receiver: '',
    receiverPhone: '',
    receiverAddress: '',
    receiverProvince: '',
    receiverCity: '',
    receiverArea: '',
    addressId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    if (options.where=='edit')
    {
      let data = options.info.split(',')
      that.setData({
        receiver: data[1],
        receiverPhone: data[2],
        receiverAddress: data[6],
        receiverProvince: data[3],
        receiverCity: data[4],
        receiverArea: data[5],
        addressId: data[0],
        isDefault:data[7]==1?true:false
      })
    }
  },

  receiverAddress(e) {
    that.setData({
      receiverAddress: e.detail
    })
  },
  receiver(e) {
    that.setData({
      receiver: e.detail
    })
  },
  receiverPhone(e) {
    that.setData({
      receiverPhone: e.detail
    })
  },

  isDefault(e) {
    this.setData({
      isDefault: e.detail
    })
  },
  show() {
    this.setData({
      show: true
    })
  },
  cancel() {
    this.setData({
      show: false
    })
  },
  confirm(e) {
    console.log(e)
    let area = e.detail.detail
    this.setData({
      receiverProvince: area.province,
      receiverCity: area.city,
      receiverArea: area.county,
      show: false
    })
  },
  // 保存
  save() {
    if (!this.data.receiver) {
      Notify('请输入收件人');
      return
    }
    if (!this.data.receiverPhone) {
      Notify('请输入收件人联系电话');
      return
    }
    if (!this.data.receiverProvince && !this.data.receiverCity && !this.data.receiverArea) {
      Notify('请选择省市区');
      return
    }
    if (!this.data.receiverAddress) {
      Notify('请输入详细地址');
      return
    }

    let formData = {
      userId:getApp().globalData.userId,
      receiver:this.data.receiver,
      receiverPhone:this.data.receiverPhone,
      receiverProvince:this.data.receiverProvince,
      receiverCity:this.data.receiverCity,
      receiverArea:this.data.receiverArea,
      receiverAddress:this.data.receiverAddress,
      isDefault:this.data.isDefault?1:0,
      Type:0,
    }
    if(this.data.addressId!='')
    {
      formData.addressId=this.data.addressId
      formData.Type = 1
    }
    getApp().ajaxResetS('/createAddress', formData,res=>{
      if(res.data.Code==1)
      {
        Notify({
          text: '保存成功',
          duration: 1000,
          selector: '#van-notify',
          backgroundColor: '#4b0'
        })
        wx.navigateBack({
          delta:1
        })
      }
    })
  }
})