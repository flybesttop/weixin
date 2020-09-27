// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: null,
    goodsId: null,
    goods: null,
    store: null,
    goodsSlideImgList: null,
    goodsDetilImgList: null,
    goodsTypeList: null,
    nowType: null,
    selectNum: 1,
    isfavor: null
  },
  insertCart: function(e) {
    if (!wx.getStorageSync("openId")) {
      wx.showToast({
        title: '请您先登录',
        image: '../../image/icon_font/information.png',
        duration: 3000
      })
    } else {
      wx.request({
        url: 'http://localhost:8080/cart/insertCart',
        method: 'POST',
        header: {
          'Content-Type': "application/JSON"
        }, // 设置请求的 header
        data: {
          goodsId: this.data.goodsId,
          openId: wx.getStorageSync("openId"),
          goodsNum: this.data.selectNum,
          goodsType: this.data.nowType.goodsType,
          storeId: this.data.storeId,
          storeName: this.data.store.storeName,
          goodsMoney: this.data.nowType.goodsMoney,
          goodsDelmoney: this.data.nowType.goodsDelmoney,
          other: this.data.nowType.id,
          other2: this.data.goods.goodHeadImg,
          modifiedTime: this.data.goods.goodsTitle,
          createTime: 0
        },
        success: function(res) {
          console.log(res.data);
          wx.showToast({
            title: '成功加入购物车',
            icon: 'success',
            duration: 3000
          });
        },
        fail: function() {
          app.consoleLog("请求数据失败");
          wx.showToast({
            title: '加入购物车失败，请稍后重试',
            icon: 'success',
            duration: 3000
          });
        },
        complete: function() {
          // complete 
        }
      });
    }
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
  clicktype: function(e) {
    this.setData({
      nowType: e.currentTarget.dataset.total
    })
  },
  addSelectNum: function(e) {
    this.setData({
      selectNum: this.data.selectNum + 1
    })
  },
  removeSelectNum: function(e) {
    this.setData({
      selectNum: this.data.selectNum - 1
    })
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
          url: 'http://localhost:8080/goodsFavor/deleteGoodsFavorByOpenIdAndGoodsId',
          method: 'POST',
          header: {
            'Content-Type': "application/x-www-form-urlencoded"
          }, // 设置请求的 header
          data: {
            goodsId: this.data.goodsId,
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
          url: 'http://localhost:8080/goodsFavor/insertGoodsFavor',
          method: 'POST',
          header: {
            'Content-Type': "application/JSON"
          }, // 设置请求的 header
          data: {
            goodsId: this.data.goodsId,
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
  gotocart: function(e) {
    wx.switchTab({
      url: '../shopping_cart/shopping_cart',
    })
  },
  gotostore: function(e) {
    wx.navigateTo({
      url: '../store/store?storeId=' + this.data.storeId,
    })
  },
  gotochat: function(e) {
    wx.navigateTo({
      url: '../chat/chat?storeId=' + this.data.storeId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    console.log(options);
    _this.setData({
      goodsId: options.goodsId,
      storeId: options.storeId,
    });
    wx.request({
      url: 'http://localhost:8080/goods/insertView/' + options.goodsId,
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
    wx.request({
      url: 'http://localhost:8080/main/goods?goodsId=' + options.goodsId + '&storeId=' + options.storeId, //上线的话必须是https，没有appId的本地请求貌似不受影响 
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function(res) {
        console.log(res.data);
        _this.setData({ // 设置页面列表的内容
          goods: res.data.goods,
          store: res.data.store,
          goodsSlideImgList: res.data.goodsSlideImgList,
          goodsDetilImgList: res.data.goodsDetilImgList,
          goodsTypeList: res.data.goodsTypeList,
          nowType: res.data.goodsTypeList[0]
        });
      },
      fail: function() {
        app.consoleLog("请求数据失败");
      },
      complete: function() {
        // complete 
      }
    });
    wx.request({
      url: 'http://localhost:8080/goodsFavor/selectGoodsFavorByOpenIdAndGoodsId',
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      data: {
        goodsId: options.goodsId,
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