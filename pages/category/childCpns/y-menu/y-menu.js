// pages/category/y-menu/y-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menu: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    menuClick(e) {
      console.log(e)
      //改变当前的currentIndex
      const currentIndex=e.currentTarget.dataset.index
      this.setData({
        currentIndex
      })
      //将最新的currentIndex传递到分类页面
      this.triggerEvent('menuclick', {currentIndex}, {})
    }
  }
})