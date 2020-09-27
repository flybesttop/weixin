// pages/store/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: null,
    storeImgList: null,
    goodsList: null,
    storeId: null,
    islike: false,
    isfavor: null
  },
  changelike: function(e) {
    if (this.data.islike) {
      this.setData({
        islike: false
      })
    } else {
      this.setData({
        islike: true
      })
    }
  },

  favor: function(e) {
    if (!wx.getStorageSync("openId")) {
      wx.showToast({
        title: '请您先登录',
        image: '../../image/icon_font/information.png',
        duration: 3000
      })
    } else {
      if (this.data.isfavor) {
        wx.request({
          url: 'http://localhost:8080/storeFavor/deleteStoreFavorByOpenIdAndStoreId',
          method: 'POST',
          header: {
            'Content-Type': "application/x-www-form-urlencoded"
          }, // 设置请求的 header
          data: {
            storeId: this.data.storeId,
            openId: wx.getStorageSync("openId")
          },
          success: function(res) {
            console.log(res.data);
          },
          fail: function() {
            app.consoleLog("请求数据失败");
          },
          complete: function() {
            // complete 
          }
        });
        this.setData({
          isfavor: false
        });
      } else {
        wx.request({
          url: 'http://localhost:8080/storeFavor/insertStoreFavor',
          method: 'POST',
          header: {
            'Content-Type': "application/JSON"
          }, // 设置请求的 header
          data: {
            storeId: this.data.storeId,
            openId: wx.getStorageSync("openId")
          },
          success: function(res) {
            console.log(res.data);
          },
          fail: function() {
            app.consoleLog("请求数据失败");
          },
          complete: function() {
            // complete 
          }
        });
        this.setData({
          isfavor: true
        });
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    console.log(options);
    _this.setData({
      storeId: options.storeId,
    });
    wx.request({
      url: 'http://localhost:8080/main/store?storeId=' + options.storeId,
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function(res) {
        console.log(res.data);
        _this.setData({
          store: res.data.store,
          goodsList: res.data.goodsList,
          storeImgList: res.data.storeImgList
        })
      },
      fail: function() {
        app.consoleLog("请求数据失败");
      },
      complete: function() {
        // complete 
      }
    });
    wx.request({
      url: 'http://localhost:8080/storeFavor/selectStoreFavorByOpenIdAndStoreId',
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      data: {
        storeId: options.storeId,
        openId: wx.getStorageSync("openId")
      },
      success: function(res) {
        console.log(res.data);
        _this.setData({ // 设置页面列表的内容
          isfavor: res.data
        });
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