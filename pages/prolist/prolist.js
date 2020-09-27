// pages/prolist/prolist.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolistGoodsList:null,
    goodslist:null,
    nowchoose:'0',
    nowPageNum:0
  },
  //页面滑动到底部
  bindDownLoad: function () {
    this.setData({
      nowPageNum: this.data.nowPageNum + 6
    })
    var _this=this;
    wx.request({
      url: 'http://localhost:8080/main/prolistPage', //上线的话必须是https，没有appId的本地请求貌似不受影响 
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      data:{
        nowType: _this.data.nowchoose,
        page: _this.data.nowPageNum
      },
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
  scroll: function (event) {
  },
  topLoad: function (event) {
   
    console.log("重新加载");
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '刷新中……'
    })//动态设置当前页面的标题。

    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();  
  },
  gotosearch: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  chooseProlist:function(e){
    for (var i = 0; i < this.data.prolistGoodsList.length;i++){
      if (this.data.prolistGoodsList[i].prolistId == e.currentTarget.dataset.num){
        this.setData({
          goodslist: this.data.prolistGoodsList[i].goodsList
        });
      }
    }
    this.setData({
      nowchoose: e.currentTarget.dataset.num
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: 'http://localhost:8080/main/prolist', //上线的话必须是https，没有appId的本地请求貌似不受影响 
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function (res) {
        console.log(res.data);
        _this.setData({ // 设置页面列表的内容
          prolistGoodsList: res.data.prolistGoodsList,
          goodslist: res.data.prolistGoodsList[0].goodsList
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