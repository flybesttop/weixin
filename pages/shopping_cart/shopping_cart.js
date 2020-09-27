// pages/shopping_cart/shopping_cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartStoreList: null,
    defAddress: null,
    totalMoney: 0,
    totalCheck: false,
    checkedNum: 0
  },
  createOrder: function(e) {
    var _this = this;
    if (_this.data.defAddress == null) {
      wx.showToast({
        title: '请添加默认地址',
        image: '../../image/icon_font/information.png',
        duration: 3000
      });
    } else {
      wx.showModal({
        title: '购买确认',
        content: '您确认购买这' + _this.data.checkedNum + '项吗',
        success: function(ress) {
          if (ress.confirm) {
            wx.request({
              url: 'http://localhost:8080/main/createOrder',
              method: 'POST',
              header: {
                'Content-Type': "application/x-www-form-urlencoded"
              }, // 设置请求的 header
              data: {
                openId: wx.getStorageSync("openId"),
                addressId: _this.data.defAddress.id
              },
              success: function(res) {
                console.log(res.data);
                _this.setData({
                  cartStoreList: res.data.cartStoreList,
                  totalMoney: res.data.totalMoney,
                  totalCheck: res.data.totalCheck,
                  checkedNum: res.data.checkedNum
                })
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
        }
      })
    }
  },
  deleteCartCheck: function(e) {
    var _this = this;
    wx.showModal({
      title: '删除确认',
      content: '您确认删除这' + _this.data.checkedNum + '项吗',
      success: function(ress) {
        if (ress.confirm) {
          wx.request({
            url: 'http://localhost:8080/cart/deleteCartCheck/' + wx.getStorageSync("openId"),
            method: 'POST',
            header: {
              'Content-Type': "application/x-www-form-urlencoded"
            }, // 设置请求的 header
            success: function(res) {
              console.log(res.data);
              _this.setData({
                cartStoreList: res.data.cartStoreList,
                totalMoney: res.data.totalMoney,
                totalCheck: res.data.totalCheck,
                checkedNum: res.data.checkedNum
              })
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
      }
    })
  },
  checkTotal: function(e) {
    var _this = this;
    wx.request({
      url: 'http://localhost:8080/cart/checkTotal',
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      data: {
        openId: wx.getStorageSync("openId"),
        totalcheck: _this.data.totalCheck
      },
      success: function(res) {
        console.log(res.data);
        _this.setData({
          cartStoreList: res.data.cartStoreList,
          totalMoney: res.data.totalMoney,
          totalCheck: res.data.totalCheck,
          checkedNum: res.data.checkedNum
        })
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
  },
  checkStore: function(e) {
    var _this = this;
    wx.request({
      url: 'http://localhost:8080/cart/checkStore',
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      data: {
        openId: wx.getStorageSync("openId"),
        storeId: e.currentTarget.dataset.storeid,
        storecheck: e.currentTarget.dataset.storecheck
      },
      success: function(res) {
        console.log(res.data);
        _this.setData({
          cartStoreList: res.data.cartStoreList,
          totalMoney: res.data.totalMoney,
          totalCheck: res.data.totalCheck,
          checkedNum: res.data.checkedNum
        })
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
  },
  checkCart: function(e) {
    var _this = this;
    wx.request({
      url: 'http://localhost:8080/cart/checkCart',
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      data: {
        openId: wx.getStorageSync("openId"),
        cartId: e.currentTarget.dataset.cartid
      },
      success: function(res) {
        console.log(res.data);
        _this.setData({
          cartStoreList: res.data.cartStoreList,
          totalMoney: res.data.totalMoney,
          totalCheck: res.data.totalCheck,
          checkedNum: res.data.checkedNum
        })
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
  },
  deleteGoods: function(e) {
    var _this = this;
    wx.showModal({
      title: '确定删除',
      content: '您确定要删除该商品吗',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:8080/cart/deleteCartOpenId',
            method: 'POST',
            header: {
              'Content-Type': "application/x-www-form-urlencoded"
            }, // 设置请求的 header
            data: {
              openId: wx.getStorageSync("openId"),
              cartId: e.currentTarget.dataset.cartid
            },
            success: function(res) {
              console.log(res.data);
              _this.setData({
                cartStoreList: res.data.cartStoreList,
                totalMoney: res.data.totalMoney,
                totalCheck: res.data.totalCheck,
                checkedNum: res.data.checkedNum
              })
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
      }
    })
  },
  insertGoods: function(e) {
    var goodsid = e.currentTarget.dataset.goodsid;
    var typeid = e.currentTarget.dataset.typeid;
    var _this = this;
    wx.request({
      url: 'http://localhost:8080/cart/addCart',
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      data: {
        openId: wx.getStorageSync("openId"),
        goodsId: goodsid,
        typeId: typeid
      },
      success: function(res) {
        console.log(res.data);
        _this.setData({
          cartStoreList: res.data.cartStoreList,
          totalMoney: res.data.totalMoney,
          totalCheck: res.data.totalCheck,
          checkedNum: res.data.checkedNum
        })
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
  },
  cutDownGoods: function(e) {
    var goodsid = e.currentTarget.dataset.goodsid;
    var typeid = e.currentTarget.dataset.typeid;
    var _this = this;
    wx.request({
      url: 'http://localhost:8080/cart/cutDownCart',
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      data: {
        openId: wx.getStorageSync("openId"),
        goodsId: goodsid,
        typeId: typeid
      },
      success: function(res) {
        console.log(res.data);
        _this.setData({
          cartStoreList: res.data.cartStoreList,
          totalMoney: res.data.totalMoney,
          totalCheck: res.data.totalCheck,
          checkedNum: res.data.checkedNum
        })
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight
    })
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
        url: 'http://localhost:8080/main/cart/' + wx.getStorageSync("openId"),
        method: 'POST',
        header: {
          'Content-Type': "application/x-www-form-urlencoded"
        }, // 设置请求的 header
        success: function(res) {
          console.log(res.data);
          var defaddress = res.data.defAddress == null ? null : res.data.defAddress;
          _this.setData({
            defAddress: defaddress,
            cartStoreList: res.data.cartStoreList,
            totalMoney: res.data.totalMoney,
            totalCheck: res.data.totalCheck,
            checkedNum: res.data.checkedNum
          })
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