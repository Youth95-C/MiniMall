// pages/cart/cart.js
const app = getApp()

Page({
  data: {
    cartList: [],
    isSelectAll: true,
    totalPrice: 0,
    totalCounter: 0
  },
  onLoad() {
    // 1.第一次加载数据
    this.setData({
      cartList: app.globalData.cartList
    })

    // 2.设置回调
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }

    // 3.设置修改某个商品的回调
    app.changeGoodsState = (index, goods) => {
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: goods
      })

      // 2.修改全部选中的状态
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }
  },
  onShow() {
    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })
    this.changeData()
  },
  onSelectAll() {
    // 如果全部选中
    if (this.data.isSelectAll) { // 目前全部选中
      const curCartList = this.data.cartList
      curCartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        cartList: curCartList,
        isSelectAll: false
      })
      this.changeData()
    } else { //如果某些没选中
      const curCartList = this.data.cartList
      curCartList.forEach(item => {
        item.checked = true
      })
      this.setData({
        cartList: curCartList,
        isSelectAll: true
      })
      this.changeData()
    }
  },
  changeData() {
    // 1.获取所有选中数据
    let totalPrice = 0;
    let counter = 0;

    for (let item of this.data.cartList) {
      if (item.checked) {
        counter++
        totalPrice += item.price * item.count
      }
    }

    console.log(counter, totalPrice)

    // 2.修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  }
})