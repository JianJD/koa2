// pages/public/address/address.js

var that;
Page({
  data: {

    pageWhere: '',
    callbackData: '',
    checkedId: ''
  },
  onShow: function () {

    
    //获取收货地址列表
    that.getAddress()
  },
  onLoad(options){
    that = this;

    that.data.where = options.where?options.where:0
    that.setData({
      where:that.data.where
    })
  },
  goEdit(e){
    let idx=e.currentTarget.dataset.idx;
    let data=that.data.callbackData[idx]
    wx.navigateTo({
      url: `/pages/createAddress/createAddress?where=edit&info=${data.addressId},${data.receiver},${data.receiverPhone},${data.receiverProvince},${data.receiverCity},${data.receiverArea},${data.receiverAddress},${data.isDefault}`,
    })
  },
  //选择微信地址
  chooseAddress: function () {
    wx.getSetting({
      success(res) {
        console.log(!res.authSetting['scope.address'])
        if (!res.authSetting['scope.address']) { //如果 设置中地址设置失败（即不同意时）
          wx.authorize({ //调用 授权窗口  询问用户是否允许获取地址
            scope: 'scope.address',
            success() {              // success  返回的参数
              console.log('地址权限成功');
            }, fail: function () {
              console.log('地址权限成功')
              getApp().wxtsLayerB('请先同意获取微信地址权限！', function () {
                wx.openSetting({
                  success: (res) => {
                    res.authSetting = {
                      "scope.address": true,
                    }
                  }
                })
              })

            }
          })
        } else {
          console.log('授权成功的时候')
          wx.chooseAddress({
            success: function (msg) {
              //新增地址数据
              getApp().ajaxResetS('/ShippingAddress/AddReceiveInfo', 'post', { PersonName: msg.userName, Province: '0', City: '0', Area: '0', ProvinceName: msg.provinceName, CityName: msg.cityName, AreaName: msg.countyName, ReceiveAddress: msg.detailInfo, PostCode: msg.postalCode, ReceivePhone: msg.telNumber, IsDefault: '1' }, function (res) {
                if (res.data.Code == 0) {
                  getApp().qptsLayer('新增失败，请重试！')
                }
                if (res.data.Code == 1) {
                  getApp().qptsLayerB('新增成功！', function () {
                    addressVal = res.data.Data.ID + ',' + res.data.Data.PersonName + ',' + res.data.Data.ReceivePhone + ',' + res.data.Data.ReceiveAddress;
                    wx.setStorage({
                      key: 'addressVal',
                      data: addressVal,
                      success: function (res) {
                        wx.navigateBack({  //返回上一页
                          delta: 1
                        })
                      }
                    })
                  })
                }

              })
            }
          })
        }
      }
    })

  },
  delAddress: function (e) { //删除地址
    wx.showModal({
      content: '您确定要删除此地址？',
      success: function (res) {
        if (res.confirm) {
          getApp().ajaxResetS('/delAddress', { addressId: e.target.dataset.id }, function (res) {
            console.log(res)
            if (res.data.Code == 1) {
              that.data.callbackData.splice(e.target.dataset.idx,1);
              that.setData({
                callbackData:that.data.callbackData
              },()=>{
                if(that.data.callbackData.length==0)
                {
                  that.getAddress()
                }
              })
            } 
          })
        }
      }
    })

  },
  getAddress(){
    getApp().ajaxResetS('/findAddressByUserId', { userId: getApp().globalData.userId }, res => {
      if (res.data.Code == 1) {
        that.setData({
          callbackData: res.data.Data
        })
      }
    })
  },
  // click(){
  //   wx.navigateTo({
  //     url: '/pages/createAddress/createAddress',
  //   })
  // },
  setDefaultY(e){
    getApp().ajaxResetS('/changeDefaultTrue', {
      addressId:e.currentTarget.dataset.id
    },res=>{
      if(res.data.Code==1)
      {
        that.getAddress()
      }
    })
  },
  choose(e){
    if(that.data.where==1)
      {
        wx.setStorage({
          key: 'addressData',
          data: that.data.callbackData[e.currentTarget.dataset.index],
          success() {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    
    }
})

