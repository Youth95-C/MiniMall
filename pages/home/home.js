import {
  getMultiData,
  getGoodsData
} from "../../service/home.js"
const TOP_DISTANCE = 1000
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    },
    currentType: "pop",
    showBackTop: false,
    isTabFixed:false,
    tabScrollTop:0
  },
  handleTabClick(event) {
    const index = event.detail.index
    switch (index) {
      case 0:
        this.setData({
          currentType: "pop"
        })
        break;
      case 1:
        this.setData({
          currentType: "new"
        })
        break;
      case 2:
        this.setData({
          currentType: "sell"
        })
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //请求轮播图和推荐数据
    this._getMultiData()
    //请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  _getMultiData() {
    getMultiData().then(res => {
      console.log(res)
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners: banners,
        recommends: recommends
      })
    })
  },
  _getGoodsData(type) {
    const page = this.data.goods[type].page + 1
    getGoodsData(type, page).then(res => {
      console.log(res)
      const list = res.data.data.list;
      const oldList = this.data.goods[type].list
      oldList.push(...list)
      //将数据设置到data中的goods中
      const typeKey = `goods.${type}.list`
      const typePage = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [typePage]: page
      })

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   * 页面显示不代表所有图片加载完成，图片加载是异步的
   */
  onShow: function () {
    // wx.createSelectorQuery().select("#tab-control").boundingClientRect(rect=>{
    //   console.log(rect)
    // }).exec()
  },
  //图片加载完成后
  handleImageLoad(){
    wx.createSelectorQuery().select("#tab-control").boundingClientRect(rect=>{
      console.log(rect)
      this.data.tabScrollTop=rect.top
    }).exec()
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

  },
  /**页面滚动到底部 */
  onReachBottom() {
    this._getGoodsData(this.data.currentType)
  },
  onPageScroll(options) {
    // console.log(options)
    const scrollTop = options.scrollTop
    //不要在滚动的函数中频繁调用setData
    const flag1= scrollTop >= TOP_DISTANCE
    if (flag1 != this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
      })
    }
    const flag2=scrollTop>=this.data.tabScrollTop
    if(flag2!=this.data.isTabFixed){
      this.setData({
        isTabFixed:flag2
      })
    }
  }
})