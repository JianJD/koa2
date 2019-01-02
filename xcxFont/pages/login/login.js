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
    let that=this
    getApp().wxGetSetting(function(){
        getApp().wxLogin()
    },function(){
      that.setData({
        showPop:true
      })
    })

  },
  /**
   * 组件的初始数据
   */
  data: {
    showPop:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(e){
      console.log(e)
    }
  }
})
