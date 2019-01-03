//app.js
import Toast from './pages/compoents/toast/toast';

App({
  onLaunch: function () {

    // 获取用户信息

  },

  wxGetSetting(success=function(){},fail=function(){}) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          success()
        } else {
          fail()
        }
      }
    })
  },
  globalData: {
    isCanGetUserInfo: 0,
    ajaxUrl: 'http://192.168.2.59:3001',
    userInfo: '',
    userId:'',
  },
  Toast(txt){
    Toast(txt)
  },
  ajaxResetS(url, data, successCallBack) {
    wx.request({
      url: `${getApp().globalData.ajaxUrl}${url}`,
      data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      method: 'post',
      success(res) {
        successCallBack(res)
      }
    })
  },
  wxLogin() {
    wx.getUserInfo({
      success(res) {
        console.log(res)
        getApp().globalData.userInfo = res.userInfo;
        wx.login({
          success(res) {
            wx.request({
              url: `${getApp().globalData.ajaxUrl}/wxlogin`,
              data: {
                code: res.code,
                userName: getApp().globalData.userInfo.nickName,
                header: getApp().globalData.userInfo.avatarUrl
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              },
              method: 'post',
              success(res) {
                console.log(res)
                getApp().globalData.userId = res.data.Data[0].openId
              }
            })
          }
        })
      }
    })
  }
})