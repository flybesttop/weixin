// pages/goods_favor/goods_favor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodgoodslist: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (!wx.getStorageSync("openId")) {
      wx.showToast({
        title: '请您先登录',
        image: '../../image/icon_font/information.png',
        duration: 3000
      })
    } else {
      var _this = this;
      wx.request({
        url: 'http://localhost:8080/main/goods_favor/' + wx.getStorageSync("openId"), //上线的话必须是https，没有appId的本地请求貌似不受影响 
        method: 'POST',
        header: {
          'Content-Type': "application/x-www-form-urlencoded"
        }, // 设置请求的 header
        success: function(res) {
          console.log(res.data);
          _this.setData({ // 设置页面列表的内容
            goodgoodslist: res.data
          });
        },
        fail: function() {
          app.consoleLog("请求数据失败");
        },
        complete: function() {
          // complete 
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})