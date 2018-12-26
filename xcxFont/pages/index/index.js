//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.login({
      success(res){
        wx.request({
          url: "http://127.0.0.1:3001/wxlogin",
          data: {
            code: res.code,
            userName:'jjd',
            header:'123'
          },
          header:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
          method:'post',
          success(res){
            console.log(res)
          }
        }) 
      }
    })
   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {

      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  upload(){
    wx.chooseImage({
      success: function(res) {
        let path=res.tempFilePaths[0]
        wx.uploadFile({
          url: 'http://127.0.0.1:3001/uploadfiles',
          filePath: path,
          name: 'file',
          success(res){
            console.log(res)
          }
        })
      },
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
