// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winHeight: 0,
    winWidth: 0,
    indicatorDots: true,
    interval: 5000,
    duration: 1000,
    autoplay: true,
    imgUrls: [
      "../images/banner1.jpg",
      "../images/banner2.jpeg",
      "../images/banner3.jpg",
    ],
    movies: []

  },


  switchNav: function(e) {
    console.log(e);
    var index = e.currentTarget.id;
    this.setData({
      currentTab: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var page = this;
    //获取系统信息
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        page.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      },
    })

    this.loadMovies();
  },

  loadMovies: function() {
    var page = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b',
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        var subjects = res.data.subjects;
        var size = subjects.length;
        var len = parseInt(size / 3);
        console.log('yzh---' + len)
        page.setData({
          movies: subjects
        });
        page.setData({
          winHeight: (len + 1) * 230
        })
      }
    })
  },

  loadDetail: function(e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../movieDetail/movieDetail?id=' + id,
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