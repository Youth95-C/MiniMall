// pages/detail/detail.js
import {getDetail, GoodsBaseInfo,ShopInfo,ParamInfo, getRecommends} from "../../service/detail"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    topImages:[],
    baseInfo:{},
    shopInfo:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.iid)
    this.setData({
      iid: options.iid
    })
    console.log(this.data.iid)
    this._getDetail()
    this. _getRecommends()
  },
  _getDetail() {
    getDetail(this.data.iid).then(res=>{
      console.log(res)
      const topImages=res.data.result.itemInfo.topImages
      console.log(topImages)
      const baseInfo=new GoodsBaseInfo(res.data.result.itemInfo,res.data.result.columns,res.data.result.shopInfo.services)
      const shopInfo = new ShopInfo(res.data.result.shopInfo);
      const detailInfo = res.data.result.detailInfo;
      const paramInfo = new ParamInfo(res.data.result.itemParams.info, res.data.result.itemParams.rule)
      let commentInfo = {}
      if (res.data.result.rate && res.data.result.rate.cRate > 0) {
        commentInfo = res.data.result.rate.list[0]
      }

      this.setData({
        topImages,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      console.log(res.data)
      const recommends=res.data.data.list
      this.setData({
        recommends
      })
    })
  },
  onAddCart() {
    //获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;

    //加入到购物车列表
    app.addToCart(obj)

    //加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
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