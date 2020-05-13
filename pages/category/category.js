// pages/category/category.js
import {
  getMenu,
  getSubcategory,
  getCategoryDetail
} from "../../service/category.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [],
    categoryData: {},
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMenu()
  },
  _getMenu() {
    getMenu().then(res => {
      console.log(res)
      const menu = res.data.data.category.list
      console.log(menu)
      const categoryData = {}
      for (var i in menu) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
        }
      }
      this.setData({
        menu,
        categoryData
      })
      this._getSubcategory(0)
      this._getCategoryDetail(0)
    })
  },
  _getSubcategory(currentIndex) {
    const maitKey = this.data.menu[currentIndex].maitKey;
    getSubcategory(maitKey).then(res => {
      console.log(res.data)
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.data.list
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex) {
    const miniWallkey = this.data.menu[currentIndex].miniWallkey
    getCategoryDetail(miniWallkey, 'pop').then(res => {
      console.log(res.data)
      const tempCategoryData = this.data.categoryData
      tempCategoryData[currentIndex].categoryDetail = res.data
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  menuClick(e) {
    console.log(e)
    const currentIndex = e.detail.currentIndex
    this.setData({
      currentIndex
    })
    this._getSubcategory(currentIndex)
    this._getCategoryDetail(currentIndex)
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