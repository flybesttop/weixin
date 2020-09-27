// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowType: 1,
    orderMessage: null
  },
  sureGet: function(e) {
    var _this = this;
    wx.showModal({
      title: '确认信息',
      content: '您确定收到货吗',
      success: function(ress) {
        if (ress.confirm) {
          wx.request({
            url: 'http://localhost:8080/main/sureGetOrder',
            method: 'POST',
            header: {
              'Content-Type': "application/x-www-form-urlencoded"
            }, // 设置请求的 header
            data: {
              orderId: e.currentTarget.dataset.orderid,
              openId: wx.getStorageSync("openId")
            },
            success: function(res) {
              console.log(res.data);
              _this.setData({
                orderMessage: res.data
              })
              wx.showToast({
                title: '完成订单',
                icon: 'success',
                duration: 1500
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
      }
    })
  },
  changeType: function(e) {
    var _this = this;
    _this.setData({
      nowType: e.currentTarget.dataset.type
    })
    wx.request({
      url: 'http://localhost:8080/main/selectOrder',
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      data: {
        orderType: _this.data.nowType,
        openId: wx.getStorageSync("openId")
      },
      success: function(res) {
        console.log(res.data);
        _this.setData({
          orderMessage: res.data
        })
      },
      fail: function() {
        app.consoleLog("请求数据失败");
      },
      complete: function() {
        // complete 
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!wx.getStorageSync("openId")) {
      wx.showToast({
        title: '请您先登录',
        image: '../../image/icon_font/information.png',
        duration: 3000
      })
    } else {
      if (options.orderType) {
        this.setData({
          nowType: options.orderType
        })
      }
      var _this = this;
      wx.request({
        url: 'http://localhost:8080/main/selectOrder',
        method: 'POST',
        header: {
          'Content-Type': "application/x-www-form-urlencoded"
        }, // 设置请求的 header
        data: {
          orderType: _this.data.nowType,
          openId: wx.getStorageSync("openId")
        },
        success: function(res) {
          console.log(res.data);
          _this.setData({
            orderMessage: res.data
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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