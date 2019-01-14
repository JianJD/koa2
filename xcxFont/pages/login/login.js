// pages/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  properties: {

  },
  attached() {
    let that = this
    getApp().wxGetSetting().then((res) => {
      console.log(res)
      if (res) {
        wx.showTabBar({})
        getApp().wxLogin()
        that.setData({
          showPop: false
        })
      } else {
        wx.hideTabBar()
        that.setData({
          showPop: true
        })
      }

    }).catch((err) => {

    })

  },
  /**
   * 组件的初始数据
   */
  data: {
    showPop: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(e) {
      let that = this
      // getApp().wxGetSetting(function () {

      // }, function () {

      // })
      getApp().wxGetSetting().then((res) => {
        console.log(res)
        if (res) {
          wx.showTabBar({})
          getApp().wxLogin()
          that.setData({
            showPop: false
          })
        } else {
          wx.hideTabBar()
          that.setData({
            showPop: true
          })
        }

      }).catch((err) => {

      })
    }
  }
})
