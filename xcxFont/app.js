//app.js
import Toast from './pages/compoents/toast/toast';

App({
  onLaunch: function () {

    // 获取用户信息
    wx.hideTabBar({})
  },

  wxGetSetting() {
    return new Promise(function(resolve,reject){
      wx.getSetting({
        success: res => {
          console.log(res)
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            resolve(1)
          } else {
            console.log('失败')
            resolve(0)
          }
        },
        fail(){
          reject('失败')
        }
      })
    })
    
  },
  onShow(){


  },
  globalData: {
    isCanGetUserInfo: 0,
    ajaxUrl: 'http://47.102.118.154:3000',
    // ajaxUrl: 'http://192.168.2.98:3001',
    // ajaxUrl: 'http://127.0.0.1:3001',
    userInfo: '',
    userId:'',
    isLogin:0
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
                if(res.data.Code==1)
                {
                  getApp().globalData.isLogin=1
                  getApp().globalData.userId = res.data.Data[0].openId
                  console.log(getApp().globalData.userId)
                  console.log(res)
                }
                
              }
            })
          }
        })
      }
    })
  },
  pay(money, orderNum,callback){
    wx.login({
      success(res){
        getApp().ajaxResetS('/pay', {
          code: res.code,
          money,
          orderNum: orderNum,
          openid: getApp().globalData.userId
        }, (res) => {
          let data = res.data.Data.Data
          wx.requestPayment({
            timeStamp: data.timeStamp.toString(),
            nonceStr: data.nonce_str,
            package: data.package,
            signType: 'MD5',
            paySign: data.paySign,
            success(res) {
              callback(res)
            },
            fail(res) {
              console.log(res)
            }
          })
        })
      }
    })
   
  }
})