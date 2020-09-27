//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    marquee: {
      text: '12.12  商品大促销啦！'
    },
    userInfo: {},
    hasUserInfo: false,
    goodgoodslist: null,
    // goodstoreList:null,
    salesBestGoods: null,
    hotStore: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    scrollInto: 0,
  },
  gotosearch: function(e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  viewTap: function() {
    console.log('view tap');
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {

  },
  onShow: function() {
    var _this = this;
    wx.request({
      url: 'http://localhost:8080/main/index', //上线的话必须是https，没有appId的本地请求貌似不受影响 
      method: 'POST',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function(res) {
        console.log(res.data);
        _this.setData({ // 设置页面列表的内容
          goodgoodslist: res.data.goodsListIndex,
          // goodstoreList: res.data.storeList,
          salesBestGoods: res.data.salesBest,
          hotStore: res.data.hotStore
        });
      },
      fail: function() {
        app.consoleLog("请求数据失败");
      },
      complete: function() {
        // complete 
      }
    })
  },
  scrollLeft: function(e) {
    var into = this.data.scrollInto;
    var length = this.data.scrollList.length;
    if (into > 0) {
      this.setData({
        scrollInto: into - 1,
      })
    } else {
      this.setData({
        scrollInto: length - 3,
      })
    }
  },
  scrollRight: function(e) {
    var into = this.data.scrollInto;
    if (into < this.data.scrollList.length - 3) {
      this.setData({
        scrollInto: into + 1,
      })
    } else {
      this.setData({
        scrollInto: 0,
      })
    }
  }
})