// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchTip:null,
    searchwords:null,
    isSelected:false
  },
  putsearchwords:function(e){
    this.setData({
      searchwords:e.detail.value
    })
  },
  searchNowWords:function(e){
    this.setData({
      isSelected:true
    });
    var _this = this;
    wx.request({
      url: 'http://localhost:8080/goods/selectGoodsLike/' + _this.data.searchwords, //上线的话必须是https，没有appId的本地请求貌似不受影响 
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function (res) {
        console.log(res.data);
        _this.setData({ // 设置页面列表的内容
          goodslist: res.data
        });
      },
      fail: function () {
        app.consoleLog("请求数据失败");
      },
      complete: function () {
        // complete 
      }
    })
  },
  changeHotWords: function (e) {
    this.setData({
      searchwords: e.currentTarget.dataset.message
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: 'http://localhost:8080/prolist/selectAllProlist', //上线的话必须是https，没有appId的本地请求貌似不受影响 
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function (res) {
        console.log(res.data);
        _this.setData({ // 设置页面列表的内容
          searchTip: res.data
        });
      },
      fail: function () {
        app.consoleLog("请求数据失败");
      },
      complete: function () {
        // complete 
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})