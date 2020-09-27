// pages/addaddress/addaddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['浙江省', '杭州市', '临安区'],
    isChecked:false,
    userName:null,
    phoneNum:null
  },
  updataAddress:function(e){
    var isdef=this.data.isChecked? 1:0;
    wx.request({
      url: 'http://localhost:8080/address/insertAddress',
      method: 'POST',
      header: {
        'Content-Type': "application/JSON"
      }, // 设置请求的 header
      data: {
        id: this.data.nowAddressId,
        username: this.data.userName,
        openId: wx.getStorageSync("openId"),
        phone: this.data.phoneNum,
        address: this.data.detailAddress,
        isDef: isdef,
        shengfen: this.data.region[0],
        chengshi: this.data.region[1],
        qu: this.data.region[2]
      },
      success: function (res) {
        console.log(res.data);
        wx.navigateBack({
          
        })
      },
      fail: function () {
        app.consoleLog("请求数据失败");
        wx.showToast({
          title: '更新地址失败，请稍后重试',
          icon: 'success',
          duration: 3000
        });
      },
      complete: function () {
        // complete 
      }
    });
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  getName:function(e){
    this.setData({
      userName:e.detail.value
    })
  },
  getPhone: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  getDetil: function (e) {
    this.setData({
      detailAddress: e.detail.value
    })
  },
  changeSwitch:function(e){
    console.log(e.detail.value);
    this.setData({
      isChecked: e.detail.value 
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.addressId){
      var _this = this;
      wx.request({
        url: 'http://localhost:8080/address/selectAddress/' + options.addressId,
        method: 'POST',
        header: {
          'Content-Type': "application/x-www-form-urlencoded"
        }, // 设置请求的 header
        success: function (res) {
          var ischeck=res.data.isDef==1?true:false;
          _this.setData({
            region: [res.data.shengfen, res.data.chengshi, res.data.qu],
            isChecked:ischeck,
            userName: res.data.username,
            phoneNum: res.data.phone,
            detailAddress: res.data.address,
            nowAddressId:res.data.id
          })
        },
        fail: function () {
          app.consoleLog("请求数据失败");
        },
        complete: function () {
          // complete 
        }
      });
    }
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