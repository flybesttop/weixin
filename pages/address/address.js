// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresslist: null,
  },
  insertNewAddress:function(e){
    if (!wx.getStorageSync("openId")) {
      wx.showToast({
        title: '请您先登录',
        image: '../../image/icon_font/information.png',
        duration: 3000
      })
    } else {
      wx.navigateTo({
        url: '../addaddress/addaddress',
      })
    }
  },
  deleteAddress: function(e) {
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var addressId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认信息',
      content: '确定删除该地址信息吗',
      success: function(resss) {
        if (resss.confirm) {
          var addressNewlist = _this.data.addresslist;
          addressNewlist.splice(index, 1);
          _this.setData({
            addresslist: addressNewlist
          });
          wx.request({
            url: 'http://localhost:8080/address/deleteAddress/' + addressId,
            method: 'POST',
            header: {
              'Content-Type': "application/x-www-form-urlencoded"
            }, // 设置请求的 header
            success: function(res) {},
            fail: function() {
              app.consoleLog("请求数据失败");
            },
            complete: function() {
              // complete 
            }
          });
        }
      }
    })
  },
  showModal: function(e) {
    var showName = e.currentTarget.dataset.modal;
    this.setData({
      modalName: showName
    })
  },
  closeModal: function(e) {
    this.setData({
      modalName: null
    })
  },
  modifiedAddress: function(e) {
    wx.navigateTo({
      url: '../addaddress/addaddress?addressId=' + e.currentTarget.dataset.id,
    })
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
        url: 'http://localhost:8080/main/address/' + wx.getStorageSync("openId"),
        method: 'POST',
        header: {
          'Content-Type': "application/x-www-form-urlencoded"
        }, // 设置请求的 header
        success: function(res) {
          _this.setData({
            addresslist: res.data
          })
        },
        fail: function() {
          app.consoleLog("请求数据失败");
        },
        complete: function() {
          // complete 
        }
      });
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