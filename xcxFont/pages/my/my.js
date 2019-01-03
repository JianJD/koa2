var that = '';
Page({
  data: {
    
  },
  onLoad() {
    that=this;
  },
  onShow(){
    console.log(12)
    that.setData({
      wxUserPic: getApp().globalData.userInfo.avatarUrl,
      wxUserName: getApp().globalData.userInfo.nickName
    })
  }

})